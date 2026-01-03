import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userEmail: { type: String, required: true },
    tourName: { type: String, required: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    bookAt: { type: Date, required: true },
    groupSize: { type: Number, required: true },
    tourId: { type: mongoose.Schema.Types.ObjectId, ref: "Tour" },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);