(function() {
    const { __ } = wp.i18n;
    const { useBlockProps } = wp.blockEditor;

    function Edit({ attributes, setAttributes }) {
        const blockProps = useBlockProps({ 
            className: 'nppf-deprecated-block',
            style: { 
                padding: '2rem',
                backgroundColor: '#f0f0f0',
                border: '2px dashed #ccc',
                textAlign: 'center'
            }
        });

        return wp.element.createElement('div', blockProps,
            wp.element.createElement('h3', null, __('This block has been deprecated', 'nppf-blocks')),
            wp.element.createElement('p', null, __('Please replace this block with a supported block.', 'nppf-blocks'))
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
