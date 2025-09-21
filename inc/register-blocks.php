<?php
defined('ABSPATH') || exit;

function nppf_blocks_register_blocks() {
    // Prevent duplicate registrations
    static $registered = false;
    if ($registered) {
        return;
    }
    $registered = true;
    
    try {
        // Register all blocks by scanning /blocks
        $base = plugin_dir_path(__FILE__) . '../blocks';
        $dirs = glob($base . '/*', GLOB_ONLYDIR);
        
        // Debug: Log what we found
        nppf_log('Block registration started', ['base' => $base, 'dirs_found' => $dirs]);
        
        if (!$dirs) {
            nppf_log('No block directories found', ['base' => $base]);
            return;
        }

        foreach ($dirs as $dir) {
            try {
                $block_json = $dir . '/block.json';
                if (file_exists($block_json)) {
                    $result = register_block_type($dir);
                    nppf_log('Block registered', ['dir' => basename($dir), 'result' => $result]);
                } else {
                    nppf_log('No block.json found', ['dir' => $dir]);
                }
            } catch (Throwable $e) {
                nppf_log('Block register failed', ['dir' => $dir, 'error' => $e->getMessage()]);
            }
        }
    } catch (Throwable $e) {
        nppf_log('register_blocks wrapper error', ['error' => $e->getMessage()]);
    }
}