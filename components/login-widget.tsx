"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"

interface LoginWidgetProps {
  onLoginSuccess: (user: any) => void
}

export default function LoginWidget({ onLoginSuccess }: LoginWidgetProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Simulação de login - em um app real, isso seria uma chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Verificação simplificada para demonstração
      if (email === "admin@gonetwork.ai" && password === "admin") {
        const user = {
          id: "1",
          email: email,
          full_name: "Administrador",
          role: "admin",
        }
        onLoginSuccess(user)
      } else {
        setError("Email ou senha inválidos")
      }
    } catch (err) {
      setError("Erro ao tentar fazer login. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <Card className="w-[400px] border border-border shadow-lg">
        <CardHeader className="space-y-4 flex flex-col items-center">
          <Image src="/placeholder.svg?key=whufn" alt="GoNetwork AI Logo" width={80} height={80} className="mb-2" />
          <CardTitle className="text-2xl text-primary">GoNetwork AI</CardTitle>
          <CardDescription>Entre com suas credenciais para acessar o sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
            <div className="text-center text-sm text-muted-foreground mt-4">
              <p>Use admin@gonetwork.ai / admin para demonstração</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
