function transformValue(obj) {
    const { type, options, value, postfix } = obj;
    if (
        [
            'color',
            'string',
            'slider',
            'select',
            'extend-select',
            'radio',
            'tags',
            'icon',
            'iconLink',
            'headers',
        ].includes(type)
    ) {
        return value == null ? `${value}` : `'${value}${postfix || ''}'`;
    } else if (['boolean', 'number'].includes(type)) {
        return `${value}`;
    } else if (type == 'json') {
        return value;
    } else if (type == 'colors') {
        return JSON.stringify(value);
    } else {
        console.error(`类型未知:${type}`);
        return `void`;
    }
}
export { transformValue };
