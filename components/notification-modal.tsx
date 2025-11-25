"use client"

import { useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { CheckCircle2, AlertCircle, X } from "lucide-react"

interface NotificationModalProps {
  isOpen: boolean
  onClose: () => void
  type: "success" | "error"
  title: string
  message: string
}

export default function NotificationModal({
  isOpen,
  onClose,
  type,
  title,
  message,
}: NotificationModalProps) {
  // Override Dialog overlay background when modal is open
  useEffect(() => {
    if (isOpen) {
      const overlay = document.querySelector('[data-slot="dialog-overlay"]') as HTMLElement
      if (overlay) {
        overlay.style.backgroundImage = 'url(/images/background-deploy/4.png)'
        overlay.style.backgroundSize = '100% 100%'
        overlay.style.backgroundPosition = 'center'
        overlay.style.backgroundRepeat = 'no-repeat'
        overlay.style.backgroundColor = 'transparent'
        overlay.style.opacity = '1'
      }
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="max-w-md w-[90vw] p-0 bg-transparent border-none shadow-none"
          showCloseButton={false}
        >
          {/* Modal content - matching existing modal design */}
          <div className="modal-content notification-modal-content relative z-50 w-full flex" style={{ cursor: 'auto' }}>
          <div
            className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 w-full flex flex-col"
            style={{ cursor: 'auto' }}
          >
            {/* Header with close button */}
            <div className="relative p-6 pb-4">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Icon and Title */}
              <div className="flex items-center gap-4 pr-12">
                {type === "success" ? (
                  <CheckCircle2 className="w-12 h-12 text-green-400 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-12 h-12 text-red-400 flex-shrink-0" />
                )}
                <h3 className="text-2xl font-louis font-bold text-white">
                  {title}
                </h3>
              </div>
            </div>

            {/* Message */}
            <div className="px-6 pb-6">
              <p className="text-white/90 font-louis text-base leading-relaxed">
                {message}
              </p>
            </div>

            {/* Action Button */}
            <div className="px-6 pb-6">
              <button
                onClick={onClose}
                className="w-full py-3 px-6 bg-white/20 border border-white/30 rounded-lg text-white font-louis font-semibold hover:bg-white/30 transition-all duration-300"
              >
                U redu
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

