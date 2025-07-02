import { NextResponse } from "next/server";
import { getMessaging } from "firebase-admin/messaging";
import { initializeFirebaseAdmin } from "app/lib/firebase/firebase-admin";

initializeFirebaseAdmin();

export async function POST(request) {
    try {
        const { tokens, title, body, data } = await request.json();
        console.log("tokens-api", tokens);
        if (!tokens || !Array.isArray(tokens) || tokens.length === 0) {
            return NextResponse.json(
                { success: false, message: "Array of FCM tokens is required" },
                { status: 400 }
            );
        }

        const message = {
            tokens,
            notification: {
                title,
                body,
            },
            data: data || {},
        };
        
        console.log('message', message);
        const response = await getMessaging().sendEachForMulticast(message);
        console.log("response", response);

        const failedTokens = [];
        if (response.failureCount > 0) {
            response.responses.forEach((resp, idx) => {
                if (!resp.success) {
                    failedTokens.push(tokens[idx]);
                }
            });
            console.log('List of tokens that caused failures:', failedTokens);
        }

        return NextResponse.json({
            success: true,
            message: "Notifications sent",
            successCount: response.successCount,
            failureCount: response.failureCount,
            failedTokens,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "An error occurred sending notifications",
            },
            { status: 500 }
        );
    }
}