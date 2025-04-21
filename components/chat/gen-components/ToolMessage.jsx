import { useState } from "react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function ToolMessage({ message }) {
    return (
        <Card className="w-full mx-auto shadow-sm">
            <CardHeader className="py-2 px-4">
                <CardTitle className="text-sm font-medium">工具调用</CardTitle>
            </CardHeader>
            <CardContent className="py-2 px-4">
                <div className="text-sm text-gray-700 whitespace-pre-wrap break-words overflow-hidden">
                    {message || "这是一条默认提示消息"}
                </div>
            </CardContent>
        </Card>
    );
}
