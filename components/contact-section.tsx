"use client"

import type React from "react"

import { useState } from "react"
import { Instagram, Linkedin, Send } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="relative min-h-screen overflow-hidden" style={{
      background: 'linear-gradient(180deg, #a48de2 0%, #6999c0 100%)'
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

              {/* CTA Button */}
              <button
                type="submit"
                className="w-full py-4 px-8 bg-white/20 border border-white/30 rounded-lg text-white font-louis font-semibold hover:bg-white/30 transition-all duration-300 flex items-center justify-center gap-3 text-xl"
              >
                <Send className="w-5 h-5" />
                Započni nit
              </button>
            </form>

            {/* Social Media Icons */}
            <div className="flex justify-center gap-6">
              <a
                href="#"
                className="w-12 h-12 bg-white/20 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white/20 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
