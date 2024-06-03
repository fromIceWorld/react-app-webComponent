function transformValue(obj) {
    const { type, options, value, postfix } = obj;
    if (['string', 'slider'].includes(type)) {
        return value == null ? value : `${value}${postfix || ''}`;
    } else if (
        [
            'radio',
            'colors',
            'tags',
            'icon',
            'iconLink',
            'boolean',
            'number',
            'color',
            'select',
            'extend-select',
        ].includes(type)
    ) {
        return value;
    } else if (['headers', 'json'].includes(type)) {
        return JSON.parse(value);
    } else if (['object-config', 'array-config'].includes(type)) {
        return transform(value);
    } else if (type == 'slider-list') {
        return value.map((item) => `${item.value}${item.postfix || ''}`);
    } else if (type == undefined && value !== undefined) {
        return transform(value);
    } else {
        console.error(`类型未知:${type}`);
        return '';
    }
}
function transform(obj) {
    const type = {}.toString.call(obj);
    let result;
    if (type == '[object Object]') {
        result = {};
        Object.keys(obj).forEach((key) => {
            result[key] = transformValue(obj[key]);
        });
    } else if (type == '[object Array]') {
        result = [];
        obj.forEach((item, index) => {
            result[index] = transformValue(item);
        });
    }
    return result;
}

// 合并 对象数据
function assign(origin, source) {
    const sourceType = {}.toString.call(source),
        originType = {}.toString.call(origin);
    if (sourceType !== originType) {
        return source;
    } else {
        if (sourceType == '[object Object]') {
            Object.keys(source).forEach((key) => {
                origin[key] = assign(origin[key], source[key]);
            });
        } else if (sourceType == '[object Array]') {
            for (let i = 0; i < source.length; i++) {
                origin[i] = assign(origin[i], source[i]);
            }
        } else {
            return source;
        }
    }
    return origin;
}

export { transform, assign, transformValue };
