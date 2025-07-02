import { NextResponse } from 'next/server'
import { getMessaging } from 'firebase-admin/messaging'
import { initializeFirebaseAdmin } from 'app/lib/firebase/firebase-admin'
import { supabase } from 'app/lib/supabaseClient'

initializeFirebaseAdmin()

export async function POST(request) {
  try {
    const { token, topic, user_id } = await request.json()

    if (!token || !topic) {
      return NextResponse.json(
        { success: false, message: 'FCM token and topic are required' },
        { status: 400 }
      )
    }
    if (!user_id) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      )
    }

    await getMessaging().unsubscribeFromTopic(token, topic)

    // Get notification topics
    const { data: tokens, error } = await supabase
      .from('user_token')
      .select('*')
      .eq('user_id', user_id)

    if (error) {
      return NextResponse.json(
        { success: false, message: 'Error getting user notification topics' },
        { status: 500 }
      )
    }

    console.log(tokens)

    if (!tokens) {
      return NextResponse.json(
        { success: false, message: 'Error getting user notification topics' },
        { status: 500 }
      )
    }

    let topics = JSON.parse(tokens.notification_topics || '[]')
    topics = topics.filter((t) => t !== topic)

    console.log(topics)
    await supabase
      .from('user_token')
      .update({
        notification_topics: topics,
      })
      .eq('user_id', user_id)

    return NextResponse.json({
      success: true,
      message: `Successfully unsubscribed from topic: ${topic}`,
    })
  } catch (error) {
    console.error('Error unsubscribing from topic:', error)
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : 'An error occurred while unsubscribing from topic',
      },
      { status: 500 }
    )
  }
}
