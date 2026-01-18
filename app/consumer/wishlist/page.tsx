'use client'

import { useState, useEffect } from 'react'

interface Item {
  id: string
  name: string
  description: string
  price: number
  image: string
  seller: string
  shopName?: string
  available: boolean
  deliveryTime?: number
  volume?: string
}

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<Item[]>([])

  useEffect(() => {
    const savedWishlist = localStorage.getItem('consumerWishlist')
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist))
    }
  }, [])

  const removeFromWishlist = (itemId: string) => {
    const newWishlist = wishlist.filter(item => item.id !== itemId)
    setWishlist(newWishlist)
    localStorage.setItem('consumerWishlist', JSON.stringify(newWishlist))
  }

  const addToCart = (item: Item) => {
    const savedCart = JSON.parse(localStorage.getItem('consumerCart') || '[]')
    if (!savedCart.find((i: Item) => i.id === item.id)) {
      const newCart = [...savedCart, item]
      localStorage.setItem('consumerCart', JSON.stringify(newCart))
      alert('Item added to cart!')
    } else {
      alert('Item already in cart!')
    }
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Wishlist</h1>
        <p className="text-gray-600">{wishlist.length} item(s) in your wishlist</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-6xl mb-4">❤️</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Add items you love to your wishlist!</p>
          <a
            href="/consumer/dashboard"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Store
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              {/* Product Image */}
              <div className="h-64 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <div className="text-8xl">{item.image}</div>
              </div>
              
              <div className="p-5">
                {/* Delivery Time */}
                {item.deliveryTime && (
                  <div className="flex items-center mb-2">
                    <div className="w-4 h-4 bg-orange-400 rounded-full mr-2"></div>
                    <span className="text-sm font-semibold text-gray-900">{item.deliveryTime} MINS</span>
                  </div>
                )}

                {/* Product Name */}
                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{item.name}</h3>
                
                {/* Volume */}
                {item.volume && (
                  <p className="text-sm text-gray-600 mb-3">{item.volume}</p>
                )}

                {/* Shop Name */}
                <p className="text-xs text-gray-500 mb-3">Shop: {item.shopName || item.seller}</p>

                {/* Price and Remove Button */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">₹{item.price}</span>
                  
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
