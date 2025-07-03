import { NextResponse } from 'next/server'
import { supabase } from 'lib/supabaseClient'
import { TOKEN_EXPIRATION_TIME } from '../utils'

export async function POST(request) {
  try {
    const { user_id, fingerprint, token } = await request.json()

    if (!user_id || !fingerprint || !token) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data: user_token, error: newError } = await supabase.from('user_token').insert({
      user_id,
      fingerprint,
      token,
      expires_at: new Date(Date.now() + TOKEN_EXPIRATION_TIME),
    }).select().single()

    if (newError) {
      return NextResponse.json(
        { success: false, message: 'Error creating user token' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: user_token
    })

  } catch (error) {
    console.error('Error creating user token:', error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Error creating user token'
      },
      { status: 500 }
    )
  }
}