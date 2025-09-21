(function() {
    const { __ } = wp.i18n;
    const { useBlockProps, RichText, InspectorControls } = wp.blockEditor;
    const { Button, PanelBody, TextControl } = wp.components;

    function Edit({ attributes, setAttributes }) {
        const { heading, stats } = attributes;
        const blockProps = useBlockProps({ 
            className: 'nppf-impact-stats',
            style: { 
                padding: '5rem 0',
                background: '#2563eb !important',
                color: 'white !important',
                width: '100vw',
                marginLeft: 'calc(-50vw + 50%)'
            }
        });

        const updateStat = (index, field, value) => {
            const newStats = [...stats];
            newStats[index] = { ...newStats[index], [field]: value };
            setAttributes({ stats: newStats });
        };

        const addStat = () => {
            setAttributes({
                stats: [...stats, { number: '', label: '' }]
            });
        };

        const removeStat = (index) => {
            const newStats = stats.filter((_, i) => i !== index);
            setAttributes({ stats: newStats });
        };

        return wp.element.createElement(wp.element.Fragment, null,
            wp.element.createElement(InspectorControls, null,
                wp.element.createElement(PanelBody, { title: __('Impact Stats Settings', 'nppf-blocks'), initialOpen: true },
                    wp.element.createElement(TextControl, {
                        label: __('Section Heading', 'nppf-blocks'),
                        value: heading,
                        onChange: (value) => setAttributes({ heading: value }),
                        placeholder: __('NPPF\'s Impact to Date', 'nppf-blocks')
                    }),
                    wp.element.createElement('div', { style: { marginTop: '20px' } },
                        wp.element.createElement('h4', null, __('Statistics', 'nppf-blocks')),
                        stats.map((stat, index) => 
                            wp.element.createElement('div', { 
                                key: index, 
                                style: { 
                                    border: '1px solid #ddd', 
                                    padding: '15px', 
                                    marginBottom: '10px',
                                    borderRadius: '4px',
                                    backgroundColor: '#f9f9f9'
                                } 
                            },
                                wp.element.createElement(TextControl, {
                                    label: __('Number/Value', 'nppf-blocks'),
                                    value: stat.number,
                                    onChange: (value) => updateStat(index, 'number', value),
                                    placeholder: __('150+', 'nppf-blocks')
                                }),
                                wp.element.createElement(TextControl, {
                                    label: __('Label', 'nppf-blocks'),
                                    value: stat.label,
                                    onChange: (value) => updateStat(index, 'label', value),
                                    placeholder: __('Stat label', 'nppf-blocks')
                                }),
                                wp.element.createElement(Button, { 
                                    isDestructive: true, 
                                    onClick: () => removeStat(index),
                                    style: { marginTop: '10px' }
                                }, __('Remove Stat', 'nppf-blocks'))
                            )
                        ),
                        wp.element.createElement(Button, { 
                            onClick: addStat, 
                            variant: "primary",
                            style: { marginTop: '10px' }
                        }, __('Add New Stat', 'nppf-blocks'))
                    )
                )
            ),
            wp.element.createElement('div', blockProps,
                wp.element.createElement('div', { className: 'nppf-container' },
                    wp.element.createElement('div', { className: 'nppf-stats-heading' },
                        wp.element.createElement('h2', { 
                            className: 'nppf-title nppf-title-white',
                            style: { 
                                textAlign: 'center',
                                marginBottom: '4rem',
                                color: 'white !important',
                                fontSize: '2.5rem',
                                fontWeight: '800'
                            }
                        }, heading || __('NPPF\'s Impact to Date', 'nppf-blocks'))
                    ),
                    wp.element.createElement('div', { 
                        className: 'nppf-stats-grid',
                        style: {
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                            gap: '3rem',
                            textAlign: 'center'
                        }
                    },
                        stats.map((stat, index) => 
                            wp.element.createElement('div', { 
                                key: index, 
                                className: 'nppf-stat-item',
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }
                            },
                                wp.element.createElement('div', { 
                                    className: 'nppf-stat-number',
                                    style: {
                                        fontSize: '4.5rem',
                                        fontWeight: '900',
                                        color: 'white !important',
                                        lineHeight: '1'
                                    }
                                }, stat.number || __('150+', 'nppf-blocks')),
                                wp.element.createElement('div', { 
                                    className: 'nppf-stat-label',
                                    style: {
                                        fontSize: '1.125rem',
                                        fontWeight: '600',
                                        opacity: '0.9',
                                        textAlign: 'center',
                                        maxWidth: '200px',
                                        color: 'white !important'
                                    }
                                }, stat.label || __('Stat label', 'nppf-blocks'))
                            )
                        )
                    )
                )
            )
        );
    }

})();