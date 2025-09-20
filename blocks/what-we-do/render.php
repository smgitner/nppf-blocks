<?php
defined('ABSPATH') || exit;

$heading = isset($attributes['heading']) ? esc_html($attributes['heading']) : '';
$content = isset($attributes['content']) ? wp_kses_post($attributes['content']) : '';
$button_text = isset($attributes['buttonText']) ? esc_html($attributes['buttonText']) : '';
$button_url = isset($attributes['buttonUrl']) ? esc_url($attributes['buttonUrl']) : '';
$image_url = isset($attributes['imageUrl']) ? esc_url($attributes['imageUrl']) : '';
?>

<section class="nppf-what-we-do" style="width: 100vw; margin-left: calc(-50vw + 50%);">
    <div class="nppf-container">
        <div class="nppf-grid nppf-grid-2">
            <div class="nppf-content">
                <?php if ($heading): ?>
                    <h2 class="nppf-title"><?php echo $heading; ?></h2>
                <?php endif; ?>
                
                <?php if ($content): ?>
                    <div class="nppf-subtitle"><?php echo $content; ?></div>
                <?php endif; ?>
                
                <?php if ($button_text && $button_url): ?>
                    <a href="<?php echo $button_url; ?>" class="nppf-btn nppf-btn-dark">
                        <?php echo $button_text; ?>
                    </a>
                <?php endif; ?>
            </div>

            <?php if ($image_url): ?>
                <div class="nppf-image">
                    <img src="<?php echo $image_url; ?>" alt="" loading="lazy">
                </div>
            <?php endif; ?>
        </div>
    </div>
</section>