(function() {
    const { __ } = wp.i18n;
    const { useBlockProps, InspectorControls, MediaUpload, RichText, LinkControl } = wp.blockEditor;
    const { PanelBody, Button, TextControl, TextareaControl } = wp.components;
    const { useMemo, useCallback, useEffect } = wp.element;
    const { useSelect } = wp.data;

    function Edit({ attributes, setAttributes }) {
        const { subtitle, title, backgroundImage, buttonText, buttonUrl, buttonLink, buttonLinkPage, buttonLinkPost, buttonLinkRecipient, buttonLinkType } = attributes;

        // Normalize the link object so LinkControl always has usable defaults.
        const linkValue = useMemo(() => {
            if (buttonLink && typeof buttonLink === 'object') {
                return {
                    url: buttonLink.url || '',
                    opensInNewTab: !!buttonLink.opensInNewTab,
                    title: buttonLink.title || '',
                    kind: buttonLink.kind,
                    type: buttonLink.type,
                    id: buttonLink.id || 0,
                };
            }
            return { url: '', opensInNewTab: false, title: '' };
        }, [buttonLink]);

        // Migrate the legacy `buttonUrl` attribute into the link object exactly once.
        useEffect(() => {
            if (!linkValue.url && buttonUrl) {
                setAttributes({
                    buttonLink: {
                        url: buttonUrl,
                        opensInNewTab: false,
                        title: '',
                    },
                });
            }
        }, [linkValue.url, buttonUrl, setAttributes]);

        const legacyLinkRecord = useSelect(
            (select) => {
                if (linkValue.url || buttonUrl) {
                    return null;
                }

                const coreSelect = select('core');

                if (buttonLinkPage) {
                    return coreSelect.getEntityRecord('postType', 'page', buttonLinkPage);
                }

                if (buttonLinkPost) {
                    return coreSelect.getEntityRecord('postType', 'post', buttonLinkPost);
                }

                if (buttonLinkRecipient) {
                    return coreSelect.getEntityRecord('postType', 'recipient', buttonLinkRecipient);
                }

                return null;
            },
            [linkValue.url, buttonUrl, buttonLinkPage, buttonLinkPost, buttonLinkRecipient]
        );

        useEffect(() => {
            if (linkValue.url || buttonUrl) {
                return;
            }

            if (legacyLinkRecord && legacyLinkRecord.link) {
                setAttributes({
                    buttonLink: {
                        url: legacyLinkRecord.link,
                        opensInNewTab: false,
                        title: legacyLinkRecord.title ? legacyLinkRecord.title.rendered || legacyLinkRecord.title : '',
                    },
                    buttonUrl: legacyLinkRecord.link,
                    buttonLinkType: 'url',
                });
            }
        }, [legacyLinkRecord, linkValue.url, buttonUrl, setAttributes]);

        const onLinkChange = useCallback((newLink) => {
            const safeLink = newLink || {};
            const normalized = {
                url: safeLink.url || '',
                opensInNewTab: safeLink.opensInNewTab ? true : false,
                title: safeLink.title || '',
                kind: safeLink.kind,
                type: safeLink.type,
                id: safeLink.id || 0,
            };

            setAttributes({
                buttonLink: normalized,
                buttonUrl: normalized.url,
                buttonLinkType: 'url',
            });
        }, [setAttributes]);

        const onLinkRemove = useCallback(() => {
            setAttributes({
                buttonLink: { url: '', opensInNewTab: false, title: '' },
                buttonUrl: '',
                buttonLinkType: 'url',
                buttonLinkPage: 0,
                buttonLinkPost: 0,
                buttonLinkRecipient: 0,
            });
        }, [setAttributes]);

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
                wp.element.createElement(PanelBody, { title: __('Hero Content', 'nppf-blocks'), initialOpen: true },
                    wp.element.createElement(TextControl, {
                        label: __('Subtitle', 'nppf-blocks'),
                        value: subtitle,
                        onChange: (value) => setAttributes({ subtitle: value }),
                        placeholder: __('Enter subtitle...', 'nppf-blocks')
                    }),
                    wp.element.createElement(TextControl, {
                        label: __('Title', 'nppf-blocks'),
                        value: title,
                        onChange: (value) => setAttributes({ title: value }),
                        placeholder: __('Enter title...', 'nppf-blocks')
                    }),
                    wp.element.createElement(TextControl, {
                        label: __('Button Text', 'nppf-blocks'),
                        value: buttonText,
                        onChange: (value) => setAttributes({ buttonText: value }),
                        placeholder: __('Enter button text...', 'nppf-blocks')
                    })
                ),
                wp.element.createElement(PanelBody, { title: __('Background Image', 'nppf-blocks') },
                    wp.element.createElement(MediaUpload, {
                        onSelect: (media) => setAttributes({ backgroundImage: media.url }),
                        allowedTypes: ['image'],
                        render: ({ open }) => wp.element.createElement(Button, { 
                            onClick: open, 
                            variant: "primary" 
                        }, backgroundImage ? __('Change Background', 'nppf-blocks') : __('Select Background', 'nppf-blocks'))
                    })
                ),
                wp.element.createElement(PanelBody, { title: __('Button Link', 'nppf-blocks') },
                    wp.element.createElement(LinkControl, {
                        value: linkValue,
                        onChange: onLinkChange,
                        onRemove: onLinkRemove,
                        forceIsEditingLink: !linkValue.url,
                        settings: [
                            {
                                id: 'opensInNewTab',
                                title: __('Open in new tab', 'nppf-blocks')
                            }
                        ]
                    })
                )
            ),
            wp.element.createElement('div', blockProps,
                wp.element.createElement('div', { className: 'nppf-hero-overlay' }),
                wp.element.createElement('div', { className: 'nppf-hero-content' },
                    wp.element.createElement('p', { className: 'nppf-hero-subtitle' },
                        subtitle || __('Subtitle', 'nppf-blocks')
                    ),
                    wp.element.createElement('h1', { className: 'nppf-hero-title' },
                        title || __('Title', 'nppf-blocks')
                    ),
                    wp.element.createElement('span', { className: 'nppf-btn nppf-btn-outline' },
                        buttonText || __('Button text', 'nppf-blocks')
                    )
                )
            )
        );
    }

    wp.blocks.registerBlockType('nppf-blocks/hero', {
        edit: Edit,
        save: function() {
            return null;
        },
    });

})();
