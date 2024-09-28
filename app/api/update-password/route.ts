import { connectToDB } from "@/utils/database";
import { UserModel } from "@/lib/models/User.models";
import { SendEmail } from "@/lib/services/MainService";
import {
  GenerateToken,
  GenerateTokenReset,
  VerifyTokenReset,
} from "@/lib/services/Token.service";
import { NextRequest, NextResponse } from "next/server";

connectToDB();
export const PUT = async (request: NextRequest) => {
  try {
    const { password, cpassword, token } = await request.json();

    // kya banda exist  hai

    if (password !== cpassword) {
      return NextResponse.json(
        { error: "password nad cpassword not matched" },
        {
          status: 404,
        }
      );
    }

    const data = await VerifyTokenReset(token);

    const existUser = await UserModel.findByIdAndUpdate(data);

    if (!existUser) {
      return NextResponse.json(
        { error: "User Not Found" },
        {
          status: 404,
        }
      );
    }

    const hasPasswowd = await existUser.UpdatePassword(password);

    await UserModel.findByIdAndUpdate(data, {
      $set: {
        password: hasPasswowd,
      },
    });

    const response = NextResponse.json(
      { msg: "password reset successfully" },
      {
        status: 200,
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
