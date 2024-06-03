import React from 'react';
import * as echarts from 'echarts';
import { config } from '../../decorators/config.js';
import { CHART_IMAGE_CONFIG } from './chart-image-config.js';

@config(CHART_IMAGE_CONFIG)
class ChartImage extends React.Component {
    static tagNamePrefix = 'chart-image';
    chart;
    carousel = false; // 开启轮播
    roadmap = false; // 路线图
    heatmap = false; // 热力图
    // echart 的option 配置
    area = 'world';
    type = 'world';
    option = {
        geo: {
            type: 'map',
            map: '500000', // 使用世界地图
            show: true,
            itemStyle: {
                normal: {
                    areaColor: '#fff0',
                    borderWidth: 0,
                },
            },
        },
        series: [
            {
                layoutCenter: ['50%', '50%'], //地图位置
                type: 'map',
                map: '500000', // 使用世界地图
                itemStyle: {
                    normal: {
                        areaColor: '#fff0',
                        borderWidth: 0,
                    },
                },
                // zoom: 1.04,
                // // top: 90,
                // aspectScale: 0.8,
            },
        ],
    };
    set linesData(list) {
        this.setData('lines', list);
    }
    set effectScattereData(list) {
        this.setData('effectScatter', list);
    }
    set heatmapData(list) {
        this.setData('heatmap', list);
    }
    getMapJSON(type) {
        return require(`../../assets/json/world.json`);
    }
    // 清除涟漪点数据
    clearEffectScatter() {
        this.clearData('effectScatter');
    }
    // 清除连线数据
    clearLines() {
        this.clearData('lines');
    }
    // 清除热力图数据
    clearHeatmap() {
        this.clearData('heatmap');
    }
    clearAllData() {
        this.clearEffectScatter();
        this.clearLines();
        this.clearHeatmap();
    }
    setData(type, list) {
        let option = this.chart.getOption(),
            series = option.series,
            serie = series.filter((item) => item.type == type)[0];
        let data = [];
        switch (type) {
            case 'heatmap':
                data = this.heatmapConverData(list);
                break;
            case 'lines':
                data = this.lineConvertData(list);
                break;
            case 'effectScatter':
                data = this.effectScatterConvertData(list);
                break;
        }
        serie.data = data;
        console.log(data);

        this.chart.setOption(option);
    }
    clearData(type) {
        let option = this.chart.getOption(),
            series = option.series,
            serie = series.filter((item) => item.type == type)[0];
        serie.data = [];
        this.chart.setOption(option);
    }
    constructor(props) {
        super(props);
        this.state = {};
    }
    // 涟漪点 数据
    effectScatterConvertData(data) {
        let res = [];
        const { features } = this.getMapJSON(this.area);
        data.forEach((node) => {
            const { name: targetName, value } = node;
            // 有名称和经纬度和值的
            if (targetName && value && value.length >= 3) {
                res.push({
                    name: targetName,
                    value,
                });
                return;
            }
            // 有名称 无经纬度的
            features.forEach((item) => {
                const { properties } = item,
                    { name, centroid } = properties;
                if (name == targetName) {
                    res.push({
                        name,
                        value: [...centroid, value],
                    });
                    return;
                }
            });
        });
        return res;
    }
    // 线 数据
    lineConvertData(data) {
        const res = [];
        const { features } = this.getMapJSON(this.area);
        for (let i = 0; i < data.length; i++) {
            // 线：[来源,去向,线详情]
            const [from, to, value] = data[i];
            let fromCoord = from.coord,
                toCoord = to.coord;
            if (fromCoord && toCoord) {
                res.push([
                    {
                        coord: fromCoord,
                    },
                    {
                        coord: toCoord,
                    },
                    {
                        value,
                    },
                ]);
            } else {
                features.forEach((item) => {
                    const { properties } = item,
                        { name, centroid } = properties;
                    fromCoord =
                        !fromCoord && name == from.name ? centroid : fromCoord;
                    toCoord = !toCoord && name == to.name ? centroid : toCoord;
                    if (fromCoord && toCoord) {
                        res.push([
                            {
                                coord: fromCoord,
                            },
                            {
                                coord: toCoord,
                            },
                            {
                                value,
                            },
                        ]);
                        return;
                    }
                });
            }
        }
        return res;
    }
    /**
     *
     * @param {*} data [number,number,number]
     * @returns
     */
    // 支持：
    //  1. 直接经纬度             [number,number,number]
    //  2. 传入 name 和 value     {name:'',value:0}
    heatmapConverData(data) {
        let res = [];
        const { features } = this.getMapJSON(this.area);
        data.forEach((params) => {
            if (Array.isArray(params) && params.length == 3) {
                res.push(params);
            } else {
                const { name: targetName, value } = params;
                // 有名称 无经纬度的
                features.forEach((item) => {
                    const { properties } = item,
                        { name, centroid } = properties;
                    if (name == targetName) {
                        res.push([...centroid, value]);
                        return;
                    }
                });
            }
        });
        return res;
    }
    initChartConfig(type, area) {
        this.type = type;
        this.area = area;
    }
    // 修改chart 数据
    applyData(config) {
        this.chart.setOption(config, {
            notMerge: true,
        });
    }
    componentDidMount() {
        // 应用web component自定义的数据
        this.beforeWebComponentInit();
        // 组件自有逻辑
        this.initChart();
        this.addEvent();
        this.resizeObserver();
        // web component组件初始化数据后,其他组件事件才可以获取到当前组件内容
        this.afterWebComponentInit();
        this.dynamicBG();
    }
    // web components 构造子组件
    afterWebComponentInit() {
        const container = this.props.container;
        // option是 extend 的web component 组件特有的属性
        if (!container || !container.type) {
            return;
        }
        this.initCompleted();
    }
    // 初始化echarts 之前，将 web component 配置项应用到组件上
    beforeWebComponentInit() {
        const container = this.props.container;
        // option是 extend 的web component 组件特有的属性
        if (!container.type) {
            return;
        }
        container.that = this;
        // 使用用户自定义配置项合并chart配置项
        this.initChartConfig(container.type, container.area);
    }
    // 监听容器width，height
    resizeObserver() {
        let resizeTimeout;
        const chartObserver = new ResizeObserver(() => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.chart.resize();
            }, 500);
        });
        chartObserver.observe(this.refs.chartImage);
    }
    dynamicBG() {
        let canvas = this.refs.chartImage,
            image = this.refs.image;
        window.addEventListener('resize', () => {
            var i = canvas.offsetWidth / canvas.offsetHeight;
            if (i > 2.107) {
                image.style.backgroundSize =
                    image.offsetHeight * 0.795 * 2.107 + 'px 85.2%';
            } else {
                image.style.backgroundSize =
                    '82% ' + (image.offsetWidth * 0.88) / 2.107 + 'px';
            }
            this.chart.resize();
            // 当窗口尺寸变化时，会执行这里的代码
        });

        // console.log(this.refs.chartImage, this.refs.image);
        // let mapCanvas = this.refs.chartImage.querySelector('canvas');

        // let observer = new ResizeObserver(() => {
        //     var i = mapCanvas.offsetWidth / mapCanvas.offsetHeight;
        //     if (i > 2.107) {
        //         this.refs.image.style.backgroundSize =
        //             this.refs.image.offsetHeight * 0.795 * 2.107 + 'px 85.2%';
        //     } else {
        //         this.refs.image.style.backgroundSize =
        //             '82% ' +
        //             (this.refs.image.offsetWidth * 0.88) / 2.107 +
        //             'px';
        //     }
        //     this.chart.resize();
        // });
        // observer.observe(mapCanvas);
        // canvas.style['background-image'] = 'url(store/react/map1.png)';
        // canvas.style.backgroundRepeat = 'no-repeat';
        // canvas.style['background-position-x'] = '54%';
        // canvas.style['background-position-y'] = '92px';
        // // canvas.style['background-size'] = 'auto 100%';
        // let observer = new ResizeObserver(() => {
        //     if (canvas.offsetWidth / canvas.offsetHeight > 2) {
        //         canvas.style['background-size'] = `${
        //             canvas.offsetWidth * 0.7453416149068323
        //         }px ${canvas.offsetHeight * 0.683}px`;
        //     } else {
        //         canvas.style['background-size'] = `${
        //             canvas.offsetWidth * 0.75
        //         }px`;
        //     }
        // });
        // observer.observe(canvas);
    }
    initChart() {
        echarts.registerMap('500000', {
            geoJSON: this.getMapJSON(this.area),
        });
        this.chart = echarts.init(this.refs.chartImage);
        this.chart.setOption(this.option);
        window.addEventListener('resize', () => this.chart.resize());
        // 启动轮播
        this.beginCarousel();
    }
    addEvent() {
        this.chart.on('click', (e) => {
            const { componentSubType } = e;
            if (componentSubType == 'map') {
                console.log('地区', e);
            } else if (componentSubType == 'scatter') {
                console.log('散点', e);
            }
            console.log(e);
        });
    }
    initCompleted(detail) {
        const container = this.props.container;
        let customEvent = new CustomEvent('initCompleted', {
            detail,
        });
        container.dispatchEvent(customEvent);
    }
    // 轮播
    beginCarousel() {
        if (!this.carousel) {
            return;
        }
        console.log('轮播', this.chart);
        const option = this.chart.getOption();
        const data = option.series.filter(
            (item) => item.type == 'effectScatter'
        )[0].data;
        let index = 0;
        setInterval(() => {
            this.chart.dispatchAction({
                type: 'showTip',
                seriesIndex: 1, // 涟漪
                dataIndex: index,
            });
            index++;
            index %= data.length;
        }, 3000);
    }
    render() {
        return (
            <div
                style={{ position: 'relative', width: '100%', height: '100%' }}
            >
                <div
                    ref="image"
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        background: 'url(store/react/map1.png) no-repeat',
                        backgroundSize: '80.5% 85.2%',
                        backgroundPosition: 'center',
                    }}
                ></div>
                <div
                    className="chart-image"
                    ref="chartImage"
                    style={{
                        height: '100%',
                    }}
                ></div>
            </div>
        );
    }
    static extends(option) {
        // web component 的索引不能递增，因为索引重置后会重复，而且cache后apply会有冲突。
        const index = String(Math.random()).substring(2),
            tagName = `${ChartImage.tagNamePrefix}-${index}`;
        const { html } = option;
        const type = html[0].config.type.value;
        const area = html[0].config.area.value;
        return {
            tagName: tagName,
            html: `<${tagName} _methods="that"></${tagName}>`,
            js: `class ChartImage${index} extends ChartImageComponent{
                    constructor(){
                        super();
                    }
                    get type(){
                        return '${type}'
                    }
                    get area(){
                        return '${area}'
                    }
                    get option(){
                        return this.that.chart.getOption();
                    }
                    set option(value){
                        this.that.applyData( value || {});
                    }
                    set linesData(lines){
                        this.that.setData('lines',lines)
                    }   
                    set effectScatters(scatters){
                        this.that.setData('effectScatter',scatters)
                    }   
                };
                customElements.define('${tagName}',ChartImage${index});
                `,
        };
    }
}
export { ChartImage };
