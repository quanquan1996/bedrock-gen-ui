'use client'
import { useState, useEffect, useRef } from "react";
import * as echarts from 'echarts';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function EChartsMessage({ message }) {
    const chartRef = useRef(null);
    const [chart, setChart] = useState(null);

    // 初始化图表
    useEffect(() => {
        // 如果没有数据或DOM元素未准备好，则不执行
        if (!chartRef.current || !message.data) return;

        // 初始化ECharts实例
        const chartInstance = echarts.init(chartRef.current);
        setChart(chartInstance);

        // 处理数据，兼容字符串格式
        let chartOptions;
        try {
            // 如果是字符串，尝试解析为JSON对象
            if (typeof message.data === 'string') {
                chartOptions = JSON.parse(message.data);
            } else {
                // 如果已经是对象，直接使用
                chartOptions = message.data;
            }

            // 使用处理后的配置渲染图表
            chartInstance.setOption(chartOptions);
        } catch (error) {
            console.error("图表数据解析错误:", error);
            // 可以在这里添加错误处理逻辑，比如显示一个错误提示
        }

        // 响应窗口大小变化
        const resizeHandler = () => {
            chartInstance.resize();
        };
        window.addEventListener('resize', resizeHandler);

        // 组件卸载时清理
        return () => {
            chartInstance.dispose();
            window.removeEventListener('resize', resizeHandler);
        };
    }, [message.data]);

    // 当组件大小变化时重新调整图表大小
    useEffect(() => {
        if (chart) {
            chart.resize();
        }
    }, [chart]);

    return (
        <Card className="w-full mx-auto shadow-sm">
            <CardHeader className="py-2 px-4">
                <CardTitle className="text-sm font-medium">数据可视化: {message.name || "图表"}</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
                {/* 图表说明文字 */}
                {message.content && (
                    <div className="text-sm text-gray-700 whitespace-pre-wrap break-words mb-4">
                        {message.content}
                    </div>
                )}

                {/* ECharts 图表容器 */}
                <div
                    ref={chartRef}
                    className="w-full"
                    style={{ height: '500px' }}
                ></div>
            </CardContent>
        </Card>
    );
}
