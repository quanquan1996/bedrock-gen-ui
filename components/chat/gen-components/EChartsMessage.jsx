'use client'
import { useState, useEffect, useRef, useCallback } from "react";
import * as echarts from 'echarts/core'; // 引入核心库
import { BarChart, FunnelChart } from 'echarts/charts'; // 引入柱状图和漏斗图
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    ToolboxComponent// 引入图例组件
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers'; // 引入渲染器
import { merge } from 'lodash-es'; // 使用 lodash-es 进行深层合并
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
// 注册 ECharts 组件
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent, // 注册图例
    BarChart,
    FunnelChart,
    CanvasRenderer
]);

// 防抖函数 (简单实现)
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 默认配置，解决常见问题（如图例重叠）
const defaultOptions = {
    legend: {
        orient: 'vertical', // 垂直排列
        right: 10,         // 靠右显示
        top: 'center',       // 垂直居中
        type: 'scroll',      // 如果过多，可以滚动
        textStyle: {
            width: 100, // 限制宽度，自动换行（需ECharts 5+支持较好）
            overflow: 'truncate' // 或 'break'
        }
    },
    tooltip: {
        trigger: 'item'
    },
    grid: { // 适当调整 grid，给图例留出空间
        left: '3%',
        right: '15%', // 右侧留出更多空间给图例
        bottom: '3%',
        containLabel: true
    }
};

export default function EChartsMessage({ message }) {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null); // 使用 useRef 存储实例
    const [error, setError] = useState(null);

    // 定义更新图表的函数，使用 useCallback 避免不必要的重定义
    const updateChart = useCallback((data) => {
        setError(null); // 清除旧错误
        if (!chartInstanceRef.current) return;

        try {
            let userOptions = typeof data === 'string' ? JSON.parse(data) : data;

            if (!userOptions) {
                setError("图表数据为空。");
                return;
            }

            // 深层合并默认配置和用户配置
            // 用户配置会覆盖默认配置中相同的键
            const finalOptions = merge({}, defaultOptions, userOptions);

            // *** 特别注意：针对图例重叠，请确保您的 userOptions 中 legend 配置合理 ***
            // 如果您传入的 userOptions 强制设置了水平图例，它会覆盖 defaultOptions。
            // 您可以在这里或在生成数据时，就将 legend 设置为：
            // legend: { top: 'bottom' } 或 legend: { right: 10, top: 'center', orient: 'vertical' }
            // 例如，强制覆盖图例设置：
            // finalOptions.legend = {
            //     ...finalOptions.legend, // 保留用户可能有的其他设置
            //     orient: 'vertical',
            //     right: 10,
            //     top: 'center',
            // };


            chartInstanceRef.current.setOption(finalOptions, {
                // notMerge: true, // 如果希望每次都全新渲染，可以设置 true
            });

        } catch (e) {
            console.error("图表数据处理或渲染错误:", e);
            setError(`图表加载失败: ${e.message}`);
        }
    }, []); // 依赖为空，因为函数内部逻辑不依赖外部可变状态

    // 初始化和数据更新 Effect
    useEffect(() => {
        if (!chartRef.current) return;

        // 1. 初始化 (仅一次)
        if (!chartInstanceRef.current) {
            chartInstanceRef.current = echarts.init(chartRef.current);
        }

        // 2. 更新数据
        if (message.data) {
            updateChart(message.data);
        } else {
            setError("未提供图表数据。");
        }

        // 3. 清理函数
        return () => {
            // 不在这里 dispose，除非组件确定要完全卸载且不再使用
            // chartInstanceRef.current?.dispose();
        };
    }, [message.data, updateChart]); // 依赖 message.data 和 updateChart


    // Resize Effect
    useEffect(() => {
        const chart = chartInstanceRef.current;
        if (!chart || !chartRef.current) return;

        // 使用 ResizeObserver
        const resizeObserver = new ResizeObserver(
            debounce(() => {
                chart.resize();
            }, 150) // 添加防抖
        );

        resizeObserver.observe(chartRef.current);

        // 清理
        return () => {
            resizeObserver.disconnect();
            // 在这里 dispose 可能是更好的时机
            chart.dispose();
            chartInstanceRef.current = null; // 清除引用
        };
    }, []); // 空依赖，只执行一次挂载和卸载

    return (
        <Card className="w-full mx-auto shadow-sm">
            <CardHeader className="py-2 px-4">
                <CardTitle className="text-sm font-medium">数据可视化: {message.name || "图表"}</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
                {message.content && (
                    <div className="text-sm text-gray-700 whitespace-pre-wrap break-words mb-4">
                        {message.content}
                    </div>
                )}

                {error && (
                    <div className="text-red-600 bg-red-100 p-3 rounded-md mb-4">
                        {error}
                    </div>
                )}

                <div
                    ref={chartRef}
                    className="w-full"
                    style={{ height: '600px' }}
                ></div>
            </CardContent>
        </Card>
    );
}