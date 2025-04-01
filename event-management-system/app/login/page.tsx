"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState("attendee")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would validate credentials against your backend
    // For demo purposes, we'll use hardcoded credentials

    // Redirect based on role
    switch (role) {
      case "superadmin":
        router.push("/dashboard/superadmin")
        break
      case "admin":
        router.push("/dashboard/admin")
        break
      case "committee":
        router.push("/dashboard/committee")
        break
      case "attendee":
        router.push("/dashboard/attendee")
        break
      default:
        router.push("/dashboard/attendee")
    }
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4"
      style={{
        background: "linear-gradient(135deg, #4f46e5, #0ea5e9)",
      }}
    >
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Event Management System</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-input pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="role" className="form-label">
              Login As
            </label>
            <select id="role" className="form-input" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="attendee">Attendee</option>
              <option value="committee">Committee Member</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

