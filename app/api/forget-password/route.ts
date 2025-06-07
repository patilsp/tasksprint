import { connectToDB } from "@/utils/database";
import { UserModel } from "@/lib/models/User.models";
import { SendEmail } from "@/lib/services/MainService";
import {
  GenerateToken,
  GenerateTokenReset,
} from "@/lib/services/Token.service";
import { NextRequest, NextResponse } from "next/server";

connectToDB();
export const POST = async (request: NextRequest) => {
  try {
    const { email } = await request.json();
    const existUser = await UserModel.findOne({ email });
    if (!existUser) {
      return NextResponse.json(
        { error: "User Not Found" },
        {
          status: 404,
        }
      );
    }

    const token = await GenerateTokenReset(existUser._id);

    await SendEmail(existUser.name, existUser.email, token);

    const response = NextResponse.json(
      { msg: "Please check your mail" },
      {
        status: 201,
      }
    );

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
