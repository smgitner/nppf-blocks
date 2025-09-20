<?php
/**
 * Helper functions for NPPF Blocks plugin
 */

defined('ABSPATH') || exit;

/**
 * Get block attributes with defaults
 * 
 * @param array $attributes Block attributes
 * @param array $defaults Default values
 * @return array Merged attributes with defaults
 */
function nppf_get_block_attributes($attributes, $defaults = array()) {
    return wp_parse_args($attributes, $defaults);
}

/**
 * Sanitize block content
 * 
 * @param string $content Content to sanitize
 * @return string Sanitized content
 */
function nppf_sanitize_content($content) {
    return wp_kses_post($content);
}

/**
 * Get image URL with fallback
 * 
 * @param int $attachment_id Image attachment ID
 * @param string $size Image size
 * @return string Image URL or empty string
 */
function nppf_get_image_url($attachment_id, $size = 'full') {
    if (!$attachment_id) {
        return '';
    }
    
    $image_url = wp_get_attachment_image_url($attachment_id, $size);
    return $image_url ? $image_url : '';
}

/**
 * Get block CSS classes
 * 
 * @param array $classes Additional classes
 * @param string $block_name Block name
 * @return string CSS classes
 */
function nppf_get_block_classes($classes = array(), $block_name = '') {
    $base_classes = array('nppf-block');
    
    if ($block_name) {
        $base_classes[] = 'nppf-block-' . sanitize_html_class($block_name);
    }
    
    $all_classes = array_merge($base_classes, $classes);
    return implode(' ', array_filter($all_classes));
}
