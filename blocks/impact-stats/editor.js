(function() {
    const { __ } = wp.i18n;
    const { useBlockProps, RichText } = wp.blockEditor;
    const { Button } = wp.components;

    function Edit({ attributes, setAttributes }) {
        const { heading, stats } = attributes;
        const blockProps = useBlockProps();

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

        return wp.element.createElement('div', blockProps,
            wp.element.createElement('div', { className: 'nppf-stats-heading' },
                wp.element.createElement(RichText, {
                    tagName: 'h2',
                    value: heading,
                    onChange: (value) => setAttributes({ heading: value }),
                    placeholder: __('Heading', 'nppf-blocks')
                })
            ),
            wp.element.createElement('div', { className: 'nppf-stats-grid' },
                stats.map((stat, index) => 
                    wp.element.createElement('div', { key: index, className: 'nppf-stat-item' },
                        wp.element.createElement(RichText, {
                            tagName: 'div',
                            className: 'nppf-stat-number',
                            value: stat.number,
                            onChange: (value) => updateStat(index, 'number', value),
                            placeholder: __('150+', 'nppf-blocks')
                        }),
                        wp.element.createElement(RichText, {
                            tagName: 'div',
                            className: 'nppf-stat-label',
                            value: stat.label,
                            onChange: (value) => updateStat(index, 'label', value),
                            placeholder: __('Stat label', 'nppf-blocks')
                        }),
                        wp.element.createElement(Button, { 
                            isDestructive: true, 
                            onClick: () => removeStat(index) 
                        }, __('Remove', 'nppf-blocks'))
                    )
                )
            ),
            wp.element.createElement(Button, { 
                onClick: addStat, 
                variant: "primary" 
            }, __('Add Stat', 'nppf-blocks'))
        );
    }

    // Register the block
    wp.blocks.registerBlockType('nppf-blocks/impact-stats', {
        edit: Edit,
        save: function() {
            return null; // Dynamic block
        }
    });
})();