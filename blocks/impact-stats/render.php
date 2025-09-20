<?php
defined('ABSPATH') || exit;

$heading = isset($attributes['heading']) ? esc_html($attributes['heading']) : '';
$stats = isset($attributes['stats']) ? $attributes['stats'] : [];
?>

<section class="nppf-impact-stats" style="width: 100vw; margin-left: calc(-50vw + 50%);">
    <div class="nppf-container">
        <?php if ($heading): ?>
            <div class="nppf-stats-heading">
                <h2 class="nppf-title nppf-title-white"><?php echo $heading; ?></h2>
            </div>
        <?php endif; ?>
        
        <div class="nppf-stats-grid">
            <?php foreach ($stats as $stat): ?>
                <div class="nppf-stat-item">
                    <div class="nppf-stat-number"><?php echo esc_html($stat['number']); ?></div>
                    <div class="nppf-stat-label"><?php echo esc_html($stat['label']); ?></div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>