import { connectToDB } from "@/utils/database";
import { UserModel } from "@/lib/models/User.models";
import { NextRequest, NextResponse } from "next/server";

connectToDB();
export const POST = async (request: NextRequest) => {
  try {
    const { name, email, password } = await request.json();

    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return NextResponse.json(
        { error: "User already exist" },
        {
          status: 400,
        }
      );
    }

    await UserModel.create({
      name,
      email,
      password,
    });
    return NextResponse.json(
      { msg: "User register successfully" },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
};
