import { connectToDB } from "@/utils/database";
import { UserModel } from "@/lib/models/User.models";
import { GenerateToken } from "@/lib/services/Token.service";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    await connectToDB();
    const { email, password } = await request.json();

    const existUser = await UserModel.findOne({ email });
    if (!existUser) {
      return NextResponse.json(
        { error: "User Not Found" },
        {
          status: 404,
        }
      );
    }

    const isMatch = await existUser.comparePassword(password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid Credentials" },
        {
          status: 401,
        }
      );
    }

    const token = await GenerateToken(existUser._id);

    const response = NextResponse.json(
      { 
        msg: "User logged in successfully",
        user: {
          _id: existUser._id,
          name: existUser.name,
          email: existUser.email
        }
      },
      {
        status: 201,
      }
    );

    response.cookies.set("authentication", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
};
