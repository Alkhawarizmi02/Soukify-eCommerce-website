import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const cookieStore = await cookies()
    const cookieHeader = cookieStore.getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ')

    const payloadUrl = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3000'

    const res = await fetch(`${payloadUrl}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
      },
      body: JSON.stringify(body),
    })

    const data = await res.json()

    if (!res.ok) {
      const message = data.errors?.[0]?.message || 'Failed to create order'
      return NextResponse.json({ error: message }, { status: res.status })
    }

    return NextResponse.json({ success: true, doc: data.doc })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
