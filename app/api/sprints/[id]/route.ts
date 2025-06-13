import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Sprint from "@/models/Sprint";
import mongoose from "mongoose";

type Params = {
  params: { id: string };
};

// ✅ GET
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    await connectToDB();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid sprint ID" }, { status: 400 });
    }

    const sprint = await Sprint.findById(id);
    if (!sprint) {
      return NextResponse.json({ error: "Sprint not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: sprint._id.toString(),
      name: sprint.name,
      description: sprint.description,
      status: sprint.status,
      startDate: sprint.startDate,
      endDate: sprint.endDate,
      progress: sprint.progress,
      priority: sprint.priority,
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch sprint" }, { status: 500 });
  }
}

// ✅ PUT
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await connectToDB();
    const { id } = params;
    const body = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid sprint ID" }, { status: 400 });
    }

    const updated = await Sprint.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ error: "Sprint not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: updated._id.toString(),
      name: updated.name,
      description: updated.description,
      status: updated.status,
      startDate: updated.startDate,
      endDate: updated.endDate,
      progress: updated.progress,
      priority: updated.priority,
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to update sprint" }, { status: 500 });
  }
}

// ✅ DELETE
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    await connectToDB();
    const { id } = params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid sprint ID" }, { status: 400 });
    }

    const deleted = await Sprint.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: "Sprint not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Sprint deleted successfully" });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete sprint" }, { status: 500 });
  }
}
