'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

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

export default function Cart() {
  const [cart, setCart] = useState<Item[]>([])
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})
  const router = useRouter()

  useEffect(() => {
    const savedCart = localStorage.getItem('consumerCart')
    if (savedCart) {
      const cartItems = JSON.parse(savedCart)
      setCart(cartItems)
      // Initialize quantities - count occurrences of each item
      const initialQuantities: { [key: string]: number } = {}
      cartItems.forEach((item: Item) => {
        initialQuantities[item.id] = (initialQuantities[item.id] || 0) + 1
      })
      setQuantities(initialQuantities)
    }
  }, [])

  const updateQuantity = (itemId: string, delta: number) => {
    const currentQty = quantities[itemId] || 1
    const newQty = Math.max(1, currentQty + delta)
    
    // Update quantities
    const newQuantities = { ...quantities, [itemId]: newQty }
    setQuantities(newQuantities)
    
    // Update cart - remove all instances of this item and add the correct quantity
    const item = cart.find(i => i.id === itemId)
    if (item) {
      const otherItems = cart.filter(i => i.id !== itemId)
      const newCart = [...otherItems, ...Array(newQty).fill(item)]
      setCart(newCart)
      localStorage.setItem('consumerCart', JSON.stringify(newCart))
    }
  }

  const removeFromCart = (itemId: string) => {
    const newCart = cart.filter(item => item.id !== itemId)
    setCart(newCart)
    const newQuantities = { ...quantities }
    delete newQuantities[itemId]
    setQuantities(newQuantities)
    localStorage.setItem('consumerCart', JSON.stringify(newCart))
  }

  const bookItems = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!')
      return
    }

    // Get existing orders
    const existingOrders = JSON.parse(localStorage.getItem('consumerOrders') || '[]')
    const newOrders = cart.flatMap((item, index) => {
      const quantity = quantities[item.id] || 1
      return Array(quantity).fill(null).map((_, qIndex) => ({
        id: `order-${Date.now()}-${index}-${qIndex}`,
        item: item,
        status: 'pending',
        bookingDate: new Date().toISOString(),
        pickupDate: null,
        completed: false,
      }))
    })

    // Save orders
    const allOrders = [...existingOrders, ...newOrders]
    localStorage.setItem('consumerOrders', JSON.stringify(allOrders))

    // Notify sellers (in a real app, this would be done via backend)
    const sellerBookings = JSON.parse(localStorage.getItem('sellerBookings') || '[]')
    const newBookings = cart.flatMap(item => {
      const quantity = quantities[item.id] || 1
      return Array(quantity).fill(null).map((_, qIndex) => ({
        id: `booking-${Date.now()}-${item.id}-${qIndex}`,
        itemId: item.id,
        itemName: item.name,
        consumerEmail: localStorage.getItem('userEmail'),
        consumerName: localStorage.getItem('userName') || 'Consumer',
        status: 'pending',
        bookingDate: new Date().toISOString(),
      }))
    })
    localStorage.setItem('sellerBookings', JSON.stringify([...sellerBookings, ...newBookings]))

    // Clear cart
    setCart([])
    setQuantities({})
    localStorage.setItem('consumerCart', JSON.stringify([]))

    alert('Items booked successfully! Sellers will be notified.')
    router.push('/consumer/orders')
  }

  const total = cart.reduce((sum, item) => {
    const quantity = quantities[item.id] || 1
    return sum + (item.price * quantity)
  }, 0)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">{cart.length} item(s) in your cart</p>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some items to get started!</p>
          <a
            href="/consumer/dashboard"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Store
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => {
            const quantity = quantities[item.id] || 1
            return (
              <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Product Image */}
                  <div className="w-full md:w-48 h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <div className="text-6xl">{item.image}</div>
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 p-6">
                    {/* Delivery Time */}
                    {item.deliveryTime && (
                      <div className="flex items-center mb-2">
                        <div className="w-4 h-4 bg-orange-400 rounded-full mr-2"></div>
                        <span className="text-sm font-semibold text-gray-900">{item.deliveryTime} MINS</span>
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                    {item.volume && (
                      <p className="text-sm text-gray-600 mb-2">{item.volume}</p>
                    )}
                    <p className="text-xs text-gray-500 mb-4">Shop: {item.shopName || item.seller}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">₹{item.price}</span>
                      
                      {/* Quantity Selector */}
                      <div className="flex items-center space-x-2 bg-green-500 rounded-lg border-2 border-green-600">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-3 py-2 text-white font-bold hover:bg-green-600 rounded-l-lg transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 text-white font-semibold">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-3 py-2 text-white font-bold hover:bg-green-600 rounded-r-lg transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Total and Checkout */}
          <div className="bg-white rounded-xl shadow-md p-6 sticky bottom-0">
            <div className="flex items-center justify-between mb-4 pb-4 border-b">
              <span className="text-xl font-semibold text-gray-900">Subtotal:</span>
              <span className="text-2xl font-bold text-gray-900">₹{total.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-gray-600">Total Items: {cart.reduce((sum, item) => sum + (quantities[item.id] || 1), 0)}</span>
            </div>
            <button
              onClick={bookItems}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-lg"
            >
              Book Items
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
