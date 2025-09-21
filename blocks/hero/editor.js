(function() {
    const { __ } = wp.i18n;
    const { useBlockProps, InspectorControls, MediaUpload, RichText, LinkControl } = wp.blockEditor;
    const { PanelBody, Button } = wp.components;
    const { useMemo, useCallback, useEffect } = wp.element;

    function Edit({ attributes, setAttributes }) {
        const { subtitle, title, backgroundImage, buttonText, buttonUrl, buttonLink, buttonLinkPage, buttonLinkPost, buttonLinkRecipient } = attributes;

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
            if (linkValue.url || !buttonUrl) {
                return;
            }

            setAttributes({
                buttonLink: {
                    url: buttonUrl,
                    opensInNewTab: false,
                    title: '',
                },
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        const onLinkChange = useCallback((newLink) => {
            const normalized = {
                url: newLink?.url || '',
                opensInNewTab: !!newLink?.opensInNewTab,
                title: newLink?.title || '',
                kind: newLink?.kind,
                type: newLink?.type,
                id: newLink?.id || 0,
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
                wp.element.createElement(PanelBody, { title: __('Hero Settings', 'nppf-blocks') },
                    wp.element.createElement(MediaUpload, {
                        onSelect: (media) => setAttributes({ backgroundImage: media.url }),
                        allowedTypes: ['image'],
                        render: ({ open }) => wp.element.createElement(Button, { 
                            onClick: open, 
                            variant: "primary" 
                        }, backgroundImage ? __('Change Background', 'nppf-blocks') : __('Select Background', 'nppf-blocks'))
                    })
                ),
                wp.element.createElement(PanelBody, { title: __('Button Link', 'nppf-blocks'), initialOpen: true },
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
