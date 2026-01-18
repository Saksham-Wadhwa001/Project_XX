'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Item {
  id: string
  name: string
  description: string
  price: number
  image: string
  seller: string
  shopName: string
  available: boolean
  deliveryTime?: number
  volume?: string
}

export default function ConsumerDashboard() {
  const [items, setItems] = useState<Item[]>([])
  const [cart, setCart] = useState<{ item: Item; quantity: number }[]>([])
  const [wishlist, setWishlist] = useState<Item[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [itemQuantities, setItemQuantities] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    // Load items from seller items
    const sellerItems = JSON.parse(localStorage.getItem('sellerItems') || '[]')
    const availableItems = sellerItems
      .filter((item: any) => item.available)
      .map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        image: item.image,
        seller: item.seller || 'Seller',
        shopName: item.shopName || item.seller || 'Shop',
        available: item.available,
        deliveryTime: item.deliveryTime || Math.floor(Math.random() * 30) + 15,
        volume: item.volume || '',
      }))
    
    // If no seller items, use mock items
    if (availableItems.length === 0) {
      const mockItems: Item[] = [
        {
          id: '1',
          name: 'Jacob\'s Creek Unvined Shiraz Non-Alcoholic Wine',
          description: 'Premium non-alcoholic wine with rich flavor',
          price: 844,
          image: '🍷',
          seller: 'Wine Store',
          shopName: 'Wine Store',
          available: true,
          deliveryTime: 23,
          volume: '750 ml',
        },
        {
          id: '2',
          name: 'Vintage Camera',
          description: 'Beautiful vintage camera in excellent condition',
          price: 299,
          image: '📷',
          seller: 'Camera Store',
          shopName: 'Camera Store',
          available: true,
          deliveryTime: 35,
        },
        {
          id: '3',
          name: 'Designer Watch',
          description: 'Luxury watch with leather strap',
          price: 599,
          image: '⌚',
          seller: 'Time Pieces',
          shopName: 'Time Pieces',
          available: true,
          deliveryTime: 28,
        },
        {
          id: '4',
          name: 'Laptop Stand',
          description: 'Ergonomic aluminum laptop stand',
          price: 49,
          image: '💻',
          seller: 'Tech Gear',
          shopName: 'Tech Gear',
          available: true,
          deliveryTime: 20,
        },
        {
          id: '5',
          name: 'Coffee Maker',
          description: 'Premium espresso machine',
          price: 399,
          image: '☕',
          seller: 'Kitchen Pro',
          shopName: 'Kitchen Pro',
          available: true,
          deliveryTime: 40,
        },
        {
          id: '6',
          name: 'Bookshelf',
          description: 'Modern wooden bookshelf',
          price: 199,
          image: '📚',
          seller: 'Furniture Hub',
          shopName: 'Furniture Hub',
          available: true,
          deliveryTime: 45,
        },
      ]
      setItems(mockItems)
    } else {
      setItems(availableItems)
    }

    // Load cart and wishlist from localStorage
    const savedCart = localStorage.getItem('consumerCart')
    const savedWishlist = localStorage.getItem('consumerWishlist')
    if (savedCart) {
      const cartData = JSON.parse(savedCart)
      setCart(cartData.map((item: Item) => ({ item, quantity: 1 })))
      // Initialize quantities from cart
      const quantities: { [key: string]: number } = {}
      cartData.forEach((item: Item) => {
        quantities[item.id] = 1
      })
      setItemQuantities(quantities)
    }
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
  }, [])

  const handleAddToCart = (item: Item) => {
    const existingCartItem = cart.find(c => c.item.id === item.id)
    if (existingCartItem) {
      // If already in cart, increase quantity
      const newQuantities = { ...itemQuantities }
      newQuantities[item.id] = (newQuantities[item.id] || 1) + 1
      setItemQuantities(newQuantities)
      
      const newCart = cart.map(c => 
        c.item.id === item.id 
          ? { ...c, quantity: newQuantities[item.id] }
          : c
      )
      setCart(newCart)
      // Store items multiple times in localStorage (one per quantity)
      const itemsForStorage: Item[] = []
      newCart.forEach(c => {
        for (let i = 0; i < c.quantity; i++) {
          itemsForStorage.push(c.item)
        }
      })
      localStorage.setItem('consumerCart', JSON.stringify(itemsForStorage))
    } else {
      // Add new item to cart
      const newCart = [...cart, { item, quantity: 1 }]
      setCart(newCart)
      setItemQuantities({ ...itemQuantities, [item.id]: 1 })
      // Store items multiple times in localStorage (one per quantity)
      const itemsForStorage: Item[] = []
      newCart.forEach(c => {
        for (let i = 0; i < c.quantity; i++) {
          itemsForStorage.push(c.item)
        }
      })
      localStorage.setItem('consumerCart', JSON.stringify(itemsForStorage))
    }
  }

  const updateQuantity = (itemId: string, delta: number) => {
    const currentQty = itemQuantities[itemId] || 1
    const newQty = Math.max(1, currentQty + delta)
    
    const newQuantities = { ...itemQuantities, [itemId]: newQty }
    setItemQuantities(newQuantities)
    
    // Update cart structure
    const cartItem = cart.find(c => c.item.id === itemId)
    if (cartItem) {
      const otherItems = cart.filter(c => c.item.id !== itemId)
      const newCart = [...otherItems, { item: cartItem.item, quantity: newQty }]
      setCart(newCart)
      // Store items multiple times in localStorage (one per quantity)
      const itemsForStorage: Item[] = []
      newCart.forEach(c => {
        for (let i = 0; i < c.quantity; i++) {
          itemsForStorage.push(c.item)
        }
      })
      localStorage.setItem('consumerCart', JSON.stringify(itemsForStorage))
    }
  }

  const addToWishlist = (item: Item) => {
    if (!wishlist.find(i => i.id === item.id)) {
      const newWishlist = [...wishlist, item]
      setWishlist(newWishlist)
      localStorage.setItem('consumerWishlist', JSON.stringify(newWishlist))
      alert('Item added to wishlist!')
    } else {
      alert('Item already in wishlist!')
    }
  }

  const categories = ['all', 'wine', 'electronics', 'furniture', 'kitchen', 'books']
  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.name.toLowerCase().includes(selectedCategory))

  return (
    <div>
      {/* Item Classification Container */}
      <div className="mb-6 bg-white rounded-xl shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Items Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => {
          const isInCart = cart.some(c => c.item.id === item.id)
          const quantity = itemQuantities[item.id] || 1

          return (
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
                <p className="text-xs text-gray-500 mb-3">Shop: {item.shopName}</p>

                {/* Price and Quantity Selector */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">₹{item.price}</span>
                  
                  {!isInCart ? (
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors border-2 border-green-600"
                    >
                      ADD
                    </button>
                  ) : (
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
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
