"use client"

import { useEffect, useState } from "react"
import SplashScreen from "@/components/splash-screen"
import MainWindow from "@/components/main-window"
import LoginWidget from "@/components/login-widget"

export default function Home() {
  const [showSplash, setShowSplash] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    // Simular o tempo de splash screen
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleLogin = (user: any) => {
    setIsLoggedIn(true)
    setCurrentUser(user)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
  }

  if (showSplash) {
    return <SplashScreen />
  }

  return (
    <main className="min-h-screen">
      {isLoggedIn ? (
        <MainWindow currentUser={currentUser} onLogout={handleLogout} />
      ) : (
        <LoginWidget onLoginSuccess={handleLogin} />
      )}
    </main>
  )
}
