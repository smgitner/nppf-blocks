<?php
defined('ABSPATH') || exit;

$subtitle = isset($attributes['subtitle']) ? esc_html($attributes['subtitle']) : '';
$title = isset($attributes['title']) ? esc_html($attributes['title']) : '';
$bg_image = isset($attributes['backgroundImage']) ? esc_url($attributes['backgroundImage']) : '';
$button_text = isset($attributes['buttonText']) ? esc_html($attributes['buttonText']) : '';
$button_url = isset($attributes['buttonUrl']) ? esc_url($attributes['buttonUrl']) : '';

$bg_style = $bg_image ? 'background-image: url(' . $bg_image . '); background-size: cover; background-position: center; background-repeat: no-repeat; min-height: 100vh; position: relative; width: 100vw; margin-left: calc(-50vw + 50%);' : '';
?>

<section class="nppf-hero" style="<?php echo $bg_style; ?>">
    <div class="nppf-hero-overlay"></div>
    <div class="nppf-hero-content">
        <?php if ($subtitle): ?>
            <p class="nppf-hero-subtitle"><?php echo $subtitle; ?></p>
        <?php endif; ?>
        
        <?php if ($title): ?>
            <h1 class="nppf-hero-title"><?php echo $title; ?></h1>
        <?php endif; ?>
        
        <?php if ($button_text && $button_url): ?>
            <a href="<?php echo $button_url; ?>" class="nppf-btn nppf-btn-outline">
                <?php echo $button_text; ?>
            </a>
        <?php endif; ?>
    </div>
</section>