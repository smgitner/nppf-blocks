(function() {
    const { __ } = wp.i18n;
    const { useBlockProps, InspectorControls, MediaUpload, RichText } = wp.blockEditor;
    const { PanelBody, Button, TextControl } = wp.components;

    function Edit({ attributes, setAttributes }) {
        const { subtitle, title, backgroundImage, buttonText, buttonUrl } = attributes;
        const blockProps = useBlockProps({ 
            className: 'nppf-hero',
            style: { 
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                position: 'relative'
            }
        });

        return wp.element.createElement(wp.element.Fragment, null,
            wp.element.createElement(InspectorControls, null,
                wp.element.createElement(PanelBody, { title: __('Hero Settings', 'nppf-blocks') },
                    wp.element.createElement(MediaUpload, {
                        onSelect: (media) => setAttributes({ backgroundImage: media.url }),
                        allowedTypes: ['image'],
                        render: ({ open }) => wp.element.createElement(Button, { 
                            onClick: open, 
                            variant: "primary" 
                        }, backgroundImage ? __('Change Background', 'nppf-blocks') : __('Select Background', 'nppf-blocks'))
                    }),
                    wp.element.createElement(TextControl, {
                        label: __('Button URL', 'nppf-blocks'),
                        value: buttonUrl,
                        onChange: (value) => setAttributes({ buttonUrl: value })
                    })
                )
            ),
            wp.element.createElement('div', blockProps,
                wp.element.createElement('div', { className: 'nppf-hero-overlay' }),
                wp.element.createElement('div', { className: 'nppf-hero-content' },
                    wp.element.createElement(RichText, {
                        tagName: 'p',
                        className: 'nppf-hero-subtitle',
                        value: subtitle,
                        onChange: (value) => setAttributes({ subtitle: value }),
                        placeholder: __('Subtitle', 'nppf-blocks')
                    }),
                    wp.element.createElement(RichText, {
                        tagName: 'h1',
                        className: 'nppf-hero-title',
                        value: title,
                        onChange: (value) => setAttributes({ title: value }),
                        placeholder: __('Title', 'nppf-blocks')
                    }),
                    wp.element.createElement(RichText, {
                        tagName: 'span',
                        className: 'nppf-btn nppf-btn-outline',
                        value: buttonText,
                        onChange: (value) => setAttributes({ buttonText: value }),
                        placeholder: __('Button text', 'nppf-blocks')
                    })
                )
            )
        );
    }

    // Register the block
    wp.blocks.registerBlockType('nppf-blocks/hero', {
        edit: Edit,
        save: function() {
            return null; // Dynamic block
        }
    });
})();