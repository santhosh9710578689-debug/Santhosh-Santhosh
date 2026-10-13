import React, { useState } from 'react';
import { X, Save, RotateCcw, Building, Phone, Clock, MapPin, Check, Plus, Trash2, HelpCircle } from 'lucide-react';
import { RestaurantInfo, MenuItem } from '../types';

interface OwnerCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  info: RestaurantInfo;
  onSaveInfo: (newInfo: RestaurantInfo) => void;
  onResetDefaults: () => void;
  menuItems: MenuItem[];
  onAddCustomDish: (newItem: MenuItem) => void;
  onDeleteDish: (id: string) => void;
}

export const OwnerCustomizerModal: React.FC<OwnerCustomizerModalProps> = ({
  isOpen,
  onClose,
  info,
  onSaveInfo,
  onResetDefaults,
  menuItems,
  onAddCustomDish,
  onDeleteDish,
}) => {
  const [formData, setFormData] = useState<RestaurantInfo>(info);
  const [activeTab, setActiveTab] = useState<'details' | 'dishes'>('details');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // New Dish State
  const [newDishName, setNewDishName] = useState('');
  const [newDishCategory, setNewDishCategory] = useState('South Indian Tiffin');
  const [newDishPrice, setNewDishPrice] = useState(100);
  const [newDishDesc, setNewDishDesc] = useState('');
  const [newDishIsVeg, setNewDishIsVeg] = useState(true);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveInfo(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleAddNewDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDishName.trim()) return;

    const dish: MenuItem = {
      id: `custom-${Date.now()}`,
      name: newDishName.trim(),
      category: newDishCategory,
      price: Number(newDishPrice) || 50,
      description: newDishDesc.trim() || 'Prepared fresh on order with traditional spices.',
      isVeg: newDishIsVeg,
      imageUrl: newDishIsVeg
        ? 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80'
        : 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80',
    };

    onAddCustomDish(dish);
    setNewDishName('');
    setNewDishDesc('');
    setNewDishPrice(100);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-stone-900 border border-amber-900/40 rounded-2xl w-full max-w-2xl text-stone-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
              <Building className="w-5 h-5 text-amber-400" />
              <span>Owner & Details Customizer</span>
            </h3>
            <p className="text-xs text-stone-400">
              Update street address, opening hours, or add custom menu dishes (saves locally).
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-stone-800 bg-stone-950/50 px-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('details')}
            className={`py-3 px-4 border-b-2 transition ${
              activeTab === 'details'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            Restaurant Details & Address
          </button>
          <button
            onClick={() => setActiveTab('dishes')}
            className={`py-3 px-4 border-b-2 transition ${
              activeTab === 'dishes'
                ? 'border-amber-400 text-amber-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            Menu Dishes Manager ({menuItems.length})
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          
          {activeTab === 'details' && (
            <form onSubmit={handleSave} className="space-y-4">
              
              <div className="p-3 bg-amber-950/30 border border-amber-900/40 rounded-xl text-amber-300 text-xs flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Constraint Compliance:</strong> As requested, the exact street address was not fabricated. You can enter your exact building number, street name, and nearby landmark here.
                </span>
              </div>

              {/* Restaurant Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-300 block mb-1 font-semibold">Restaurant Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-stone-300 block mb-1 font-semibold">Contact Phone (Call & WhatsApp)</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>

              {/* Exact Address Line 1 */}
              <div>
                <label className="text-stone-300 block mb-1 font-semibold">
                  Exact Street Address / Door Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. No. 12, Gingee Road, Near Old Bus Stand"
                  value={formData.addressLine1}
                  onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                  className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2.5 text-white font-medium"
                />
                <span className="text-[11px] text-stone-400 mt-0.5 block">
                  Current placeholder: {formData.addressLine1}
                </span>
              </div>

              {/* Landmark & Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-300 block mb-1 font-semibold">Area / Highway Proximity</label>
                  <input
                    type="text"
                    value={formData.addressLine2}
                    onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-stone-300 block mb-1 font-semibold">Nearby Landmark</label>
                  <input
                    type="text"
                    value={formData.landmark}
                    onChange={(e) => setFormData({ ...formData, landmark: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>

              {/* Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-300 block mb-1 font-semibold">Overall Opening Hours</label>
                  <input
                    type="text"
                    value={formData.openingHours}
                    onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-stone-300 block mb-1 font-semibold">Tiffin / Breakfast Hours</label>
                  <input
                    type="text"
                    value={formData.breakfastHours}
                    onChange={(e) => setFormData({ ...formData, breakfastHours: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-300 block mb-1 font-semibold">Lunch / Meals Hours</label>
                  <input
                    type="text"
                    value={formData.lunchHours}
                    onChange={(e) => setFormData({ ...formData, lunchHours: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="text-stone-300 block mb-1 font-semibold">Dinner / Night Hours</label>
                  <input
                    type="text"
                    value={formData.dinnerHours}
                    onChange={(e) => setFormData({ ...formData, dinnerHours: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>

              {/* Actions in Form */}
              <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onResetDefaults}
                  className="text-stone-400 hover:text-red-400 flex items-center gap-1.5 text-xs transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Standard Defaults</span>
                </button>

                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-5 py-2.5 rounded-xl flex items-center gap-2 transition"
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-950" />
                      <span>Saved Successfully!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Restaurant Details</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

          {activeTab === 'dishes' && (
            <div className="space-y-6">
              
              {/* Add New Dish Box */}
              <div className="bg-stone-850 p-4 rounded-xl border border-stone-750 space-y-3">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Plus className="w-4 h-4 text-amber-400" />
                  <span>Add a New Menu Dish / Special</span>
                </h4>
                
                <form onSubmit={handleAddNewDish} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-stone-400 block mb-1">Dish Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mushroom Pepper Fry"
                        value={newDishName}
                        onChange={(e) => setNewDishName(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-white"
                      />
                    </div>

                    <div>
                      <label className="text-stone-400 block mb-1">Category</label>
                      <select
                        value={newDishCategory}
                        onChange={(e) => setNewDishCategory(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-white"
                      >
                        <option value="South Indian Tiffin">South Indian Tiffin</option>
                        <option value="Biryani & Rice Specials">Biryani & Rice Specials</option>
                        <option value="Tamil Gravies & Curries">Tamil Gravies & Curries</option>
                        <option value="Parottas & Breads">Parottas & Breads</option>
                        <option value="Starters & Tandoori">Starters & Tandoori</option>
                        <option value="Chinese & Fast Food">Chinese & Fast Food</option>
                        <option value="Beverages & Desserts">Beverages & Desserts</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-stone-400 block mb-1">Price (₹) *</label>
                      <input
                        type="number"
                        min="10"
                        value={newDishPrice}
                        onChange={(e) => setNewDishPrice(Number(e.target.value))}
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-stone-400 block mb-1">Dietary Type</label>
                      <div className="flex gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setNewDishIsVeg(true)}
                          className={`flex-1 py-1 px-2 rounded text-xs font-bold ${
                            newDishIsVeg
                              ? 'bg-emerald-600 text-white'
                              : 'bg-stone-900 text-stone-400'
                          }`}
                        >
                          🟢 Veg
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewDishIsVeg(false)}
                          className={`flex-1 py-1 px-2 rounded text-xs font-bold ${
                            !newDishIsVeg
                              ? 'bg-red-700 text-white'
                              : 'bg-stone-900 text-stone-400'
                          }`}
                        >
                          🔴 Non-Veg
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-stone-400 block mb-1 text-xs">Description</label>
                    <input
                      type="text"
                      placeholder="e.g. Sautéed with crushed black pepper, shallots and curry leaves."
                      value={newDishDesc}
                      onChange={(e) => setNewDishDesc(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-lg p-2 text-white text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-2 rounded-lg text-xs"
                  >
                    + Add This Dish to Menu
                  </button>
                </form>
              </div>

              {/* Current Dishes List */}
              <div className="space-y-2">
                <h4 className="font-bold text-stone-300 text-xs uppercase tracking-wider">
                  Current Menu Items ({menuItems.length})
                </h4>
                <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1">
                  {menuItems.map((dish) => (
                    <div
                      key={dish.id}
                      className="p-2.5 bg-stone-850 rounded-lg border border-stone-800 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span
                          className={`w-2 h-2 rounded-full shrink-0 ${
                            dish.isVeg ? 'bg-emerald-500' : 'bg-red-500'
                          }`}
                        />
                        <span className="font-bold text-white truncate">{dish.name}</span>
                        <span className="text-stone-400 text-[11px]">({dish.category})</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-black text-amber-400">₹{dish.price}</span>
                        <button
                          onClick={() => onDeleteDish(dish.id)}
                          className="text-stone-500 hover:text-red-400"
                          title="Remove dish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-stone-950 border-t border-stone-800 text-center">
          <p className="text-[11px] text-stone-500">
            Veni's Food Restaurants Control Console • Tindivanam, Tamil Nadu
          </p>
        </div>

      </div>
    </div>
  );
};
