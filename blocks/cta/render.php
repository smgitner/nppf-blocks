<?php
defined('ABSPATH') || exit;

$heading = isset($attributes['heading']) ? esc_html($attributes['heading']) : '';
$subtitle = isset($attributes['subtitle']) ? esc_html($attributes['subtitle']) : '';
$button_text = isset($attributes['buttonText']) ? esc_html($attributes['buttonText']) : '';
$button_url = isset($attributes['buttonUrl']) ? esc_url($attributes['buttonUrl']) : '';
?>

<section class="nppf-cta" style="width: 100vw; margin-left: calc(-50vw + 50%);">
    <div class="nppf-container nppf-text-center">
        <?php if ($heading): ?>
            <h2 class="nppf-title nppf-title-white"><?php echo $heading; ?></h2>
        <?php endif; ?>
        
        <?php if ($subtitle): ?>
            <p class="nppf-subtitle"><?php echo $subtitle; ?></p>
        <?php endif; ?>
        
        <?php if ($button_text && $button_url): ?>
            <a href="<?php echo $button_url; ?>" class="nppf-btn nppf-btn-outline">
                <?php echo $button_text; ?>
            </a>
        <?php endif; ?>
    </div>
</section>