<?php
/*
Plugin Name: React Form Integration
Plugin URI: https://aaarent.co.za
Description: Integrates React form application with WordPress
Version: 1.0.0
Requires at least: 5.8
Requires PHP: 7.4
Author: AAA Rentals
Author URI: https://aaarent.co.za
License: GPL v2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: react-form-integration
Domain Path: /languages
*/

// Prevent direct access
if (!defined('ABSPATH')) {
    die('WordPress not found');
}

require_once(plugin_dir_path(__FILE__) . 'class-react-form-integration.php');

// Initialize the plugin
$react_form_integration = new ReactFormIntegration();