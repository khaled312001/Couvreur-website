<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\Service;
use Illuminate\Http\Request;

class SitemapController extends Controller
{
    public function index()
    {
        // Get all published blog posts
        $blogPosts = BlogPost::published()->orderBy('published_at', 'desc')->get();
        
        // Get all active services
        $services = Service::active()->orderBy('sort_order')->get();
        
        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
        
        // Static pages with high priority
        $staticPages = [
            ['url' => 'https://bnbatiment.com/', 'lastmod' => now()->toDateString(), 'changefreq' => 'weekly', 'priority' => '1.0'],
            ['url' => 'https://bnbatiment.com/a-propos', 'lastmod' => now()->toDateString(), 'changefreq' => 'monthly', 'priority' => '0.8'],
            ['url' => 'https://bnbatiment.com/contact', 'lastmod' => now()->toDateString(), 'changefreq' => 'monthly', 'priority' => '0.9'],
            ['url' => 'https://bnbatiment.com/zones', 'lastmod' => now()->toDateString(), 'changefreq' => 'monthly', 'priority' => '0.8'],
            ['url' => 'https://bnbatiment.com/tarifs', 'lastmod' => now()->toDateString(), 'changefreq' => 'monthly', 'priority' => '0.7'],
            ['url' => 'https://bnbatiment.com/realisations', 'lastmod' => now()->toDateString(), 'changefreq' => 'weekly', 'priority' => '0.6'],
            ['url' => 'https://bnbatiment.com/avis', 'lastmod' => now()->toDateString(), 'changefreq' => 'weekly', 'priority' => '0.6'],
            ['url' => 'https://bnbatiment.com/blog', 'lastmod' => now()->toDateString(), 'changefreq' => 'weekly', 'priority' => '0.7'],
        ];
        
        // Add static pages
        foreach ($staticPages as $page) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>{$page['url']}</loc>\n";
            $xml .= "    <lastmod>{$page['lastmod']}</lastmod>\n";
            $xml .= "    <changefreq>{$page['changefreq']}</changefreq>\n";
            $xml .= "    <priority>{$page['priority']}</priority>\n";
            $xml .= "  </url>\n";
        }
        
        // Add service pages
        foreach ($services as $service) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>https://bnbatiment.com/services/{$service->slug}</loc>\n";
            $xml .= "    <lastmod>{$service->updated_at->toDateString()}</lastmod>\n";
            $xml .= "    <changefreq>monthly</changefreq>\n";
            $xml .= "    <priority>0.8</priority>\n";
            $xml .= "  </url>\n";
        }
        
        // Add blog post pages
        foreach ($blogPosts as $post) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>https://bnbatiment.com/blog/{$post->slug}</loc>\n";
            $xml .= "    <lastmod>{$post->published_at->toDateString()}</lastmod>\n";
            $xml .= "    <changefreq>monthly</changefreq>\n";
            $xml .= "    <priority>0.7</priority>\n";
            $xml .= "  </url>\n";
        }
        
        // City-specific service pages
        $cities = ['lyon', 'saint-etienne', 'valence', 'clermont-ferrand', 'grenoble'];
        foreach ($cities as $city) {
            $xml .= "  <url>\n";
            $xml .= "    <loc>https://bnbatiment.com/services/{$city}</loc>\n";
            $xml .= "    <lastmod>" . now()->toDateString() . "</lastmod>\n";
            $xml .= "    <changefreq>weekly</changefreq>\n";
            $xml .= "    <priority>0.9</priority>\n";
            $xml .= "  </url>\n";
        }
        
        $xml .= '</urlset>';
        
        return response($xml, 200)->header('Content-Type', 'application/xml');
    }
}

