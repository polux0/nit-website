import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

// Simple rate limiting store (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(ip)

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 }) // 1 minute window
    return true
  }

  if (limit.count >= 5) { // Max 5 requests per minute
    return false
  }

  limit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown'
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Previše zahteva. Molimo pokušajte ponovo za minut.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, message } = body

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Sva polja su obavezna.' },
        { status: 400 }
      )
    }

    // Basic spam detection - check for suspicious patterns
    const spamPatterns = [
      /http[s]?:\/\//i, // URLs
      /(viagra|cialis|casino|poker|loan|credit)/i, // Common spam words
    ]

    if (spamPatterns.some(pattern => pattern.test(message))) {
      return NextResponse.json(
        { error: 'Poruka sadrži nedozvoljen sadržaj.' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Neispravna email adresa.' },
        { status: 400 }
      )
    }

    // Validate message length
    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Poruka mora imati najmanje 10 karaktera.' },
        { status: 400 }
      )
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'Poruka je predugačka (maksimum 5000 karaktera).' },
        { status: 400 }
      )
    }

    // Check if API key is set
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set')
      return NextResponse.json(
        { error: 'Email servis nije konfigurisan. Molimo kontaktirajte administratora.' },
        { status: 500 }
      )
    }

    // Send email using Resend
    try {
      const { data, error } = await resend.emails.send({
        from: 'Contact Form <onboarding@resend.dev>', // You'll need to verify your domain with Resend
        to: ['alexusnavas@gmail.com'],
        replyTo: email,
        subject: `Nova poruka sa sajta - ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #6999c0; padding-bottom: 10px;">
              Nova poruka sa kontakt forme
            </h2>
            <div style="margin-top: 20px;">
              <p><strong>Ime:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Poruka:</strong></p>
              <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
              <p>Ova poruka je poslata sa kontakt forme sajta nit.agency</p>
            </div>
          </div>
        `,
        text: `
Nova poruka sa kontakt forme

Ime: ${name}
Email: ${email}

Poruka:
${message}

---
Ova poruka je poslata sa kontakt forme sajta nit.agency
        `,
      })

      if (error) {
        console.error('Resend API error:', JSON.stringify(error, null, 2))
        return NextResponse.json(
          { error: `Greška pri slanju emaila: ${error.message || 'Nepoznata greška'}` },
          { status: 500 }
        )
      }

      console.log('Email sent successfully:', data)
    } catch (resendError: any) {
      console.error('Resend exception:', resendError)
      return NextResponse.json(
        { error: `Greška pri slanju emaila: ${resendError.message || 'Nepoznata greška'}` },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Poruka je uspešno poslata!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Došlo je do greške. Molimo pokušajte ponovo.' },
      { status: 500 }
    )
  }
}

