(function() {
    const { __ } = wp.i18n;
    const { useBlockProps, RichText } = wp.blockEditor;

    function Edit({ attributes, setAttributes }) {
        const { title, subtitle, buttonText, buttonUrl } = attributes;
        const blockProps = useBlockProps();

        return wp.element.createElement('div', blockProps,
            wp.element.createElement('div', { className: 'nppf-cta' },
                wp.element.createElement('div', { className: 'nppf-text-center' },
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
                        className: 'nppf-btn nppf-btn-outline',
                        value: buttonText,
                        onChange: (value) => setAttributes({ buttonText: value }),
                        placeholder: __('Button text', 'nppf-blocks'),
                        href: buttonUrl
                    })
                )
            )
        );
    }

    // Register the block
    wp.blocks.registerBlockType('nppf-blocks/cta', {
        edit: Edit,
        save: function() {
            return null; // Dynamic block
        }
    });
})();