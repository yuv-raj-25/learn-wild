import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowLeft, CreditCard, ShieldCheck, Gift } from 'lucide-react';

const Cart = ({ items, onRemove, onNavigate }) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const discount = appliedPromo ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + tax;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setAppliedPromo({ code: 'SAVE10', discount: 0.1 });
    }
  };

  const handleCheckout = () => {
    // Simulate checkout process
    alert('Redirecting to payment...');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-10 px-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => onNavigate('catalog')}
            className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Courses
          </button>

          <div className="text-center py-20">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <div className="text-6xl">🛒</div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-400 mb-8">Discover amazing courses to start your learning journey</p>
            <button
              onClick={() => onNavigate('catalog')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold hover:from-pink-600 hover:to-orange-600 transition-all transform hover:scale-105"
            >
              Browse Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-10 px-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => onNavigate('catalog')}
          className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Courses
        </button>

        <h1 className="text-4xl font-bold text-white mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6">
                <div className="flex gap-6">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-32 h-24 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-gray-400 mb-2">by {item.instructor}</p>
                    <div className="flex items-center gap-4 mb-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.difficulty === 'Beginner' ? 'bg-green-500' :
                        item.difficulty === 'Intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                      } text-white`}>
                        {item.difficulty}
                      </span>
                      <span className="text-gray-400 text-sm">{item.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-white">
                        ${item.price}
                        {item.originalPrice && (
                          <span className="text-lg text-gray-400 line-through ml-2">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Promo Code */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Promo Code</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white/40"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <div className="mt-3 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Gift className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 text-sm">
                        {appliedPromo.code} applied! 10% discount
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal ({items.length} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-400">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-gray-300">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-white/20 pt-4">
                    <div className="flex justify-between text-xl font-bold text-white">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-lg hover:from-pink-600 hover:to-orange-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Proceed to Checkout
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Secure payment with 30-day guarantee</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6">
                <h4 className="text-lg font-bold text-white mb-4">We Accept</h4>
                <div className="grid grid-cols-3 gap-4">
                  {['VISA', 'MC', 'AMEX'].map(card => (
                    <div key={card} className="bg-white/20 rounded-lg p-3 text-center text-white font-bold text-sm">
                      {card}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;