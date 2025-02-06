import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const bookingDetails = await req.json();
    console.log("Received Booking:", bookingDetails);
    return NextResponse.json({ message: "Booking received successfully!" });
  } catch (error) {
    console.error("Error processing booking:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
