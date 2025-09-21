(function() {
    const { __ } = wp.i18n;
    const { useBlockProps, RichText, InspectorControls } = wp.blockEditor;
    const { PanelBody, TextControl } = wp.components;
    const { useState, useEffect } = wp.element;

    function Edit({ attributes, setAttributes }) {
        const { heading, subtitle, buttonText, buttonUrl } = attributes;
        const blockProps = useBlockProps();

        const defaultHeading = __('Make a lasting impact. Become a donor today.', 'nppf-blocks');
        const defaultButtonText = __('DONATE', 'nppf-blocks');
        const defaultButtonUrl = '#donate';

        const [headingValue, setHeadingValue] = useState(typeof heading === 'undefined' ? defaultHeading : (heading || ''));
        const [subtitleValue, setSubtitleValue] = useState(subtitle || '');
        const [buttonTextValue, setButtonTextValue] = useState(typeof buttonText === 'undefined' ? defaultButtonText : (buttonText || ''));
        const buttonUrlValue = typeof buttonUrl === 'undefined' ? defaultButtonUrl : buttonUrl;

        // Ensure block starts with metadata defaults when attributes are missing (new block insert).
        useEffect(() => {
            if (typeof heading === 'undefined') {
                setAttributes({ heading: defaultHeading });
                setHeadingValue(defaultHeading);
                return;
            }
            setHeadingValue(heading || '');
        }, [heading]);

        useEffect(() => {
            setSubtitleValue(subtitle || '');
        }, [subtitle]);

        useEffect(() => {
            if (typeof buttonText === 'undefined') {
                setAttributes({ buttonText: defaultButtonText });
                setButtonTextValue(defaultButtonText);
                return;
            }
            setButtonTextValue(buttonText || '');
        }, [buttonText]);

        useEffect(() => {
            if (typeof buttonUrl === 'undefined') {
                setAttributes({ buttonUrl: defaultButtonUrl });
            }
        }, [buttonUrl]);

        return wp.element.createElement(wp.element.Fragment, null,
            wp.element.createElement(InspectorControls, null,
                wp.element.createElement(PanelBody, { title: __('Button settings', 'nppf-blocks') },
                    wp.element.createElement(TextControl, {
                        label: __('Button URL', 'nppf-blocks'),
                        value: buttonUrlValue,
                        onChange: (value) => setAttributes({ buttonUrl: value || '' })
                    })
                )
            ),
            wp.element.createElement('div', blockProps,
                wp.element.createElement('div', { className: 'nppf-cta' },
                    wp.element.createElement('div', { className: 'nppf-text-center' },
                        wp.element.createElement(RichText, {
                            tagName: 'h2',
                            className: 'nppf-title',
                            value: headingValue,
                            onChange: (value) => {
                                setHeadingValue(value || '');
                                setAttributes({ heading: value || '' });
                            },
                            placeholder: __('Title', 'nppf-blocks'),
                            allowedFormats: []
                        }),
                        wp.element.createElement(RichText, {
                            tagName: 'p',
                            className: 'nppf-subtitle',
                            value: subtitleValue,
                            onChange: (value) => {
                                setSubtitleValue(value || '');
                                setAttributes({ subtitle: value || '' });
                            },
                            placeholder: __('Subtitle', 'nppf-blocks'),
                            allowedFormats: []
                        }),
                        wp.element.createElement(RichText, {
                            tagName: 'span',
                            className: 'nppf-btn nppf-btn-outline',
                            value: buttonTextValue,
                            onChange: (value) => {
                                setButtonTextValue(value || '');
                                setAttributes({ buttonText: value || '' });
                            },
                            placeholder: __('Button text', 'nppf-blocks'),
                            allowedFormats: []
                        })
                    )
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
