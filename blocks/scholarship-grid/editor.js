(function() {
    const { __ } = wp.i18n;
    const { useBlockProps, InspectorControls, RichText, MediaUpload } = wp.blockEditor;
    const { PanelBody, Button, TextControl } = wp.components;

    function Edit({ attributes, setAttributes }) {
        const { heading, description, buttonText, buttonUrl, recipients } = attributes;
        const blockProps = useBlockProps();

        const addRecipient = () => {
            setAttributes({
                recipients: [...recipients, { name: '', imageUrl: '', imageId: 0 }]
            });
        };

        const updateRecipient = (index, field, value) => {
            const newRecipients = [...recipients];
            newRecipients[index] = { ...newRecipients[index], [field]: value };
            setAttributes({ recipients: newRecipients });
        };

        const removeRecipient = (index) => {
            const newRecipients = recipients.filter((_, i) => i !== index);
            setAttributes({ recipients: newRecipients });
        };

        return wp.element.createElement(wp.element.Fragment, null,
            wp.element.createElement(InspectorControls, null,
                wp.element.createElement(PanelBody, { title: __('Settings', 'nppf-blocks') },
                    wp.element.createElement(TextControl, {
                        label: __('Button URL', 'nppf-blocks'),
                        value: buttonUrl,
                        onChange: (value) => setAttributes({ buttonUrl: value })
                    })
                )
            ),
            wp.element.createElement('div', blockProps,
                wp.element.createElement('div', { className: 'nppf-recipients-grid' },
                    recipients.map((recipient, index) => 
                        wp.element.createElement('div', { key: index, className: 'nppf-recipient' },
                            wp.element.createElement(MediaUpload, {
                                onSelect: (media) => updateRecipient(index, 'imageUrl', media.url),
                                allowedTypes: ['image'],
                                render: ({ open }) => wp.element.createElement(Button, { 
                                    onClick: open 
                                }, recipient.imageUrl ? 
                                    wp.element.createElement('img', { src: recipient.imageUrl, alt: '' }) : 
                                    __('Add Image', 'nppf-blocks')
                                )
                            }),
                            wp.element.createElement(TextControl, {
                                value: recipient.name,
                                onChange: (value) => updateRecipient(index, 'name', value),
                                placeholder: __('Recipient name', 'nppf-blocks')
                            }),
                            wp.element.createElement(Button, { 
                                isDestructive: true, 
                                onClick: () => removeRecipient(index) 
                            }, __('Remove', 'nppf-blocks'))
                        )
                    )
                ),
                wp.element.createElement(Button, { 
                    onClick: addRecipient, 
                    variant: "primary" 
                }, __('Add Recipient', 'nppf-blocks')),
                wp.element.createElement('div', { className: 'nppf-grid-footer' },
                    wp.element.createElement(RichText, {
                        tagName: 'h2',
                        value: heading,
                        onChange: (value) => setAttributes({ heading: value }),
                        placeholder: __('Heading', 'nppf-blocks')
                    }),
                    wp.element.createElement(RichText, {
                        tagName: 'p',
                        value: description,
                        onChange: (value) => setAttributes({ description: value }),
                        placeholder: __('Description', 'nppf-blocks')
                    }),
                    wp.element.createElement(RichText, {
                        tagName: 'span',
                        className: 'nppf-btn',
                        value: buttonText,
                        onChange: (value) => setAttributes({ buttonText: value }),
                        placeholder: __('Button', 'nppf-blocks')
                    })
                )
            )
        );
    }

    // Register the block
    wp.blocks.registerBlockType('nppf-blocks/scholarship-grid', {
        edit: Edit,
        save: function() {
            return null; // Dynamic block
        }
    });
})();