(function() {
    const { __ } = wp.i18n;
    const { useBlockProps, RichText } = wp.blockEditor;

    function Edit({ attributes, setAttributes }) {
        const { title, subtitle, buttonText, buttonUrl } = attributes;
        const blockProps = useBlockProps();

        return wp.element.createElement('div', blockProps,
            wp.element.createElement('div', { className: 'nppf-what-we-do' },
                wp.element.createElement('div', { className: 'nppf-container' },
                    wp.element.createElement('div', { className: 'nppf-grid nppf-grid-2' },
                        wp.element.createElement('div', null,
                            wp.element.createElement(RichText, {
                                tagName: 'h2',
                                className: 'nppf-title',
                                value: title,
                                onChange: (value) => setAttributes({ title: value }),
                                placeholder: __('Title', 'nppf-blocks')
                            }),
                            wp.element.createElement(RichText, {
                                tagName: 'p',
                                className: 'nppf-subtitle',
                                value: subtitle,
                                onChange: (value) => setAttributes({ subtitle: value }),
                                placeholder: __('Subtitle', 'nppf-blocks')
                            }),
                            wp.element.createElement(RichText, {
                                tagName: 'a',
                                className: 'nppf-btn nppf-btn-dark',
                                value: buttonText,
                                onChange: (value) => setAttributes({ buttonText: value }),
                                placeholder: __('Button text', 'nppf-blocks'),
                                href: buttonUrl
                            })
                        ),
                        wp.element.createElement('div', { className: 'nppf-image' },
                            wp.element.createElement('img', { src: 'https://via.placeholder.com/600x400', alt: 'Placeholder' })
                        )
                    )
                )
            )
        );
    }

    // Register the block
    wp.blocks.registerBlockType('nppf-blocks/what-we-do', {
        edit: Edit,
        save: function() {
            return null; // Dynamic block
        }
    });
})();