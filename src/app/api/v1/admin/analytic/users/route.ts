import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";
import {authMiddleware} from "@/middleware/auth";
import {Profile, TProfile} from "@/lib/models";
import {NextResponse} from "next/server";
import {adminMiddleware} from "@/middleware/admin";

export async function GET() {
    const session = await getServerSession(authOptions);
    const middlewareAuthResponse = authMiddleware(session);
    if (middlewareAuthResponse.status === 401) {
        return middlewareAuthResponse;
    }

    const profile = await Profile.findOne({ email: session?.user?.email });
    const middlewareAdminResponse = adminMiddleware(profile);
    if (middlewareAdminResponse.status === 403) {
        return middlewareAuthResponse;
    }

    const profilesByDate = await Profile.aggregate([
        {
            $group: {
                _id: {
                    $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }, // Formats a date as a string (year-month-day)
                },
                amount: { $sum: 1 }, // Counts the number of users for each date
            },
        },
        {
            $project: {
                _id: 0, // Removes the _id field from the results
                date: '$_id', // Renames _id to date
                amount: 1,
            },
        },
        {
            $sort: { date: 1 }, // Sort by date
        },
    ]);

    const currentDate = new Date();
    const todayMidnight = new Date(currentDate.setHours(0, 0, 0, 0)).getTime();
    const yesterdayMidnight = new Date(currentDate.setDate(currentDate.getDate() - 1)).setHours(0, 0, 0, 0);

    const profiles = await Profile.find().exec();

    // Get the profiles that were created today
    const todayCreatedProfiles = profiles.filter((profile: TProfile) => (
        new Date(profile.createdAt).setHours(0, 0, 0, 0) === todayMidnight
    ));

    // Get the profiles that were created yesterday
    const yesterdayCreatedProfiles = profiles.filter((profile: TProfile) => (
        new Date(profile.createdAt).setHours(0, 0, 0, 0) === yesterdayMidnight
    ));

    // Get the active today profiles
    const activeTodayProfiles = profiles.filter((profile: TProfile) => (
        profile.activity.get(todayMidnight.toString())
    ));

    const activitiesByDate = profiles
        .map((profile: TProfile) => Array.from(profile.activity))
        .flat();

    // Creates an object to store the number of activities by date
    const activityCountByDate: Record<string, number> = {};

    // Counts the number of activities for each date
    activitiesByDate.forEach((activity) => {
        if (activity[1]) {
            const dateString = new Date(Number(activity[0])).toString();

            if (activityCountByDate[dateString]) {
                activityCountByDate[dateString]++;
            } else {
                activityCountByDate[dateString] = 1;
            }
        }
    });

    const activitiesByDateArray = Object.entries(activityCountByDate).map(([key, value]) => {
        const date = new Date(key);
        return {
            date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`, // %Y-%m-%d
            amount: value
        };
    });

    return NextResponse.json({
        profilesByDate: profilesByDate.reverse(),
        totalAmount: profiles.length,
        todayCreated: todayCreatedProfiles.length,
        yesterdayCreated: yesterdayCreatedProfiles.length,
        activeTodayProfilesAmount: activeTodayProfiles.length,
        activitiesByDate: activitiesByDateArray.reverse()
    });
}