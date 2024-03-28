import React from 'react';
import { config } from '../../decorators/config.js';
import { BACKGROUND_IMAGE_CONFIG } from './background-image-config.js';
import { transform } from '../../common/index.js';
import PropTypes from 'prop-types';

window['React.Component'] = React.Component;
@config(BACKGROUND_IMAGE_CONFIG)
class BackgroundImage extends React.Component {
    static tagNamePrefix = 'backend-image';
    constructor(props) {
        super(props);
        this.state = {
            backgroundImage: `https://react.docschina.org/images/home/conf2021/cover.svg`,
        };
    }
    componentDidMount() {
        // 应用web component自定义的数据
        this.beforeWebComponentInit();
        // web component组件初始化数据后,其他组件事件才可以获取到当前组件内容
        this.afterWebComponentInit();
    }
    // 修改chart 数据
    applyData(config) {
        const { backgroundImage } = config;
        this.setState({
            backgroundImage,
        });
    }
    // 初始化echarts 之前，将 web component 配置项应用到组件上
    beforeWebComponentInit() {
        const container = this.props.container;
        // option是 extend 的web component 组件特有的属性
        if (!container || !container.option) {
            return;
        }
        container.that = this;
        // 使用用户自定义配置项合并chart配置项
        this.applyData(container.option);
    }
    // web components 构造子组件
    afterWebComponentInit() {
        const container = this.props.container;
        // option是 extend 的web component 组件特有的属性
        if (!container || !container.option) {
            return;
        }
        this.initCompleted();
    }
    initCompleted(detail) {
        const container = this.props.container;
        let customEvent = new CustomEvent('initCompleted', {
            detail,
        });
        container.dispatchEvent(customEvent);
    }
    render() {
        return (
            <div
                className="backend-image"
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <img
                    width={'100%'}
                    height={'100%'}
                    src={this.state.backgroundImage}
                ></img>
            </div>
        );
    }
    static extends(option) {
        // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
        const index = String(Math.random()).substring(2),
            tagName = `${BackgroundImage.tagNamePrefix}-${index}`;
        const { html } = option,
            [base] = html;
        const config = JSON.stringify(transform(base.config));
        return {
            tagName: tagName,
            html: `<${tagName}></${tagName}>`,
            js: `class BackgroundImage${index} extends BackgroundImageComponent{
                    that;
                    constructor(){
                        super();
                    }
                    get image(){
                        return this.that.state.backgroundImage;
                    }
                    set image(value){
                        this.that.applyData({backgroundImage:value});
                    }   
                };
                customElements.define('${tagName}',BackgroundImage${index});
                `,
        };
    }
}
export { BackgroundImage };
