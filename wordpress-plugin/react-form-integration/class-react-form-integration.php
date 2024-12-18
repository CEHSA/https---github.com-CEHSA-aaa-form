<?php

class ReactFormIntegration {
    public function __construct() {
        // Initialize the plugin
        add_action('init', array($this, 'init'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_frontend_scripts'));
        add_action('admin_init', array($this, 'add_security_headers'));
    }

    public function init() {
        // Register REST API endpoints if needed
        add_action('rest_api_init', array($this, 'register_rest_routes'));
    }

    public function add_admin_menu() {
        add_menu_page(
            'React Form Settings',
            'React Form',
            'manage_options',
            'react-form-settings',
            array($this, 'render_admin_page'),
            'dashicons-feedback',
            20
        );
    }

    public function render_admin_page() {
        // Include admin page template
        include(plugin_dir_path(__FILE__) . 'admin/settings-page.php');
    }

    public function enqueue_admin_scripts($hook) {
        if ('toplevel_page_react-form-settings' !== $hook) {
            return;
        }

        wp_enqueue_style(
            'react-form-admin',
            plugin_dir_url(__FILE__) . 'admin/css/admin.css',
            array(),
            '1.0.0'
        );

        wp_enqueue_script(
            'react-form-admin',
            plugin_dir_url(__FILE__) . 'admin/js/admin.js',
            array('jquery'),
            '1.0.0',
            true
        );

        wp_localize_script('react-form-admin', 'reactFormAdmin', array(
            'nonce' => wp_create_nonce('wp_rest'),
            'apiUrl' => rest_url('react-form/v1/')
        ));
    }

    public function enqueue_frontend_scripts() {
        // Enqueue React app assets
        wp_enqueue_script(
            'react-form-app',
            plugin_dir_url(__FILE__) . 'form-assets/index.js',
            array(),
            '1.0.0',
            true
        );

        wp_enqueue_style(
            'react-form-styles',
            plugin_dir_url(__FILE__) . 'form-assets/index.css',
            array(),
            '1.0.0'
        );

        // Pass WordPress data to React app
        wp_localize_script('react-form-app', 'reactFormData', array(
            'nonce' => wp_create_nonce('wp_rest'),
            'apiUrl' => rest_url('react-form/v1/'),
            'siteUrl' => get_site_url()
        ));
    }

    public function register_rest_routes() {
        // Register custom REST API endpoints here
        register_rest_route('react-form/v1', '/submit', array(
            'methods' => 'POST',
            'callback' => array($this, 'handle_form_submission'),
            'permission_callback' => function () {
                return true; // Adjust based on your security requirements
            }
        ));
    }

    public function handle_form_submission($request) {
        // Handle form submission logic here
        $params = $request->get_params();
        
        // Add your form processing logic here
        
        return rest_ensure_response(array(
            'success' => true,
            'message' => 'Form submitted successfully'
        ));
    }

    public function add_security_headers() {
        // Only add CSP headers on our plugin's admin page
        $screen = get_current_screen();
        if ($screen && $screen->base === 'toplevel_page_react-form-settings') {
            header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://ajax.googleapis.com https://code.jquery.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.ozow.com;");
        }
    }
}
