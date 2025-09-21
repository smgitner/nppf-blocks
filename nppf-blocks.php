<?php
/**
 * Plugin Name: NPPF Blocks
 * Plugin URI: https://example.com/nppf-blocks
 * Description: Reusable Gutenberg blocks for NPPF website sections
 * Version: 1.0.0
 * Author: Seth Gitner & ChatGPT
 * Author URI: https://example.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: nppf-blocks
 * Domain Path: /languages
 * Requires at least: 6.5
 * Requires PHP: 7.4
 */

defined('ABSPATH') || exit;

// Define plugin constants
define('NPPF_BLOCKS_VERSION', '1.0.0');
define('NPPF_BLOCKS_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('NPPF_BLOCKS_PLUGIN_URL', plugin_dir_url(__FILE__));

// Include required files
require_once NPPF_BLOCKS_PLUGIN_DIR . 'inc/logging.php';
require_once NPPF_BLOCKS_PLUGIN_DIR . 'inc/register-blocks.php';
require_once NPPF_BLOCKS_PLUGIN_DIR . 'inc/helpers.php';

// Load plugin textdomain
function nppf_blocks_load_textdomain() {
    load_plugin_textdomain('nppf-blocks', false, dirname(plugin_basename(__FILE__)) . '/languages');
}
add_action('init', 'nppf_blocks_load_textdomain');

// Debug: Log plugin loading
error_log('NPPF Blocks plugin loaded successfully');

// Enqueue admin styles
function nppf_blocks_admin_assets() {
    wp_enqueue_style(
        'nppf-blocks-admin',
        NPPF_BLOCKS_PLUGIN_URL . 'assets/admin.css',
        array(),
        NPPF_BLOCKS_VERSION
    );
}
add_action('admin_enqueue_scripts', 'nppf_blocks_admin_assets');

// Enqueue frontend styles
function nppf_blocks_frontend_assets() {
    // Frontend styles will be enqueued here if needed
}
add_action('wp_enqueue_scripts', 'nppf_blocks_frontend_assets');

// Register custom block category
function nppf_blocks_category($categories) {
    return array_merge(
        array(
            array(
                'slug'  => 'nppf-blocks',
                'title' => __('NPPF Blocks', 'nppf-blocks'),
                'icon'  => 'camera',
            ),
        ),
        $categories
    );
}
add_filter('block_categories_all', 'nppf_blocks_category', 10, 1);

// Register blocks
add_action('init', 'nppf_blocks_register_blocks');

// Enqueue block editor scripts
function nppf_blocks_enqueue_editor_scripts() {
    error_log('NPPF: Enqueuing editor scripts');
    
    // Get all block directories
    $blocks_dir = NPPF_BLOCKS_PLUGIN_DIR . 'blocks';
    $block_dirs = glob($blocks_dir . '/*', GLOB_ONLYDIR);
    
    error_log('NPPF: Found ' . count($block_dirs) . ' block directories for script enqueuing');
    
    foreach ($block_dirs as $block_dir) {
        $block_name = basename($block_dir);
        $editor_script = $block_dir . '/editor.js';
        
        if (file_exists($editor_script)) {
            error_log('NPPF: Enqueuing script for block: ' . $block_name);
            wp_enqueue_script(
                'nppf-blocks-' . $block_name . '-editor',
                NPPF_BLOCKS_PLUGIN_URL . 'blocks/' . $block_name . '/editor.js',
                array('wp-blocks', 'wp-element', 'wp-block-editor', 'wp-editor', 'wp-components', 'wp-i18n', 'wp-data'),
                NPPF_BLOCKS_VERSION,
                true
            );
        } else {
            error_log('NPPF: No editor.js found for block: ' . $block_name);
        }
    }
}
add_action('enqueue_block_editor_assets', 'nppf_blocks_enqueue_editor_scripts');

// Admin diagnostics page
function nppf_blocks_admin_menu() {
    add_management_page(
        __('NPPF Block Diagnostics', 'nppf-blocks'),
        __('NPPF Blocks', 'nppf-blocks'),
        'manage_options',
        'nppf-blocks-diagnostics',
        'nppf_blocks_diagnostics_page'
    );
}
add_action('admin_menu', 'nppf_blocks_admin_menu');

function nppf_blocks_diagnostics_page() {
    global $wp_version;
    $theme = wp_get_theme();
    
    echo '<div class="wrap">';
    echo '<h1>' . esc_html__('NPPF Block Diagnostics', 'nppf-blocks') . '</h1>';
    
    echo '<div class="card">';
    echo '<h2>' . esc_html__('System Information', 'nppf-blocks') . '</h2>';
    echo '<table class="widefat">';
    echo '<tr><td><strong>WordPress Version:</strong></td><td>' . esc_html($wp_version) . '</td></tr>';
    echo '<tr><td><strong>Active Theme:</strong></td><td>' . esc_html($theme->get('Name')) . '</td></tr>';
    echo '<tr><td><strong>PHP Version:</strong></td><td>' . esc_html(PHP_VERSION) . '</td></tr>';
    echo '</table>';
    echo '</div>';
    
    echo '<div class="card">';
    echo '<h2>' . esc_html__('Registered Blocks', 'nppf-blocks') . '</h2>';
    
    $blocks = array(
        'nppf-blocks/hero',
        'nppf-blocks/impact-stats',
        'nppf-blocks/testimonial',
        'nppf-blocks/cta'
    );
    
    echo '<ul>';
    foreach ($blocks as $block) {
        $registered = WP_Block_Type_Registry::get_instance()->is_registered($block);
        $status = $registered ? '? Registered' : '? Not Registered';
        $class = $registered ? 'success' : 'error';
        echo '<li><span class="' . esc_attr($class) . '">' . esc_html($status) . '</span> ' . esc_html($block) . '</li>';
    }
    echo '</ul>';
    echo '</div>';
    
    echo '</div>';
}

// Activation hook
function nppf_blocks_activate() {
    nppf_log('Plugin activated', array('version' => NPPF_BLOCKS_VERSION));
    flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'nppf_blocks_activate');

// Deactivation hook
function nppf_blocks_deactivate() {
    nppf_log('Plugin deactivated');
    flush_rewrite_rules();
}
register_deactivation_hook(__FILE__, 'nppf_blocks_deactivate');
