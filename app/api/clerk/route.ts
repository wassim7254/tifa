import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse, NextRequest } from "next/server"; // 1. Added NextRequest
import connectDB from "@/config/db";
import User from "@/models/User";


interface ClerkWebhookEvent {
  data: {
    id: string;
    first_name?: string;
    last_name?: string;
    image_url?: string;
    email_addresses: { email_address: string }[];
  };
  type: string;
}

export async function POST(req: NextRequest) { // 3. Type for req
  try {
    const SIGNING_SECRET = process.env.SIGNING_SECRET;
    if (!SIGNING_SECRET) {
      throw new Error("Missing SIGNING_SECRET");
    }

    const wh = new Webhook(SIGNING_SECRET);
    
    // 4. Await the headers correctly
    const headerPayload = await headers();
    
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return NextResponse.json({ error: 'No svix headers' }, { status: 400 });
    }

    const svixHeaders = {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    };

    // Get the payload and verify it
    const payload = await req.json();
    const body = JSON.stringify(payload);

    let evt: ClerkWebhookEvent; // 5. Type for evt

    try {
      
      evt = wh.verify(body, svixHeaders) as ClerkWebhookEvent;
    } catch (err) {
      console.error('Error verifying webhook:', err);
      return NextResponse.json({ error: 'Error occured' }, { status: 400 });
    }

    const { id } = evt.data;
    const eventType = evt.type;

    await connectDB();

    if (eventType === 'user.created') {
        const userData = {
            _id: id,
            email: evt.data.email_addresses[0].email_address,
            name: `${evt.data.first_name || ''} ${evt.data.last_name || ''}`,
            image: evt.data.image_url,
        };
        await User.create(userData);
        console.log("User Created in DB");
    } 
    else if (eventType === 'user.updated') {
        const userData = {
            email: evt.data.email_addresses[0].email_address,
            name: `${evt.data.first_name || ''} ${evt.data.last_name || ''}`,
            image: evt.data.image_url,
        };
        await User.findByIdAndUpdate(id, userData);
        console.log("User Updated in DB");
    } 
    else if (eventType === 'user.deleted') {
        await User.findByIdAndDelete(id);
        console.log("User Deleted from DB");
    }

    return NextResponse.json({ message: "Event received" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
