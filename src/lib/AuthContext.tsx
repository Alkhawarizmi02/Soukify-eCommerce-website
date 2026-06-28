'use client'

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react'

export interface User {
  id: string
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  updateProfile: (name: string) => Promise<{ success: boolean; error?: string }>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Hydrate user on mount
  const checkUserStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/customers/me', {
        headers: {
          'Accept': 'application/json',
        },
      })
      if (res.ok) {
        const data = await res.json()
        if (data && data.user) {
          setUser(data.user)
        } else {
          setUser(null)
        }
      } else {
        setUser(null)
      }
    } catch (err) {
      console.error('Error checking auth status:', err)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    checkUserStatus()
  }, [checkUserStatus])

  // Login handler
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/customers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok && data.user) {
        setUser(data.user)
        return { success: true }
      } else {
        return { success: false, error: data.errors?.[0]?.message || 'Invalid email or password' }
      }
    } catch (err) {
      console.error('Login error:', err)
      return { success: false, error: 'Something went wrong. Please try again.' }
    } finally {
      setIsLoading(false)
    }
  }

  // Register handler (creates user, then automatically logs them in)
  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (res.ok && data.doc) {
        // Automatically login the newly created user
        const loginRes = await login(email, password)
        if (loginRes.success) {
          return { success: true }
        } else {
          return { success: true, error: 'Account created, but automatic login failed. Please sign in manually.' }
        }
      } else {
        return { success: false, error: data.errors?.[0]?.message || 'Registration failed. Email might already exist.' }
      }
    } catch (err) {
      console.error('Registration error:', err)
      return { success: false, error: 'Something went wrong. Please try again.' }
    } finally {
      setIsLoading(false)
    }
  }

  // Logout handler
  const logout = async () => {
    try {
      setIsLoading(true)
      await fetch('/api/customers/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })
      setUser(null)
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  // Update Profile Name handler
  const updateProfile = async (name: string) => {
    if (!user) return { success: false, error: 'You must be logged in' }
    try {
      const res = await fetch(`/api/customers/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })

      const data = await res.json()

      if (res.ok && data.doc) {
        setUser(data.doc)
        return { success: true }
      } else {
        return { success: false, error: data.errors?.[0]?.message || 'Failed to update profile' }
      }
    } catch (err) {
      console.error('Update profile error:', err)
      return { success: false, error: 'Something went wrong. Please try again.' }
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
