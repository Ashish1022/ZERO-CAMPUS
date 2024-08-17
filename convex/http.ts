import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";
import { WebhookEvent } from '@clerk/nextjs/server';
import { Webhook } from "svix";
import { httpRouter } from "convex/server";

const handleClerkWebhook = httpAction(async (ctx, request) => {
    const event = await ValidateRequest(request);

    if (!event) {
        return new Response("Invalid request", { status: 400 });
    }

    switch (event.type) {
        case "user.created":
            await ctx.runMutation(internal.users.createUser, {
                clerkId: event.data.id,
                name: event.data.first_name!,
                email: event.data.email_addresses[0].email_address,
                imageUrl: event.data.image_url
            })
            break;
    }
    return new Response(null, {
        status:200
    })
});

const http = httpRouter()

http.route({
    path:'/clerk',
    method:'POST',
    handler: handleClerkWebhook
})

const ValidateRequest = async (
    req: Request
): Promise<WebhookEvent | undefined> => {
    const WebhookSecret = process.env.CLERK_WEBHOOK_SECRET!;
    if (!WebhookSecret) {
        throw new Error("CLERK_WEBHOOK_SECRET is not defined");
    }
    const payloadString = await req.text();
    const headerPayload = req.headers;
    const svixHeaders = {
        "svix-id": headerPayload.get("svix-id")!,
        "svix-timestamp": headerPayload.get("svix-timestamp")!,
        "svix-signature": headerPayload.get("svix-signature")!,
    };
    const wh = new Webhook(WebhookSecret);
    const event = wh.verify(payloadString, svixHeaders);
    return event as unknown as WebhookEvent;
}   


export default http