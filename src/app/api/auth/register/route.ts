import {NextRequest, NextResponse} from 'next/server';
import { hash } from 'bcryptjs';
import User from "@/lib/models/user.schema";
import {Profile} from "@/lib/models";
import {maxAccountsAmount} from "@/lib/authOptions";

/**
 * Handles the POST request to register a new user.
 * Validates the request data, checks for existing users, and limits registrations from the same IP.
 * Saves the new user and creates a profile if it doesn't exist.
 * Returns appropriate responses based on the registration outcome.
 */
export async function POST(req: NextRequest) {

    const { email, name, password } = await req.json();

    if (!email || !name || !password) {
        return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return NextResponse.json({ message: 'User already exists' }, { status: 422 });
    }

    const hashedPassword = await hash(password, 12);

    const ip = req.headers.get('x-forwarded-for') || req.ip || 'Unknown';

    // Forbidden to register more than the specified limit of accounts from one IP
    if (ip !== 'Unknown') { // && ip !== '::1'
        const usersWithSameIp = await User.find({ ip });
        if (usersWithSameIp.length >= maxAccountsAmount) {
            return NextResponse.json({ message: 'Too Many Requests' }, { status: 429 });
        }
    }

    try {
        const newUser = new User({
            email,
            name,
            password: hashedPassword,
            ip
        });

        await newUser.save();

        const existingProfile = await Profile.exists({ email });
        if (!existingProfile) {
            const newProfile = new Profile({email});
            await newProfile.save();
        }
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: e }, { status: 500 });
    }

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
}
