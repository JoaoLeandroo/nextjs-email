'use client'

import { useState } from 'react'
import { sendMailAction } from '@/lib/send-email'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sparkles } from 'lucide-react'

export default function Home() {
  const [isSending, setIsSending] = useState(false)
  const [status, setStatus] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsSending(true)
    const result = await sendMailAction(formData)
    setIsSending(false)
    setStatus(result.success ? '✅ E-mail enviado!' : '❌ Falha ao enviar e-mail.')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <section className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-2">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Receba seu Número da Sorte
            </h1>
            <p className="text-gray-600">Digite seu email e receba um número especial</p>
          </div>

          <form action={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email
              </label>
              <Input id="email" name="email" type="email" placeholder="seu@email.com" className="h-12 text-base" required />
            </div>

            <Button
              type="submit"
              disabled={isSending}
              className="w-full cursor-pointer h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              {isSending ? 'Enviando...' : 'Receber Número da Sorte'}
            </Button>
          </form>

          {status && <p className="text-center text-sm text-gray-600">{status}</p>}
        </div>
      </section>
    </main>
  )
}
