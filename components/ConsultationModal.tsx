import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar } from 'lucide-react'
import { toast } from 'sonner'

interface ConsultationModalProps {
  isOpen: boolean
  onClose: () => void
  programName?: string
}

export function ConsultationModal({ isOpen, onClose, programName }: ConsultationModalProps) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    program: programName || '',
    preferredDate: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to book consultation')
      }

      toast.success('Consultation booked!', {
        description: 'We will send you a confirmation email shortly.',
      })
      onClose()
    } catch (error) {
      toast.error('Failed to book consultation', {
        description: error instanceof Error ? error.message : 'Please try again later',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-stone-800">Book Your Consultation</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border-champagne-200 focus:border-champagne-400 focus:ring-champagne-400"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="border-champagne-200 focus:border-champagne-400 focus:ring-champagne-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="program">Program of Interest</Label>
            <Input
              id="program"
              name="program"
              placeholder="Select a program"
              value={formData.program}
              onChange={handleChange}
              required
              className="border-champagne-200 focus:border-champagne-400 focus:ring-champagne-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredDate">Preferred Date</Label>
            <Input
              id="preferredDate"
              name="preferredDate"
              type="datetime-local"
              value={formData.preferredDate}
              onChange={handleChange}
              required
              min={new Date().toISOString().split('.')[0]}
              className="border-champagne-200 focus:border-champagne-400 focus:ring-champagne-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Message (Optional)</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us about your goals and any specific areas you'd like to discuss"
              value={formData.message}
              onChange={handleChange}
              className="border-champagne-200 focus:border-champagne-400 focus:ring-champagne-400 resize-none h-32"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-champagne-500 to-champagne-600 hover:from-champagne-600 hover:to-champagne-700 text-white font-light"
          >
            <Calendar className="w-4 h-4 mr-2" />
            {isLoading ? 'Booking...' : 'Book Consultation'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
} 