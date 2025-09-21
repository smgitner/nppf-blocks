(function() {
    const { __ } = wp.i18n;
    const { useBlockProps, RichText } = wp.blockEditor;

    function Edit({ attributes, setAttributes }) {
        const { quote, author, authorTitle } = attributes;
        const blockProps = useBlockProps();

        return wp.element.createElement('div', blockProps,
            wp.element.createElement('div', { className: 'nppf-testimonial' },
                wp.element.createElement('div', { className: 'nppf-container' },
                    wp.element.createElement('blockquote', { className: 'nppf-testimonial-quote' },
                        wp.element.createElement(RichText, {
                            value: quote,
                            onChange: (value) => setAttributes({ quote: value }),
                            placeholder: __('Testimonial quote', 'nppf-blocks')
                        })
                    ),
                    wp.element.createElement('div', { className: 'nppf-testimonial-author' },
                        wp.element.createElement(RichText, {
                            tagName: 'div',
                            className: 'nppf-author-name',
                            value: author,
                            onChange: (value) => setAttributes({ author: value }),
                            placeholder: __('Author name', 'nppf-blocks')
                        }),
                        wp.element.createElement(RichText, {
                            tagName: 'div',
                            className: 'nppf-author-title',
                            value: authorTitle,
                            onChange: (value) => setAttributes({ authorTitle: value }),
                            placeholder: __('Author title', 'nppf-blocks')
                        })
                    )
                )
            )
        );
    }

})();