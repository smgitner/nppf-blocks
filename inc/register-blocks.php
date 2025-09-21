<?php
defined('ABSPATH') || exit;

function nppf_blocks_register_blocks() {
    // Debug: Log function call
    error_log('nppf_blocks_register_blocks() called');
    
    // Prevent duplicate registrations
    static $registered = false;
    if ($registered) {
        error_log('Blocks already registered, skipping');
        return;
    }
    $registered = true;
    
    try {
        // Register all blocks by scanning /blocks
        $base = plugin_dir_path(__FILE__) . '../blocks';
        $dirs = glob($base . '/*', GLOB_ONLYDIR);
        
        // Debug: Log what we found
        error_log('NPPF: Block registration started - base: ' . $base);
        error_log('NPPF: Found ' . count($dirs) . ' directories: ' . implode(', ', $dirs));
        
        if (!$dirs) {
            error_log('NPPF: No block directories found - base: ' . $base);
            return;
        }

        foreach ($dirs as $dir) {
            try {
                $block_json = $dir . '/block.json';
                if (file_exists($block_json)) {
                    error_log('NPPF: Registering block: ' . basename($dir));
                    $result = register_block_type($dir);
                    error_log('NPPF: Block registration result: ' . ($result ? 'SUCCESS' : 'FAILED'));
                } else {
                    error_log('NPPF: No block.json found in: ' . $dir);
                }
            } catch (Throwable $e) {
                error_log('NPPF: Block register failed for ' . $dir . ' - Error: ' . $e->getMessage());
            }
        }
    } catch (Throwable $e) {
        error_log('NPPF: register_blocks wrapper error - ' . $e->getMessage());
    }
}