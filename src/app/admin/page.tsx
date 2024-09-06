'use client'

import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, CartesianGrid, XAxis, Line } from "recharts"
import {useEffect, useState} from "react";
import axios from "axios";
import {Skeleton} from "@/components/ui/skeleton";
import {TChartData} from "@/lib/types";
import DateAmountChart from "@/components/admin/DateAmountChart";

export default function AdminDashboardPage() {

    const [data, setData] = useState<{
        profilesByDate: Array<TChartData>;
        activitiesByDate: Array<TChartData>;
        totalAmount: number;
        todayCreated: number;
        yesterdayCreated: number;
        activeTodayProfilesAmount: number;
    }>();

    console.log(data)

    useEffect(() => {
        axios.get("/api/v1/admin/analytic/users")
            .then((profiles) => setData(profiles.data));
    }, []);

    if (!data) {
        return (
            <div className="flex flex-col gap-8 p-6 md:p-10">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, index) => {
                        return <Skeleton key={index} className="h-36" />;
                    })}
                </div>
                <Skeleton className="w-full h-[100vh]" />
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-8 p-6 md:p-10">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Total Users</CardDescription>
                        <CardTitle className="text-4xl">{data.totalAmount}</CardTitle>
                    </CardHeader>
                    {/*<CardContent>*/}
                    {/*    <div className="text-xs text-muted-foreground">+5% from last month</div>*/}
                    {/*</CardContent>*/}
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>New Users Today</CardDescription>
                        <CardTitle className="text-4xl">{data.todayCreated}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-xs text-muted-foreground">{data.yesterdayCreated} yesterday</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Active Users Today</CardDescription>
                        <CardTitle className="text-4xl">{data.activeTodayProfilesAmount}</CardTitle>
                    </CardHeader>
                </Card>
            </div>
            <DateAmountChart
                title="User Registration Trend"
                description="New users registered over time"
                data={data.profilesByDate}
            />
            <DateAmountChart
                title="User Activity Trend"
                data={data.activitiesByDate}
            />
        </div>
    )
}