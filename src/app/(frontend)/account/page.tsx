'use client'

import { useAuth } from '@/lib/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import FeaturesBanner from '@/components/FeaturesBanner'
import { 
  User as UserIcon, 
  CreditCard, 
  Box, 
  LogOut, 
  ChevronRight, 
  ArrowLeft,
  Lock, 
  CheckCircle,
  Loader2
} from 'lucide-react'

type TabType = 'personal' | 'purchases' | 'orders' | 'logged-out'

interface OrderItem {
  id: string
  product: {
    id: string
    name: string
    price: number
    discount?: number
    image?: {
      url?: string
    }
  }
  quantity: number
  color?: string
  size?: string
  price: number
}

interface Order {
  id: string
  total: number
  paymentIntent?: string
  createdAt: string
  items: OrderItem[]
}

export default function AccountPage() {
  const { user, isLoading, logout, updateProfile } = useAuth()
  const router = useRouter()

  const [activeTab, setActiveTab] = useState<TabType>('personal')
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  // Edit profile states
  const [name, setName] = useState('')
  const [profileSuccess, setProfileSuccess] = useState('')
  const [profileError, setProfileError] = useState('')
  const [profileUpdating, setProfileUpdating] = useState(false)

  // Change password states
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordUpdating, setPasswordUpdating] = useState(false)

  // Fetch orders from Payload
  useEffect(() => {
    if (!user) return

    setName(user.name || '')

    const fetchOrders = async () => {
      setOrdersLoading(true)
      try {
        const res = await fetch(`/api/orders?where[user][equals]=${user.id}&limit=100&sort=-createdAt`)
        if (res.ok) {
          const data = await res.json()
          setOrders(data.docs || [])
        }
      } catch (err) {
        console.error('Error fetching orders:', err)
      } finally {
        setOrdersLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  // Redirect if not logged in (and not on logged-out screen)
  useEffect(() => {
    if (!isLoading && !user && activeTab !== 'logged-out') {
      router.push('/login?redirect=/account')
    }
  }, [user, isLoading, activeTab, router])

  if (isLoading && activeTab !== 'logged-out') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-black" />
      </div>
    )
  }

  // Handle Logout Tab
  const handleLogoutClick = async () => {
    await logout()
    setActiveTab('logged-out')
  }

  // Handle Profile Update
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileSuccess('')
    setProfileError('')
    setProfileUpdating(true)

    const res = await updateProfile(name)
    if (res.success) {
      setProfileSuccess('Profile details updated successfully!')
    } else {
      setProfileError(res.error || 'Failed to update profile')
    }
    setProfileUpdating(false)
  }

  // Handle Password Update
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordSuccess('')
    setPasswordError('')

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      return
    }

    setPasswordUpdating(true)
    try {
      const res = await fetch(`/api/users/${user?.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      })

      if (res.ok) {
        setPasswordSuccess('Password changed successfully!')
        setNewPassword('')
        setConfirmPassword('')
        setTimeout(() => setShowPasswordForm(false), 2000)
      } else {
        const data = await res.json()
        setPasswordError(data.errors?.[0]?.message || 'Failed to update password')
      }
    } catch (err) {
      setPasswordError('Something went wrong. Please try again.')
    } finally {
      setPasswordUpdating(false)
    }
  }

  // Render Logged Out View
  if (activeTab === 'logged-out') {
    return (
      <div className="bg-white min-h-[calc(100vh-106px)] flex flex-col justify-between">
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center max-w-xl mx-auto">
          <CheckCircle className="w-16 h-16 text-black mb-6" />
          <h1 className="text-3xl font-bold font-integralcf text-gray-900 mb-2">Logged out successfully.</h1>
          <p className="text-sm text-gray-500 font-satoshi mb-8">
            Thank you for shopping with us! We look forward to serving you again in the future.
          </p>
          <Link
            href="/login"
            className="bg-black text-white px-8 py-3 rounded-full font-satoshi font-semibold hover:bg-gray-800 transition-all text-sm"
          >
            Log In Again
          </Link>
        </div>
        <FeaturesBanner />
      </div>
    )
  }

  if (!user) return null

  // Extract unique purchased products across all orders
  const purchasedProductsMap = new Map<string, {
    id: string
    name: string
    price: number
    image?: string
    purchasedDate: string
  }>()

  orders.forEach(order => {
    order.items?.forEach(item => {
      if (item.product && !purchasedProductsMap.has(item.product.id)) {
        purchasedProductsMap.set(item.product.id, {
          id: item.product.id,
          name: item.product.name,
          price: item.price,
          image: item.product.image?.url,
          purchasedDate: new Date(order.createdAt).toLocaleDateString()
        })
      }
    })
  })
  
  const purchasedProducts = Array.from(purchasedProductsMap.values())

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-satoshi">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-black font-medium">My Account</span>
        </nav>

        <h1 className="text-3xl sm:text-[40px] font-extrabold font-integralcf mb-10 text-black">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-1 border border-gray-100 rounded-2xl p-6 flex flex-col gap-6 font-satoshi">
            {/* User Header Card */}
            <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
              <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
                {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <h3 className="font-bold text-gray-900 truncate">{user.name || 'User'}</h3>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>

            {/* Menu Tabs */}
            <div className="flex flex-col gap-1">
              <button
                onClick={() => { setActiveTab('personal'); setSelectedOrder(null); }}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-lg text-left text-sm font-semibold transition-all ${
                  activeTab === 'personal'
                    ? 'bg-gray-100 text-black'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                }`}
              >
                <UserIcon className="w-5 h-5 stroke-[1.5]" />
                Personal Information
              </button>

              <button
                onClick={() => { setActiveTab('purchases'); setSelectedOrder(null); }}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-lg text-left text-sm font-semibold transition-all ${
                  activeTab === 'purchases'
                    ? 'bg-gray-100 text-black'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                }`}
              >
                <CreditCard className="w-5 h-5 stroke-[1.5]" />
                My Purchases
              </button>

              <button
                onClick={() => { setActiveTab('orders'); setSelectedOrder(null); }}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-lg text-left text-sm font-semibold transition-all ${
                  activeTab === 'orders'
                    ? 'bg-gray-100 text-black'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                }`}
              >
                <Box className="w-5 h-5 stroke-[1.5]" />
                My Orders
              </button>

              <button
                onClick={handleLogoutClick}
                className="flex items-center gap-3.5 px-4 py-3 rounded-lg text-left text-sm font-semibold text-red-600 hover:bg-red-50 transition-all"
              >
                <LogOut className="w-5 h-5 stroke-[1.5]" />
                Logout
              </button>
            </div>
          </div>

          {/* RIGHT PANELS */}
          <div className="lg:col-span-3 border border-gray-100 rounded-2xl p-6 sm:p-8 min-h-[400px] font-satoshi">
            
            {/* PERSONAL INFORMATION TAB */}
            {activeTab === 'personal' && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
                
                <form onSubmit={handleProfileUpdate} className="max-w-xl flex flex-col gap-5">
                  {profileSuccess && (
                    <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md text-sm">
                      {profileSuccess}
                    </div>
                  )}
                  {profileError && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                      {profileError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed text-sm focus:outline-none"
                      value={user.email}
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mt-2 text-sm text-gray-500">
                    Change your account details below, or{' '}
                    <button
                      type="button"
                      onClick={() => setShowPasswordForm(!showPasswordForm)}
                      className="text-black font-semibold underline hover:text-gray-700"
                    >
                      click here
                    </button>{' '}
                    to change your password.
                  </div>

                  {!showPasswordForm && (
                    <button
                      type="submit"
                      disabled={profileUpdating}
                      className="w-40 bg-black text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 mt-4"
                    >
                      {profileUpdating ? 'Updating...' : 'Update Account'}
                    </button>
                  )}
                </form>

                {/* PASSWORD CHANGE SUB-FORM */}
                {showPasswordForm && (
                  <form onSubmit={handlePasswordUpdate} className="max-w-xl flex flex-col gap-5 mt-8 pt-8 border-t border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                      <Lock className="w-5 h-5 text-gray-500" />
                      Change Password
                    </h3>

                    {passwordSuccess && (
                      <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md text-sm">
                        {passwordSuccess}
                      </div>
                    )}
                    {passwordError && (
                      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                        {passwordError}
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                        placeholder="••••••••"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex gap-4 mt-2">
                      <button
                        type="submit"
                        disabled={passwordUpdating}
                        className="bg-black text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
                      >
                        {passwordUpdating ? 'Updating password...' : 'Update Password'}
                      </button>
                      <button
                        type="button"
                        onClick={() => { setShowPasswordForm(false); setPasswordError(''); setPasswordSuccess(''); }}
                        className="border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* MY PURCHASES TAB */}
            {activeTab === 'purchases' && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Purchased Products</h2>
                
                {purchasedProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                    <p className="text-gray-400 font-medium">You haven&apos;t purchased any products yet.</p>
                    <Link
                      href="/shop"
                      className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
                    >
                      Shop Now
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {purchasedProducts.map((prod) => (
                      <div key={prod.id} className="flex gap-4 p-4 border border-gray-100 rounded-2xl hover:border-gray-200 transition-all">
                        <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0">
                          <img
                            src={prod.image || '/placeholder.png'}
                            alt={prod.name}
                            className="object-contain w-full h-full p-2"
                          />
                        </div>
                        <div className="flex flex-col justify-center min-w-0">
                          <h4 className="font-bold text-gray-900 truncate text-sm sm:text-base">{prod.name}</h4>
                          <p className="font-extrabold text-gray-900 text-sm mt-1">${prod.price}</p>
                          <p className="text-xs text-gray-400 mt-2">Purchased On: {prod.purchasedDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* MY ORDERS TAB */}
            {activeTab === 'orders' && (
              <div>
                {!selectedOrder ? (
                  <>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">My Orders</h2>
                    
                    {ordersLoading ? (
                      <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-black" />
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                        <p className="text-gray-400 font-medium">You don&apos;t have any orders yet.</p>
                        <Link
                          href="/shop"
                          className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
                        >
                          Shop Now
                        </Link>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4">
                        {orders.map((order) => (
                          <div 
                            key={order.id} 
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border border-gray-100 rounded-2xl gap-4 hover:border-gray-200 transition-all"
                          >
                            <div>
                              <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate max-w-xs sm:max-w-md">
                                Order {order.id}
                              </h4>
                              <div className="flex gap-4 mt-1 text-xs text-gray-500">
                                <span>Total: <strong>${order.total}</strong></span>
                                <span>Ordered On: {new Date(order.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="text-sm font-bold text-black border border-gray-200 px-5 py-2 rounded-full hover:bg-gray-50 transition-colors self-start sm:self-auto"
                            >
                              View Order
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  /* ORDER DETAIL VIEW */
                  <div>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-black mb-6 uppercase tracking-wider transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Orders
                    </button>

                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 truncate">
                      Order {selectedOrder.id}
                    </h2>
                    
                    <div className="bg-gray-50 rounded-2xl p-5 mb-8 text-sm flex flex-col gap-2.5 text-gray-600 border border-gray-100">
                      <div><span className="font-semibold text-gray-900">ID:</span> {selectedOrder.id}</div>
                      {selectedOrder.paymentIntent && (
                        <div><span className="font-semibold text-gray-900">Payment Intent:</span> {selectedOrder.paymentIntent}</div>
                      )}
                      <div><span className="font-semibold text-gray-900">Ordered On:</span> {new Date(selectedOrder.createdAt).toLocaleDateString()}</div>
                      <div className="text-base text-gray-900 font-extrabold mt-1">Total: ${selectedOrder.total}</div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-4">Order Items</h3>
                    <div className="flex flex-col border border-gray-100 rounded-2xl divide-y divide-gray-100">
                      {selectedOrder.items?.map((item) => (
                        <div key={item.id} className="flex gap-4 p-5 items-center">
                          <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0">
                            <img
                              src={item.product?.image?.url || '/placeholder.png'}
                              alt={item.product?.name || 'Product'}
                              className="object-contain w-full h-full p-1"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 truncate text-sm sm:text-base">
                              {item.product?.name || 'Deleted Product'}
                            </h4>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-gray-500">
                              {item.color && (
                                <span>Color: <strong>{item.color}</strong></span>
                              )}
                              {item.size && (
                                <span>Size: <strong>{item.size}</strong></span>
                              )}
                              <span>Qty: <strong>{item.quantity}</strong></span>
                            </div>
                          </div>
                          <div className="font-extrabold text-gray-900 text-sm sm:text-base">
                            ${item.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}