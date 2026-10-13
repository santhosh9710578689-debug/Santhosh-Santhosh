import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, Send, ShoppingBag, MapPin, Clock, AlertCircle } from 'lucide-react';
import { CartItem, RestaurantInfo } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  info: RestaurantInfo;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  info,
}) => {
  const [orderType, setOrderType] = useState<'Takeaway' | 'Delivery' | 'Dine-In'>('Takeaway');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [locationDetail, setLocationDetail] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!isOpen) return null;

  const totalAmount = cart.reduce((acc, curr) => acc + curr.item.price * curr.quantity, 0);
  const totalItemCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const cleanWhatsapp = info.whatsapp.replace(/[^0-9]/g, '');

  const handleSendWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) return;

    // Compose formatted WhatsApp message
    let message = `🍽️ *NEW ORDER - ${info.name.toUpperCase()}*\n`;
    message += `📍 Tindivanam, Tamil Nadu\n`;
    message += `--------------------------------------\n`;
    message += `*Order Type:* ${orderType}\n`;
    if (customerName.trim()) message += `*Customer Name:* ${customerName.trim()}\n`;
    if (customerPhone.trim()) message += `*Contact Phone:* ${customerPhone.trim()}\n`;
    if (locationDetail.trim()) {
      const label = orderType === 'Dine-In' ? 'Table Number' : 'Delivery / Pickup Address';
      message += `*${label}:* ${locationDetail.trim()}\n`;
    }
    message += `--------------------------------------\n`;
    message += `*ITEMS ORDERED:*\n`;

    cart.forEach((c, index) => {
      const itemSubtotal = c.item.price * c.quantity;
      const vegTag = c.item.isVeg ? '[Veg]' : '[Non-Veg]';
      message += `${index + 1}. ${c.item.name} ${vegTag}\n   Qty: ${c.quantity} x ₹${c.item.price} = ₹${itemSubtotal}\n`;
    });

    message += `--------------------------------------\n`;
    message += `*ESTIMATED TOTAL: ₹${totalAmount}*\n`;
    
    if (specialInstructions.trim()) {
      message += `*Special Instructions:* ${specialInstructions.trim()}\n`;
    }

    message += `--------------------------------------\n`;
    message += `Please confirm order availability and preparation time. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div className="w-full max-w-md bg-stone-900 text-stone-100 h-full flex flex-col shadow-2xl border-l border-amber-900/40">
        
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">Your WhatsApp Order Tray</h3>
              <p className="text-xs text-stone-400">
                {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition"
            aria-label="Close Tray"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {cart.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-stone-600" />
              <p className="font-semibold text-stone-300">Your order tray is empty</p>
              <p className="text-xs text-stone-500 max-w-xs">
                Explore our menu and add your favorite tiffin, biryanis, or starters to create a quick WhatsApp order.
              </p>
              <button
                onClick={onClose}
                className="mt-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold px-4 py-2 rounded-lg"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-400 pb-1 border-b border-stone-800">
                  <span>Selected Dishes</span>
                  <button
                    onClick={onClearCart}
                    className="text-stone-400 hover:text-red-400 flex items-center gap-1 transition text-[11px]"
                  >
                    <Trash2 className="w-3 h-3" /> Clear Tray
                  </button>
                </div>

                {cart.map(({ item, quantity }) => (
                  <div
                    key={item.id}
                    className="p-3 bg-stone-850 rounded-xl border border-stone-750 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                          item.isVeg ? 'bg-emerald-500' : 'bg-red-500'
                        }`}
                        title={item.isVeg ? 'Veg' : 'Non-Veg'}
                      />
                      <div className="truncate">
                        <p className="text-sm font-semibold text-white truncate">{item.name}</p>
                        <p className="text-xs text-amber-400 font-bold">
                          ₹{item.price} <span className="text-stone-400 font-normal">x {quantity} = ₹{item.price * quantity}</span>
                        </p>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-1.5 shrink-0 bg-stone-900 border border-stone-700 rounded-lg p-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 hover:bg-stone-800 text-stone-300 rounded"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-1.5 text-white">{quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 hover:bg-stone-800 text-stone-300 rounded"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-stone-500 hover:text-red-400 p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Preferences Form */}
              <div className="bg-stone-850 p-4 rounded-xl border border-stone-750 space-y-4">
                <div>
                  <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                    Select Order Type
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 text-xs font-semibold">
                    {(['Takeaway', 'Delivery', 'Dine-In'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setOrderType(type)}
                        className={`py-2 px-1 rounded-lg text-center transition ${
                          orderType === type
                            ? 'bg-amber-500 text-stone-950 font-bold shadow'
                            : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Customer Details */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[11px] text-stone-400 block mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Anand"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-400 block mb-1">Your Contact Phone</label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Address or Table detail */}
                <div className="text-xs">
                  <label className="text-[11px] text-stone-400 block mb-1">
                    {orderType === 'Dine-In'
                      ? 'Table Number (if seated)'
                      : orderType === 'Takeaway'
                      ? 'Pickup Time / Vehicle Details (Optional)'
                      : 'Delivery Address in Tindivanam'}
                  </label>
                  <input
                    type="text"
                    placeholder={
                      orderType === 'Dine-In'
                        ? 'e.g. Table 5 / AC Section'
                        : orderType === 'Takeaway'
                        ? 'e.g. Pickup in 25 mins (Car TN-32)'
                        : 'e.g. Near Bus Stand, Tindivanam'
                    }
                    value={locationDetail}
                    onChange={(e) => setLocationDetail(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Special Instructions */}
                <div className="text-xs">
                  <label className="text-[11px] text-stone-400 block mb-1">Special Notes / Spice Level</label>
                  <input
                    type="text"
                    placeholder="e.g. Extra raita, less spicy, pack hot for travel..."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2 text-sm">
                <div className="flex justify-between text-stone-400 text-xs">
                  <span>Subtotal ({totalItemCount} items)</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-stone-400 text-xs">
                  <span>Taxes & Packaging</span>
                  <span className="text-emerald-400">Included / Counter confirmed</span>
                </div>
                <div className="pt-2 border-t border-stone-800 flex justify-between font-bold text-base text-white">
                  <span>Estimated Total</span>
                  <span className="text-amber-400 font-black">₹{totalAmount}</span>
                </div>
              </div>

              <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-800/40 text-stone-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Clicking below will format your order and open WhatsApp to chat directly with <strong>Veni's Food Restaurants ({info.phone})</strong>. Payment can be made via UPI/Cash on counter or delivery.
                </span>
              </div>
            </>
          )}
        </div>

        {/* Drawer Action Footer */}
        {cart.length > 0 && (
          <div className="p-4 bg-stone-950 border-t border-stone-800">
            <button
              onClick={handleSendWhatsAppOrder}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 transition transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Send Order via WhatsApp (₹{totalAmount})</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
