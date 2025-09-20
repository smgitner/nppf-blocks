<?php
defined('ABSPATH') || exit;

$heading = isset($attributes['heading']) ? esc_html($attributes['heading']) : '';
$description = isset($attributes['description']) ? wp_kses_post($attributes['description']) : '';
$button_text = isset($attributes['buttonText']) ? esc_html($attributes['buttonText']) : '';
$button_url = isset($attributes['buttonUrl']) ? esc_url($attributes['buttonUrl']) : '';
$recipients = isset($attributes['recipients']) ? $attributes['recipients'] : [];
?>

<section class="nppf-scholarship-grid" style="width: 100vw; margin-left: calc(-50vw + 50%);">
    <div class="nppf-container">
        <?php if (!empty($recipients)): ?>
            <div class="nppf-recipients-grid">
                <?php foreach ($recipients as $recipient): ?>
                    <div class="nppf-recipient">
                        <?php if (!empty($recipient['imageUrl'])): ?>
                            <div class="nppf-recipient-image">
                                <img src="<?php echo esc_url($recipient['imageUrl']); ?>" 
                                     alt="<?php echo esc_attr($recipient['name']); ?>" 
                                     loading="lazy">
                            </div>
                        <?php endif; ?>
                        <?php if (!empty($recipient['name'])): ?>
                            <p class="nppf-recipient-name"><?php echo esc_html($recipient['name']); ?></p>
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
        
        <div class="nppf-text-center nppf-grid-footer">
            <?php if ($heading): ?>
                <h2 class="nppf-title"><?php echo $heading; ?></h2>
            <?php endif; ?>
            
            <?php if ($description): ?>
                <p class="nppf-subtitle"><?php echo $description; ?></p>
            <?php endif; ?>
            
            <?php if ($button_text && $button_url): ?>
                <a href="<?php echo $button_url; ?>" class="nppf-btn nppf-btn-primary">
                    <?php echo $button_text; ?>
                </a>
            <?php endif; ?>
        </div>
    </div>
</section>