import {NextRequest, NextResponse} from 'next/server';
import { hash } from 'bcryptjs';
import User from "@/lib/models/user.schema";
import {Profile} from "@/lib/models";

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

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
}
