<?php
defined('ABSPATH') || exit;

$quote = isset($attributes['quote']) ? wp_kses_post($attributes['quote']) : '';
$author = isset($attributes['author']) ? esc_html($attributes['author']) : '';
$image_url = isset($attributes['imageUrl']) ? esc_url($attributes['imageUrl']) : '';
?>

<section class="nppf-testimonial" style="width: 100vw; margin-left: calc(-50vw + 50%);">
    <div class="nppf-container">
        <div class="nppf-grid nppf-grid-2">
            <?php if ($image_url): ?>
                <div class="nppf-testimonial-image">
                    <img src="<?php echo $image_url; ?>" alt="" loading="lazy">
                </div>
            <?php endif; ?>

            <div class="nppf-testimonial-content">
                <?php if ($quote): ?>
                    <blockquote class="nppf-testimonial-quote">
                        <?php echo $quote; ?>
                    </blockquote>
                <?php endif; ?>
                
                <?php if ($author): ?>
                    <footer class="nppf-testimonial-author">
                        <?php echo $author; ?>
                    </footer>
                <?php endif; ?>
            </div>
        </div>
    </div>
</section>