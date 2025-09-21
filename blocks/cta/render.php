<?php
defined('ABSPATH') || exit;

$heading = isset($attributes['heading']) ? esc_html($attributes['heading']) : '';
$subtitle = isset($attributes['subtitle']) ? esc_html($attributes['subtitle']) : '';
$button_text = isset($attributes['buttonText']) ? esc_html($attributes['buttonText']) : '';
$button_url = isset($attributes['buttonUrl']) ? esc_url($attributes['buttonUrl']) : '';
$button_link = isset($attributes['buttonLink']) && is_array($attributes['buttonLink']) ? $attributes['buttonLink'] : array();
$button_link_type = isset($attributes['buttonLinkType']) ? $attributes['buttonLinkType'] : 'url';
$button_link_page = isset($attributes['buttonLinkPage']) ? intval($attributes['buttonLinkPage']) : 0;
$button_link_post = isset($attributes['buttonLinkPost']) ? intval($attributes['buttonLinkPost']) : 0;
$button_link_recipient = isset($attributes['buttonLinkRecipient']) ? intval($attributes['buttonLinkRecipient']) : 0;

// Determine the final URL to use, prioritising the LinkControl payload and falling back to legacy fields.
$final_url = '';
$target = '';
$title_attr = '';

if (!empty($button_link['url'])) {
    $final_url = esc_url($button_link['url']);
    $target = !empty($button_link['opensInNewTab']) ? ' target="_blank" rel="noopener noreferrer"' : '';
    $title_attr = !empty($button_link['title']) ? ' title="' . esc_attr($button_link['title']) . '"' : '';
} elseif (!empty($button_url)) {
    $final_url = esc_url($button_url);
} else {
    switch ($button_link_type) {
        case 'page':
            if ($button_link_page > 0) {
                $final_url = get_permalink($button_link_page);
            }
            break;
        case 'post':
            if ($button_link_post > 0) {
                $final_url = get_permalink($button_link_post);
            }
            break;
        case 'recipient':
            if ($button_link_recipient > 0) {
                $final_url = get_permalink($button_link_recipient);
            }
            break;
        default:
            break;
    }
}
?>

<section class="nppf-cta" style="width: 100vw; margin-left: calc(-50vw + 50%);">
    <div class="nppf-container nppf-text-center">
        <?php if ($heading): ?>
            <h2 class="nppf-title nppf-title-white"><?php echo $heading; ?></h2>
        <?php endif; ?>
        
        <?php if ($subtitle): ?>
            <p class="nppf-subtitle"><?php echo $subtitle; ?></p>
        <?php endif; ?>
        
        <?php if ($button_text && $final_url): ?>
            <a href="<?php echo $final_url; ?>" class="nppf-btn nppf-btn-outline"<?php echo $target . $title_attr; ?>>
                <?php echo $button_text; ?>
            </a>
        <?php endif; ?>
    </div>
</section>