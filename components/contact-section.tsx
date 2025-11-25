"use client"

import type React from "react"

import { useState } from "react"
import { Instagram, Linkedin, Send, Loader2, CheckCircle2 } from "lucide-react"
import NotificationModal from "./notification-modal"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "", // Honeypot field for bot protection
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [notification, setNotification] = useState<{
    isOpen: boolean
    type: "success" | "error"
    title: string
    message: string
  }>({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Bot protection: if honeypot field is filled, it's a bot
    if (formData.website) {
      console.log('Bot detected')
      return
    }

    setIsSubmitting(true)
    setIsSuccess(false)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      const data = await response.json()
      console.log('API Response:', { status: response.status, ok: response.ok, data })

      if (!response.ok) {
        throw new Error(data.error || 'Došlo je do greške')
      }

      // Success
      console.log('Form submitted successfully')
      setIsSuccess(true)
      
      // Show success modal
      setNotification({
        isOpen: true,
        type: "success",
        title: "Poruka poslata!",
        message: "Hvala vam na poruci. Odgovorićemo vam uskoro.",
      })
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
        website: "",
      })

      // Reset success state after modal closes
    } catch (error) {
      console.error('Form submission error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Došlo je do greške. Molimo pokušajte ponovo.'
      
      // Show error modal
      setNotification({
        isOpen: true,
        type: "error",
        title: "Greška",
        message: errorMessage,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="relative w-full overflow-hidden" style={{
      backgroundImage: 'url(/images/background-deploy/4.png)',
      backgroundSize: '100% 100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh'
    }}>

      {/* Noise overlay */}

      {/* Content */}
      <div className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-8xl font-louis font-bold text-white mb-6 tracking-tight leading-tight">Kontakt</h2>
            <h3 className="text-2xl font-louis text-white/80 mb-8">Želite da postanemo vaša NIT sa svetom?</h3>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6 mb-12">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Ime"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-transparent border border-white/30 rounded-lg text-white font-louis placeholder-white/60 focus:outline-none focus:border-white/60 transition-all duration-300 text-lg"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 bg-transparent border border-white/30 rounded-lg text-white font-louis placeholder-white/60 focus:outline-none focus:border-white/60 transition-all duration-300 text-lg"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder="Poruka"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-6 py-4 bg-transparent border border-white/30 rounded-lg text-white font-louis placeholder-white/60 focus:outline-none focus:border-white/60 transition-all duration-300 resize-none"
                />
              </div>

              {/* Honeypot field for bot protection - hidden from users */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  opacity: 0,
                  pointerEvents: 'none',
                }}
                aria-hidden="true"
              />

              {/* CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="w-full py-4 px-8 bg-white/20 border border-white/30 rounded-lg text-white font-louis font-semibold hover:bg-white/30 transition-all duration-300 flex items-center justify-center gap-3 text-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Šalje se...
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Poslato!
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Započni nit
                  </>
                )}
              </button>
            </form>

            {/* Social Media Icons */}
            <div className="flex justify-center gap-6">
              <a
                href="https://www.instagram.com/nitdigitalagency?igsh=amk1aGhtc29rbGhr&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/20 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                aria-label="Visit our Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/nit-advertising/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/20 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                aria-label="Visit our LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Modal */}
      <NotificationModal
        isOpen={notification.isOpen}
        onClose={() => {
          setNotification({ ...notification, isOpen: false })
          setIsSuccess(false)
        }}
        type={notification.type}
        title={notification.title}
        message={notification.message}
      />
    </section>
  )
}
