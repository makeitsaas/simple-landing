export const BlockUtils = {
    getBlockTypeIconClass(blockType: string = '') {
        switch (blockType) {
            case 'text-image':
                return 'glyphicon glyphicon-picture';
            case 'text':
                return 'glyphicon glyphicon-text-size';
            case 'title':
                return 'glyphicon glyphicon-header';
            case 'custom':
                return 'glyphicon glyphicon-wrench';
            default:
                return 'glyphicon glyphicon-th-large';
        }
    },
    getCustomTemplate(templateUuid: string) {
        return '<div>custom</div>';
    }
};
