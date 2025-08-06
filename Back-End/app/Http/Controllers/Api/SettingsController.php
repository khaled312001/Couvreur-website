<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

class SettingsController extends Controller
{
    public function index()
    {
        try {
            $settings = [
                'general' => $this->getGeneralSettings(),
                'notifications' => $this->getNotificationSettings(),
                'security' => $this->getSecuritySettings(),
                'appearance' => $this->getAppearanceSettings(),
                'company' => $this->getCompanySettings(),
                'email' => $this->getEmailSettings(),
                'social' => $this->getSocialSettings(),
            ];

            return response()->json([
                'success' => true,
                'data' => $settings
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching settings: ' . $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $section)
    {
        try {
            $data = $request->all();
            
            switch ($section) {
                case 'general':
                    $this->updateGeneralSettings($data);
                    break;
                case 'notifications':
                    $this->updateNotificationSettings($data);
                    break;
                case 'security':
                    $this->updateSecuritySettings($data);
                    break;
                case 'appearance':
                    $this->updateAppearanceSettings($data);
                    break;
                case 'company':
                    $this->updateCompanySettings($data);
                    break;
                case 'email':
                    $this->updateEmailSettings($data);
                    break;
                case 'social':
                    $this->updateSocialSettings($data);
                    break;
                default:
                    return response()->json([
                        'success' => false,
                        'message' => 'Invalid settings section'
                    ], 400);
            }

            return response()->json([
                'success' => true,
                'message' => 'Settings updated successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating settings: ' . $e->getMessage()
            ], 500);
        }
    }

    public function export()
    {
        try {
            $settings = [
                'general' => $this->getGeneralSettings(),
                'notifications' => $this->getNotificationSettings(),
                'security' => $this->getSecuritySettings(),
                'appearance' => $this->getAppearanceSettings(),
                'company' => $this->getCompanySettings(),
                'email' => $this->getEmailSettings(),
                'social' => $this->getSocialSettings(),
            ];

            $filename = 'settings_' . date('Y-m-d_H-i-s') . '.json';
            
            return response()->json([
                'success' => true,
                'data' => $settings,
                'filename' => $filename
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error exporting settings: ' . $e->getMessage()
            ], 500);
        }
    }

    public function import(Request $request)
    {
        try {
            $request->validate([
                'settings' => 'required|array'
            ]);

            $settings = $request->settings;

            if (isset($settings['general'])) {
                $this->updateGeneralSettings($settings['general']);
            }
            if (isset($settings['notifications'])) {
                $this->updateNotificationSettings($settings['notifications']);
            }
            if (isset($settings['security'])) {
                $this->updateSecuritySettings($settings['security']);
            }
            if (isset($settings['appearance'])) {
                $this->updateAppearanceSettings($settings['appearance']);
            }
            if (isset($settings['company'])) {
                $this->updateCompanySettings($settings['company']);
            }
            if (isset($settings['email'])) {
                $this->updateEmailSettings($settings['email']);
            }
            if (isset($settings['social'])) {
                $this->updateSocialSettings($settings['social']);
            }

            return response()->json([
                'success' => true,
                'message' => 'Settings imported successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error importing settings: ' . $e->getMessage()
            ], 500);
        }
    }

    private function getGeneralSettings()
    {
        return Cache::remember('settings_general', 3600, function () {
            return [
                'site_name' => config('app.name', 'BN BÂTIMENT'),
                'site_description' => 'Entreprise de charpente, couverture et zinguerie',
                'contact_email' => 'contact@bnbuilding.fr',
                'contact_phone' => '+33 1 23 45 67 89',
                'address' => '123 Rue de la Construction, 75001 Paris',
                'working_hours' => '24h/24, 7j/7',
                'timezone' => 'Europe/Paris',
                'language' => 'fr'
            ];
        });
    }

    private function getNotificationSettings()
    {
        return Cache::remember('settings_notifications', 3600, function () {
            return [
                'email_notifications' => true,
                'sms_notifications' => false,
                'quote_alerts' => true,
                'testimonial_alerts' => true,
                'blog_alerts' => false,
                'contact_alerts' => true,
                'user_registration_alerts' => true
            ];
        });
    }

    private function getSecuritySettings()
    {
        return Cache::remember('settings_security', 3600, function () {
            return [
                'two_factor_auth' => false,
                'session_timeout' => 30,
                'password_expiry' => 90,
                'login_attempts' => 5,
                'password_min_length' => 8,
                'require_strong_password' => true
            ];
        });
    }

    private function getAppearanceSettings()
    {
        return Cache::remember('settings_appearance', 3600, function () {
            return [
                'theme' => 'light',
                'primary_color' => '#3B82F6',
                'secondary_color' => '#10B981',
                'language' => 'fr',
                'timezone' => 'Europe/Paris',
                'date_format' => 'd/m/Y',
                'time_format' => 'H:i'
            ];
        });
    }

    private function getCompanySettings()
    {
        return Cache::remember('settings_company', 3600, function () {
            return [
                'company_name' => 'BN BÂTIMENT',
                'company_description' => 'Entreprise spécialisée dans la charpente, couverture et zinguerie',
                'siret' => '12345678901234',
                'vat_number' => 'FR12345678901',
                'founded_year' => '2010',
                'employees_count' => '25',
                'services' => ['Charpente', 'Couverture', 'Zinguerie', 'Rénovation'],
                'certifications' => ['Qualibat', 'RGE', 'ISO 9001']
            ];
        });
    }

    private function getEmailSettings()
    {
        return Cache::remember('settings_email', 3600, function () {
            return [
                'smtp_host' => 'smtp.gmail.com',
                'smtp_port' => 587,
                'smtp_username' => 'contact@bnbuilding.fr',
                'smtp_password' => '',
                'smtp_encryption' => 'tls',
                'from_name' => 'BN BÂTIMENT',
                'from_email' => 'contact@bnbuilding.fr',
                'reply_to' => 'contact@bnbuilding.fr'
            ];
        });
    }

    private function getSocialSettings()
    {
        return Cache::remember('settings_social', 3600, function () {
            return [
                'facebook' => 'https://facebook.com/bnbatiment',
                'twitter' => 'https://twitter.com/bnbatiment',
                'linkedin' => 'https://linkedin.com/company/bnbatiment',
                'instagram' => 'https://instagram.com/bnbatiment',
                'youtube' => 'https://youtube.com/bnbatiment'
            ];
        });
    }

    private function updateGeneralSettings($data)
    {
        $settings = $this->getGeneralSettings();
        $settings = array_merge($settings, $data);
        Cache::put('settings_general', $settings, 3600);
    }

    private function updateNotificationSettings($data)
    {
        $settings = $this->getNotificationSettings();
        $settings = array_merge($settings, $data);
        Cache::put('settings_notifications', $settings, 3600);
    }

    private function updateSecuritySettings($data)
    {
        $settings = $this->getSecuritySettings();
        $settings = array_merge($settings, $data);
        Cache::put('settings_security', $settings, 3600);
    }

    private function updateAppearanceSettings($data)
    {
        $settings = $this->getAppearanceSettings();
        $settings = array_merge($settings, $data);
        Cache::put('settings_appearance', $settings, 3600);
    }

    private function updateCompanySettings($data)
    {
        $settings = $this->getCompanySettings();
        $settings = array_merge($settings, $data);
        Cache::put('settings_company', $settings, 3600);
    }

    private function updateEmailSettings($data)
    {
        $settings = $this->getEmailSettings();
        $settings = array_merge($settings, $data);
        Cache::put('settings_email', $settings, 3600);
    }

    private function updateSocialSettings($data)
    {
        $settings = $this->getSocialSettings();
        $settings = array_merge($settings, $data);
        Cache::put('settings_social', $settings, 3600);
    }
} 