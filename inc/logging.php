<?php
defined('ABSPATH') || exit;

/**
 * Simple logging function to prevent errors
 */
function nppf_log($message, $context = array(), $level = 'info') {
    // Enable logging for debugging
    if (is_array($context) && !empty($context)) {
        error_log('NPPF: ' . $message . ' | Context: ' . json_encode($context));
    } else {
        error_log('NPPF: ' . $message);
    }
}