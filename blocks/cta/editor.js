(function() {
    const { __ } = wp.i18n;
    const { useBlockProps, InspectorControls, RichText, LinkControl } = wp.blockEditor;
    const { PanelBody } = wp.components;
    const { useMemo, useCallback, useEffect } = wp.element;
    const { useSelect } = wp.data;

    function Edit({ attributes, setAttributes }) {
        const { heading, subtitle, buttonText, buttonUrl, buttonLink, buttonLinkPage, buttonLinkPost, buttonLinkRecipient, buttonLinkType } = attributes;

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
            className: 'nppf-cta',
            style: {
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)',
            },
        });

        const buttonWrapperProps = {
            className: 'nppf-btn nppf-btn-outline',
        };

        if (linkValue.url) {
            buttonWrapperProps.href = linkValue.url;
            if (linkValue.opensInNewTab) {
                buttonWrapperProps.target = '_blank';
                buttonWrapperProps.rel = 'noopener noreferrer';
            }
        }

        const buttonTextElement = wp.element.createElement(RichText, {
            tagName: 'span',
            className: 'nppf-btn-label',
            value: buttonText || '',
            onChange: (value) => setAttributes({ buttonText: value || '' }),
            placeholder: __('DONATE', 'nppf-blocks'),
            allowedFormats: [],
        });

        return wp.element.createElement(wp.element.Fragment, null,
            wp.element.createElement(InspectorControls, null,
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
            wp.element.createElement('section', blockProps,
                wp.element.createElement('div', { className: 'nppf-container nppf-text-center' },
                    wp.element.createElement(RichText, {
                        tagName: 'h2',
                        className: 'nppf-title nppf-title-white',
                        value: heading || '',
                        onChange: (value) => setAttributes({ heading: value || '' }),
                        placeholder: __('Make a lasting impact. Become a donor today.', 'nppf-blocks'),
                        allowedFormats: [],
                    }),
                    wp.element.createElement(RichText, {
                        tagName: 'p',
                        className: 'nppf-subtitle',
                        value: subtitle || '',
                        onChange: (value) => setAttributes({ subtitle: value || '' }),
                        placeholder: __('Supporting photojournalism projects...', 'nppf-blocks'),
                        allowedFormats: [],
                    }),
                    wp.element.createElement(linkValue.url ? 'a' : 'span', buttonWrapperProps, buttonTextElement)
                )
            )
        );
    }

    wp.blocks.registerBlockType('nppf-blocks/cta', {
        edit: Edit,
        save: function() {
            return null;
        },
    });

})();
