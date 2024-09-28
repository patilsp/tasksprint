// import { NextRequest, NextResponse } from 'next/server';
// import bcrypt from 'bcrypt';
// import { connectToDB } from '@/utils/database';
// import User from '@/models/user';

// export async function POST(req) {
//   try {
//     const { email, username, password } = await req.json();
//     await connectToDB();

//     // Check if user already exists
//     const existingUser = await User.findOne({ $or: [{ email }, { username }] });
//     if (existingUser) {
//       return NextResponse.json({ error: "User already exists" }, { status: 400 });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const newUser = new User({
//       email,
//       username,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     return NextResponse.json({ message: "User created successfully" }, { status: 201 });
//   } catch (error) {
//     console.error("Registration error:", error);
//     return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
//   }
// }