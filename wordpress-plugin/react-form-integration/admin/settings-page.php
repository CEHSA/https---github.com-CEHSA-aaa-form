<?php
// Prevent direct access to this file
if (!defined('ABSPATH')) {
    die('Direct access not permitted.');
}

function react_form_settings_page() {
    // Check user capabilities
    if (!current_user_can('manage_options')) {
        return;
    }

    // Get the active tab
    $active_tab = isset($_GET['tab']) ? $_GET['tab'] : 'files';
    ?>
    <div class="wrap">
        <h1><?php echo esc_html(get_admin_page_title()); ?></h1>

        <h2 class="nav-tab-wrapper">
            <a href="?page=react-form-settings&tab=files" class="nav-tab <?php echo $active_tab == 'files' ? 'nav-tab-active' : ''; ?>">Files</a>
            <a href="?page=react-form-settings&tab=api" class="nav-tab <?php echo $active_tab == 'api' ? 'nav-tab-active' : ''; ?>">API Status</a>
        </h2>

        <div class="tab-content">
            <?php if ($active_tab == 'files'): ?>
                <div class="files-tab">
                    <div class="file-browser">
                        <table class="wp-list-table widefat fixed striped">
                            <thead>
                                <tr>
                                    <th>File Name</th>
                                    <th>Size</th>
                                    <th>Last Modified</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                $form_dir = plugin_dir_path(__FILE__) . '../form-assets/';
                                if (is_dir($form_dir)) {
                                    $files = scandir($form_dir);
                                    foreach ($files as $file) {
                                        if ($file != '.' && $file != '..' && $file != 'index.php') {
                                            $file_path = $form_dir . $file;
                                            echo '<tr>';
                                            echo '<td>' . esc_html($file) . '</td>';
                                            echo '<td>' . size_format(filesize($file_path)) . '</td>';
                                            echo '<td>' . date('Y-m-d H:i:s', filemtime($file_path)) . '</td>';
                                            echo '</tr>';
                                        }
                                    }
                                }
                                ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            <?php endif; ?>

            <?php if ($active_tab == 'api'): ?>
                <div class="api-tab">
                    <div class="api-status status-ok">
                        <span class="status-indicator"></span>
                        <span class="status-text">Checking API status...</span>
                        <span class="error" style="display: none;"></span>
                    </div>

                    <form method="post" action="options.php">
                        <?php
                        settings_fields('react_form_options');
                        do_settings_sections('react_form_settings');
                        submit_button();
                        ?>
                    </form>
                </div>
            <?php endif; ?>
        </div>
    </div>
    <?php
}
