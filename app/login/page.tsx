'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight, Leaf } from 'lucide-react';

export default function MinimalLogin() {
  const [showPassword, setShowPassword] = useState(false);

  return (
      <div className="min-h-screen flex flex-col lg:flex-row bg-[#f8f9fa]">

        {/* LEFT: Visual Panel */}
        <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-[#E5E3D9] overflow-hidden">

          {/* Organic blobs */}
          <div className="absolute inset-0 opacity-60">
            <div className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-[#D4D1C5] rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-[#C7C4B8] rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 max-w-md p-12">
            <Leaf className="w-12 h-12 text-gray-700 mb-6" />
            <h2 className="text-5xl font-serif text-gray-800 mb-6 leading-tight">
              Simplicity is the <br />
              <i>ultimate</i> sophistication.
            </h2>
            <div className="h-1 w-20 bg-gray-800" />
          </div>
        </div>

        {/* RIGHT: Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white font-sans">
          <div className="w-full max-w-md">

            {/* Header */}
            <div className="mb-10">
              <h1 className="text-4xl font-semibold text-gray-900 tracking-tight mb-3">
                Welcome back
              </h1>
              <p className="text-gray-500 text-base leading-relaxed">
                Please enter your details to sign in.
              </p>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium tracking-wide uppercase text-gray-600 mb-2">
                  Email Address
                </label>
                <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-400"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-medium tracking-wide uppercase text-gray-600">
                    Password
                  </label>
                  <a href="#" className="text-xs font-medium text-gray-500 hover:text-gray-800 transition">
                    Forgot password?
                  </a>
                </div>

                <div className="relative">
                  <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 text-sm font-medium text-gray-900 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-1 focus:ring-gray-400 placeholder-gray-400"
                  />
                  <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700 transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button className="w-full py-4 bg-gray-900 text-white rounded-lg font-semibold text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-black transition">
                Sign In <ArrowRight size={16} />
              </button>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs">
          <span className="px-3 bg-white text-gray-400 tracking-wide uppercase">
            Or continue with
          </span>
                </div>
              </div>

              {/* Social */}
              <div className="grid grid-cols-2 gap-4">
                <button className="border border-gray-200 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                  Google
                </button>
                <button className="border border-gray-200 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                  Facebook
                </button>
              </div>

              <p className="text-center text-sm text-gray-500 mt-8">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="font-semibold text-gray-900 hover:underline">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>

      </div>
  );
}
