<?php
defined('ABSPATH') || exit;

$quote = isset($attributes['quote']) ? wp_kses_post($attributes['quote']) : '';
$author = isset($attributes['author']) ? esc_html($attributes['author']) : '';
$authorTitle = isset($attributes['authorTitle']) ? esc_html($attributes['authorTitle']) : '';
?>

<section class="nppf-testimonial" style="width: 100vw; margin-left: calc(-50vw + 50%);">
    <div class="nppf-container">
        <?php if ($quote): ?>
            <blockquote class="nppf-testimonial-quote">
                <?php echo $quote; ?>
            </blockquote>
        <?php endif; ?>
        
        <?php if ($author || $authorTitle): ?>
            <div class="nppf-testimonial-author">
                <?php if ($author): ?>
                    <div class="nppf-author-name"><?php echo $author; ?></div>
                <?php endif; ?>
                <?php if ($authorTitle): ?>
                    <div class="nppf-author-title"><?php echo $authorTitle; ?></div>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </div>
</section>