'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Leaf, ArrowRight, Store, ShoppingBag, Loader2 } from 'lucide-react'

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState<'consumer' | 'seller' | ''>('')

  // Role specific state
  const [shopName, setShopName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    if (!role) {
      alert('Please select a role!')
      return
    }

    setIsLoading(true)

    // Simulate API delay for UX
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (email && password && name) {
      localStorage.setItem('userEmail', email)
      localStorage.setItem('userName', name)
      localStorage.setItem('userRole', role)

      if (role === 'seller') {
        localStorage.setItem('sellerShopName', shopName)
        localStorage.setItem('sellerAddress', address)
        localStorage.setItem('sellerPhone', phone)
      }

      setIsLoading(false)

      if (role === 'consumer') {
        router.push('/consumer/dashboard')
      } else {
        router.push('/seller/dashboard')
      }
    }
  }

  return (
      <div className="min-h-screen flex bg-[#f8f9fa]">

        {/* --- Left Half - Visual Design (New, Better Design with same colors) --- */}
        <div className="relative w-full lg:w-1/2 bg-[#E5E3D9] flex items-center justify-center p-12 overflow-hidden">

        {/* New Abstract Organic Background Pattern */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23a3a3a3' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }}></div>

          {/* Large Central Organic Shape */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] bg-[#d4d1c5] rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] rotate-12 opacity-40 mix-blend-multiply blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] bg-[#c7c4b8] rounded-[70%_30%_30%_70%_/_70%_70%_30%_30%] -rotate-12 opacity-40 mix-blend-multiply blur-2xl animation-delay-2000"></div>

          {/* Content */}
          <div className="relative z-10 max-w-md text-center">
            <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#f8f9fa] shadow-sm border border-white/50 mx-auto">
              <Leaf className="w-10 h-10 text-gray-700" strokeWidth={1.5} />
            </div>
            <h1 className="text-6xl font-serif text-gray-900 mb-6 leading-none tracking-tight">
              Join the <br/><i>collective.</i>
            </h1>
            <p className="text-xl text-gray-700 mb-10 leading-relaxed font-light max-w-sm mx-auto">
              A new way to connect creators and curators. Begin your journey with simplicity and style.
            </p>

            <div className="flex flex-col gap-3 text-sm font-medium text-gray-600 mx-auto w-fit">
              <div className="flex items-center gap-3 bg-[#f8f9fa]/50 px-4 py-2 rounded-full">
                <div className="w-2 h-2 rounded-full bg-gray-800"></div>
                <span>Minimalist Design Principles</span>
              </div>
              <div className="flex items-center gap-3 bg-[#f8f9fa]/50 px-4 py-2 rounded-full">
                <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                <span>Thoughtfully Curated Experience</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- Right Half - Signup Form (Same as before) --- */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">

        <div className="w-full max-w-md py-12">

            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Create Account</h2>
              <p className="text-gray-500">Enter your details to get started.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Standard Fields */}
              <div className="space-y-4">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Full Name</label>
                  <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all placeholder-gray-300"
                      placeholder="Jane Doe"
                  />
                </div>

                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email Address</label>
                  <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all placeholder-gray-300"
                      placeholder="you@example.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all placeholder-gray-300"
                        placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Confirm</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-400 focus:border-gray-400 outline-none transition-all placeholder-gray-300"
                        placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <hr className="border-gray-100 my-6" />

              {/* Role Selection - Minimal Cards */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 ml-1">
                  Select Purpose
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                      type="button"
                      onClick={() => setRole('consumer')}
                      className={`p-4 border rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-2 group
                    ${role === 'consumer'
                          ? 'border-gray-900 bg-gray-900 text-white shadow-lg'
                          : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    <ShoppingBag className={`w-6 h-6 ${role === 'consumer' ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`} />
                    <span className="font-medium text-sm">Consumer</span>
                  </button>

                  <button
                      type="button"
                      onClick={() => setRole('seller')}
                      className={`p-4 border rounded-xl transition-all duration-200 flex flex-col items-center justify-center gap-2 group
                    ${role === 'seller'
                          ? 'border-gray-900 bg-gray-900 text-white shadow-lg'
                          : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    <Store className={`w-6 h-6 ${role === 'seller' ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}`} />
                    <span className="font-medium text-sm">Seller</span>
                  </button>
                </div>
              </div>

              {/* Conditional Fields - Animated Fade In */}
              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${role ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0'}`}>

                {role === 'consumer' && (
                    <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 space-y-4">
                      <div className="flex items-center gap-2 text-gray-800 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-800"></div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider">Consumer Details</h3>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">Phone Number</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-gray-400 outline-none text-sm"
                            placeholder="+1 234 567 8900"
                        />
                      </div>
                    </div>
                )}

                {role === 'seller' && (
                    <div className="p-5 bg-gray-50 rounded-xl border border-gray-100 space-y-4">
                      <div className="flex items-center gap-2 text-gray-800 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-800"></div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider">Store Details</h3>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">Shop Name</label>
                        <input
                            type="text"
                            value={shopName}
                            onChange={(e) => setShopName(e.target.value)}
                            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-gray-400 outline-none text-sm"
                            placeholder="e.g. Minimalist Home"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">Address</label>
                          <input
                              type="text"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-gray-400 outline-none text-sm"
                              placeholder="City, State"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1 uppercase">Phone</label>
                          <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full px-4 py-2 bg-white border border-gray-200 rounded-md focus:ring-1 focus:ring-gray-400 outline-none text-sm"
                              placeholder="+1 234..."
                          />
                        </div>
                      </div>
                    </div>
                )}
              </div>

              <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gray-900 text-white font-medium rounded-lg hover:bg-black transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>

            <div className="mt-8 text-center text-sm">
              <p className="text-gray-500">
                Already a member?{' '}
                <Link href="/login" className="text-gray-900 font-semibold hover:underline">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
  )
}