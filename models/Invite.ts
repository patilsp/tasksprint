import mongoose, { Schema, model, models } from "mongoose";

const InviteSchema = new Schema({
  email: String,
  sprintId: { type: Schema.Types.ObjectId, ref: "Sprint" },
  token: String,
  status: { type: String, enum: ["pending", "accepted"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
});

export default models.Invite || model("Invite", InviteSchema);
