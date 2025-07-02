import { NextResponse } from 'next/server'
import { getMessaging } from 'firebase-admin/messaging'
import { initializeFirebaseAdmin } from 'app/lib/firebase/firebase-admin'
import { supabase } from 'app/lib/supabaseClient'

initializeFirebaseAdmin()

export async function POST(request) {
  try {
    const { token, topic, user_id, fingerprint } = await request.json()

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

    const { data: user_token, error } = await supabase
      .from('user_token')
      .select('*')
      .eq('user_id', user_id)
      .eq('fingerprint', fingerprint)
      .single()

    if (error && error.code !== 'PGRST116') {
      return NextResponse.json(
        { success: false, message: 'Error getting user notification topics' },
        { status: 500 }
      )
    }

    if (!user_token?.id) {
      return NextResponse.json(
        { success: false, message: 'User token not found' },
        { status: 404 }
      )
    }

    const newTopics = (user_token.topics || []).filter(t => t !== topic)

    const { error: updateError } = await supabase
      .from('user_token')
      .update({
        topics: newTopics,
      })
      .eq('id', user_token.id)

    if (updateError) {
      return NextResponse.json(
        { success: false, message: 'Error updating user token' },
        { status: 500 }
      )
    }

    await getMessaging().unsubscribeFromTopic(token, topic)

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
