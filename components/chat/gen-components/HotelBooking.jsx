import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import toast from 'react-hot-toast' // 需要先安装: npm install react-hot-toast

export default function HotelBookingForm({ username, idcard, phone, email, hotel_name, checkin_date, checkout_date, onSubmit }) {

    const handleSubmit = () => {
        // 显示预订成功提示
        toast.success('酒店预订成功!', {
            duration: 3000,
            style: {
                padding: '20px 30px',
                fontSize: '18px',
            },
            icon: '🏨',
        });

        // 如果提供了onSubmit回调，则调用它
        if (typeof onSubmit === 'function') {
            onSubmit();
        }
    };

    return (
        <Card className="w-full mx-auto">
            <CardHeader className="pb-2">
                <CardTitle>酒店预订</CardTitle>
                <CardDescription>请确认以下预订信息</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <Label htmlFor="name" className="text-sm">姓名</Label>
                        <Input
                            id="username"
                            name="username"
                            value={username}
                            readOnly
                            className="h-8"
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="idcard" className="text-sm">身份证号</Label>
                        <Input
                            id="idcard"
                            name="idcard"
                            value={idcard}
                            readOnly
                            className="h-8"
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="phone" className="text-sm">电话号码</Label>
                        <Input
                            id="phone"
                            name="phone"
                            value={phone}
                            readOnly
                            className="h-8"
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="email" className="text-sm">电子邮箱</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            readOnly
                            className="h-8"
                        />
                    </div>

                    <div className="space-y-1 md:col-span-2">
                        <Label htmlFor="hotel_name" className="text-sm">酒店名称</Label>
                        <Input
                            id="hotel_name"
                            name="hotel_name"
                            value={hotel_name}
                            readOnly
                            className="h-8"
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="checkin_date" className="text-sm">入住日期</Label>
                        <Input
                            id="checkin_date"
                            name="checkin_date"
                            value={checkin_date}
                            readOnly
                            className="h-8"
                        />
                    </div>

                    <div className="space-y-1">
                        <Label htmlFor="checkout_date" className="text-sm">退房日期</Label>
                        <Input
                            id="checkout_date"
                            name="checkout_date"
                            value={checkout_date}
                            readOnly
                            className="h-8"
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="pt-2">
                <Button className="w-full" onClick={handleSubmit}>预订</Button>
            </CardFooter>
        </Card>
    );
}
