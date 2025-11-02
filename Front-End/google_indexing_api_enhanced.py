"""
Enhanced Google Indexing API Tool with SEO Features
Created by Soufyane X - Enhanced for SEO optimization
"""

import ipywidgets as widgets
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import datetime
from IPython.display import display, HTML
import json
import re
from urllib.parse import urlparse
from typing import List, Dict, Optional
import time

# Global variables
service = None
usage_log = {}
daily_limit = 200  # Google's daily limit per property
requests_per_user_per_day = 5
site_url = 'https://bnbatiment.com'

# Verification key (obfuscated for basic protection)
verification_key = 'googleapis'


def validate_url(url: str) -> Dict[str, bool]:
    """
    Enhanced URL validation with SEO checks
    Returns validation results dictionary
    """
    results = {
        'is_valid': False,
        'is_https': False,
        'is_canonical': False,
        'has_trailing_slash': False,
        'is_external': False,
        'errors': []
    }
    
    if not url:
        results['errors'].append("URL is empty")
        return results
    
    try:
        parsed = urlparse(url)
        
        # Check if URL is valid
        if not parsed.scheme or not parsed.netloc:
            results['errors'].append("Invalid URL format")
            return results
        
        # Check HTTPS
        results['is_https'] = parsed.scheme == 'https'
        if not results['is_https']:
            results['errors'].append("URL should use HTTPS for SEO")
        
        # Check if URL is from our domain
        # Normalize domains (remove www) for comparison
        if site_url:
            site_domain = urlparse(site_url).netloc
            # Remove www from both domains for comparison
            site_domain_normalized = site_domain.replace('www.', '')
            url_domain_normalized = parsed.netloc.replace('www.', '')
            
            if url_domain_normalized != site_domain_normalized:
                results['is_external'] = True
                results['errors'].append(f"URL is from external domain. Expected: {site_domain}")
            else:
                # Domain matches (with or without www) - valid
                results['is_valid'] = True
        
        # Check for trailing slash (SEO best practice: no trailing slash except root)
        if parsed.path and parsed.path != '/' and parsed.path.endswith('/'):
            results['has_trailing_slash'] = True
            results['errors'].append("URL has trailing slash. Remove for better SEO")
        
        # Check for www subdomain (should be canonical) - but don't fail validation
        if parsed.netloc.startswith('www.'):
            results['errors'].append("Use non-www canonical URL for better SEO (will be normalized)")
        
        # URL is valid if not external domain (www/non-www are both acceptable)
        if not results.get('is_valid', False):
            results['is_valid'] = len([e for e in results['errors'] if 'external' in e.lower()]) == 0
        
        return results
    
    except Exception as e:
        results['errors'].append(f"URL validation error: {str(e)}")
        return results


def normalize_url(url: str) -> str:
    """
    Normalize URL for SEO (remove trailing slashes, ensure HTTPS, etc.)
    """
    if not url:
        return url
    
    parsed = urlparse(url)
    
    # Ensure HTTPS
    if parsed.scheme != 'https':
        parsed = parsed._replace(scheme='https')
    
    # Remove www subdomain for canonical
    if parsed.netloc.startswith('www.'):
        parsed = parsed._replace(netloc=parsed.netloc[4:])
    
    # Remove trailing slash (except for root)
    path = parsed.path
    if path != '/' and path.endswith('/'):
        path = path.rstrip('/')
    
    parsed = parsed._replace(path=path)
    
    return parsed.geturl()


def authenticate_google_api(credentials_json: str) -> Optional[object]:
    """
    Authenticate with Google Indexing API
    Enhanced with better error handling
    """
    global service
    
    try:
        if not credentials_json or credentials_json.strip() == '':
            return None
        
        credentials_info = json.loads(credentials_json)
        credentials = service_account.Credentials.from_service_account_info(
            credentials_info,
            scopes=['https://www.googleapis.com/auth/indexing']
        )
        
        service = build('indexing', 'v3', credentials=credentials)
        return service
    
    except json.JSONDecodeError:
        raise ValueError("Invalid JSON format in credentials")
    except KeyError as e:
        raise ValueError(f"Missing required credential field: {e}")
    except Exception as e:
        raise ValueError(f"Authentication failed: {str(e)}")


def can_index_today(user_id: str = 'default_user') -> bool:
    """
    Check if user can make indexing request today
    Enhanced with better tracking
    """
    today = datetime.date.today()
    
    if user_id not in usage_log:
        usage_log[user_id] = {}
    
    if today not in usage_log[user_id]:
        usage_log[user_id][today] = 0
    
    return usage_log[user_id][today] < requests_per_user_per_day


def get_usage_count(user_id: str = 'default_user') -> int:
    """Get today's usage count for a user"""
    today = datetime.date.today()
    if user_id in usage_log and today in usage_log[user_id]:
        return usage_log[user_id][today]
    return 0


def send_indexing_request(url: str, request_type: str = 'URL_UPDATED', 
                         user_id: str = 'default_user') -> Dict[str, any]:
    """
    Send indexing request to Google
    Enhanced with URL validation and better error handling
    """
    result = {
        'success': False,
        'message': '',
        'url': url,
        'normalized_url': None,
        'validation': None,
        'response': None
    }
    
    if not service:
        result['message'] = "❌ Authentication not set up. Please authenticate first."
        return result
    
    # Validate URL
    validation = validate_url(url)
    result['validation'] = validation
    
    if not validation['is_valid']:
        errors = ', '.join(validation['errors'])
        result['message'] = f"❌ URL validation failed: {errors}"
        return result
    
    # Normalize URL
    normalized_url = normalize_url(url)
    result['normalized_url'] = normalized_url
    
    # Check daily limit
    if not can_index_today(user_id):
        remaining = requests_per_user_per_day - get_usage_count(user_id)
        result['message'] = f"❌ Daily limit reached ({requests_per_user_per_day} requests/day). Try again tomorrow."
        return result
    
    # Send request
    body = {'url': normalized_url, 'type': request_type}
    
    try:
        response = service.urlNotifications().publish(body=body).execute()
        usage_log[user_id][datetime.date.today()] += 1
        
        result['success'] = True
        result['response'] = response
        result['message'] = f"✅ Successfully indexed: {normalized_url}"
        
        # Add SEO recommendations
        if validation.get('has_trailing_slash'):
            result['message'] += "\n⚠️ Note: URL had trailing slash (normalized)"
        if not validation.get('is_https'):
            result['message'] += "\n⚠️ Note: URL was upgraded to HTTPS"
        if normalized_url != url and 'www' in url:
            result['message'] += "\n⚠️ Note: URL had www subdomain (normalized to non-www)"
        
        return result
    
    except HttpError as e:
        error_content = json.loads(e.content.decode('utf-8'))
        error_message = error_content.get('error', {}).get('message', str(e))
        
        result['message'] = f"❌ API Error: {error_message}"
        return result
    
    except Exception as e:
        result['message'] = f"❌ Failed to send request: {str(e)}"
        return result


def batch_index_urls(urls: List[str], request_type: str = 'URL_UPDATED', 
                    delay: float = 1.0) -> List[Dict]:
    """
    Batch process multiple URLs for indexing
    Includes rate limiting and validation
    """
    results = []
    
    for i, url in enumerate(urls, 1):
        if i > 1:
            time.sleep(delay)  # Rate limiting
        
        result = send_indexing_request(url, request_type)
        results.append(result)
        
        print(f"[{i}/{len(urls)}] {result['message']}")
    
    return results


# UI Components
credentials_textarea = widgets.Textarea(
    value='',
    placeholder='Paste your Google Service Account JSON credentials here',
    description='Credentials:',
    disabled=False,
    layout=widgets.Layout(width='100%', height='150px')
)

url_input = widgets.Text(
    value='',
    placeholder='https://bnbatiment.com/page',
    description='URL:',
    disabled=False,
    layout=widgets.Layout(width='100%')
)

urls_textarea = widgets.Textarea(
    value='',
    placeholder='Enter multiple URLs (one per line) for batch processing',
    description='Batch URLs:',
    disabled=False,
    layout=widgets.Layout(width='100%', height='100px')
)

type_dropdown = widgets.Dropdown(
    options=['URL_UPDATED', 'URL_DELETED'],
    value='URL_UPDATED',
    description='Type:',
    disabled=False,
)

site_url_input = widgets.Text(
    value=site_url,
    placeholder='https://bnbatiment.com',
    description='Site URL:',
    disabled=False,
    layout=widgets.Layout(width='100%')
)

submit_single_button = widgets.Button(
    description='Index Single URL',
    disabled=False,
    button_style='success',
    tooltip='Send single URL indexing request',
    icon='check'
)

submit_batch_button = widgets.Button(
    description='Index Batch URLs',
    disabled=False,
    button_style='info',
    tooltip='Send multiple URL indexing requests',
    icon='list'
)

validate_button = widgets.Button(
    description='Validate URL',
    disabled=False,
    button_style='warning',
    tooltip='Validate URL for SEO',
    icon='search'
)

output_area = widgets.Output()

# Labels
verification_label = widgets.Label(verification_key)
slogan_label = widgets.HTML(
    '<p style="color: #3b82f6; font-weight: bold;">Enhanced SEO Indexing Tool</p>'
    '<p>Created by Soufyane X - Enhanced for better SEO optimization</p>'
    '<p>For advanced tutorials, visit Soufyane X YouTube channel</p>'
)

disclaimer_label = widgets.HTML(
    '<div style="background-color: #fff3cd; padding: 10px; border-radius: 5px; border-left: 4px solid #ffc107;">'
    '<strong>⚠️ Disclaimer:</strong><br>'
    'This tool is designed to facilitate indexing requests for website owners and bloggers. '
    'We do not encourage spam. It is recommended to send 5 requests per day for established sites '
    'and only 3 for new sites. By using this tool, you accept full responsibility for any penalties '
    'imposed by Google if used excessively or for low-quality content.'
    '</div>'
)

usage_info = widgets.HTML('')


def update_usage_info():
    """Update usage information display"""
    count = get_usage_count()
    remaining = requests_per_user_per_day - count
    usage_info.value = f'''
    <div style="background-color: #e7f3ff; padding: 10px; border-radius: 5px; margin: 10px 0;">
        <strong>📊 Daily Usage:</strong><br>
        Used: {count} / {requests_per_user_per_day}<br>
        Remaining: {remaining} requests today
    </div>
    '''


def on_validate_clicked(b):
    """Validate URL button handler"""
    with output_area:
        output_area.clear_output()
        url = url_input.value.strip()
        
        if not url:
            print("❌ Please enter a URL to validate")
            return
        
        validation = validate_url(url)
        normalized = normalize_url(url)
        
        print("=" * 60)
        print("🔍 URL VALIDATION RESULTS")
        print("=" * 60)
        print(f"Original URL: {url}")
        print(f"Normalized URL: {normalized}")
        print(f"\n✅ Valid: {validation['is_valid']}")
        print(f"🔒 HTTPS: {validation['is_https']}")
        print(f"🔗 External: {validation['is_external']}")
        print(f"📏 Trailing Slash: {validation['has_trailing_slash']}")
        
        if validation['errors']:
            print(f"\n⚠️ Issues Found:")
            for error in validation['errors']:
                print(f"   - {error}")
        else:
            print("\n✅ No issues found! URL is SEO-optimized.")
        print("=" * 60)


def on_submit_single_clicked(b):
    """Single URL submission handler"""
    with output_area:
        output_area.clear_output()
        
        if verification_label.value != verification_key:
            print("❌ Verification failed")
            return
        
        credentials = credentials_textarea.value.strip()
        url = url_input.value.strip()
        request_type = type_dropdown.value
        
        # Update global site URL
        global site_url
        site_url = site_url_input.value.strip() or 'https://bnbatiment.com'
        
        if not credentials:
            print("❌ Please enter Google API credentials")
            return
        
        if not url:
            print("❌ Please enter a URL to index")
            return
        
        try:
            # Authenticate
            auth_service = authenticate_google_api(credentials)
            if not auth_service:
                print("❌ Authentication failed. Please check your credentials.")
                return
            
            print("🔐 Authentication successful!")
            print(f"📝 Requesting index for: {url}")
            print(f"📋 Type: {request_type}\n")
            print("-" * 60)
            
            # Send request
            result = send_indexing_request(url, request_type)
            
            # Display results
            if result['validation']:
                print("🔍 Validation Results:")
                if result['validation']['errors']:
                    for error in result['validation']['errors']:
                        print(f"  ⚠️ {error}")
                else:
                    print("  ✅ URL passed validation")
                print()
            
            if result['normalized_url'] and result['normalized_url'] != url:
                print(f"🔧 Normalized URL: {result['normalized_url']}")
                print()
            
            print(result['message'])
            
            if result['success'] and result['response']:
                print(f"\n📄 Response: {json.dumps(result['response'], indent=2)}")
            
            print("-" * 60)
            update_usage_info()
            
        except Exception as e:
            print(f"❌ Error: {str(e)}")


def on_submit_batch_clicked(b):
    """Batch URL submission handler"""
    with output_area:
        output_area.clear_output()
        
        if verification_label.value != verification_key:
            print("❌ Verification failed")
            return
        
        credentials = credentials_textarea.value.strip()
        urls_text = urls_textarea.value.strip()
        request_type = type_dropdown.value
        
        # Update global site URL
        global site_url
        site_url = site_url_input.value.strip() or 'https://bnbatiment.com'
        
        if not credentials:
            print("❌ Please enter Google API credentials")
            return
        
        if not urls_text:
            print("❌ Please enter URLs (one per line)")
            return
        
        # Parse URLs
        urls = [url.strip() for url in urls_text.split('\n') if url.strip()]
        
        if not urls:
            print("❌ No valid URLs found")
            return
        
        if len(urls) > requests_per_user_per_day:
            print(f"⚠️ Warning: You have {len(urls)} URLs but only {requests_per_user_per_day} requests available today")
            print(f"Only the first {requests_per_user_per_day} URLs will be processed.")
            urls = urls[:requests_per_user_per_day]
        
        try:
            # Authenticate
            auth_service = authenticate_google_api(credentials)
            if not auth_service:
                print("❌ Authentication failed. Please check your credentials.")
                return
            
            print("🔐 Authentication successful!")
            print(f"📝 Processing {len(urls)} URLs...")
            print(f"📋 Type: {request_type}\n")
            print("=" * 60)
            
            # Process URLs
            results = batch_index_urls(urls, request_type, delay=1.5)
            
            # Summary
            print("\n" + "=" * 60)
            print("📊 BATCH PROCESSING SUMMARY")
            print("=" * 60)
            successful = sum(1 for r in results if r['success'])
            failed = len(results) - successful
            print(f"✅ Successful: {successful}")
            print(f"❌ Failed: {failed}")
            print(f"📈 Total: {len(results)}")
            print("=" * 60)
            
            update_usage_info()
            
        except Exception as e:
            print(f"❌ Error: {str(e)}")


# Attach event handlers
validate_button.on_click(on_validate_clicked)
submit_single_button.on_click(on_submit_single_clicked)
submit_batch_button.on_click(on_submit_batch_clicked)

# Initial usage info
update_usage_info()

# Display UI
display(
    HTML('<h2 style="color: #3b82f6;">🚀 Enhanced Google Indexing API - SEO Optimized</h2>'),
    verification_label,
    slogan_label,
    disclaimer_label,
    usage_info,
    widgets.HTML('<h3>⚙️ Configuration</h3>'),
    site_url_input,
    credentials_textarea,
    widgets.HTML('<h3>📝 Single URL Indexing</h3>'),
    url_input,
    type_dropdown,
    widgets.HBox([validate_button, submit_single_button]),
    widgets.HTML('<h3>📦 Batch URL Indexing</h3>'),
    urls_textarea,
    submit_batch_button,
    widgets.HTML('<h4>📤 Output</h4>'),
    output_area
)

