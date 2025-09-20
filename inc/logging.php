<?php
defined('ABSPATH') || exit;

/**
 * Simple logging function to prevent errors
 */
function nppf_log($message, $context = array(), $level = 'info') {
    // Do nothing - just prevent the undefined function error
    return;
}