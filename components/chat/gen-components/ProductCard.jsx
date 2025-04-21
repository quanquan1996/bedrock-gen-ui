import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import toast from 'react-hot-toast' // 需要先安装: npm install react-hot-toast

export default function ProductCard({ id, image, title, price, description }) {

    const handleAddToCart = () => {
        // 显示更大、更醒目的成功提示
        toast.success('添加购物车成功!', {
            duration: 3000,
            // 可以在这里覆盖全局设置
            style: {
                padding: '20px 30px',
                fontSize: '18px',
            },
            // 可以添加图标
            icon: '🛒',
        })
    }

    return (
        <Card key={id} className="flex flex-col w-[200px] shrink-0">
            <CardHeader className="p-4">
                <div className="w-full aspect-square mb-4 overflow-hidden rounded-md">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover object-center"
                    />
                </div>
            </CardHeader>
            <CardContent className="flex-grow p-4 pt-2">
                <CardTitle className="text-sm text-ellipsis whitespace-nowrap overflow-hidden">{title}</CardTitle>
                <CardDescription className="mt-1 text-xs line-clamp-2">{description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4 pt-0">
                <span className="text-sm font-bold">{price}</span>
                <Button size="sm" onClick={handleAddToCart}>Add</Button>
            </CardFooter>
        </Card>
    )
}
