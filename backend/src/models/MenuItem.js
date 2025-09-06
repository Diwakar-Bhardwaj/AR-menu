import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  restaurantId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Restaurant', 
    required: true 
  },
  name: { type: String, required: true },
  price: { type: String, required: true },
  review: { type: String, required: true },
  image: { type: String, default: '' },
  category: { type: String, default: 'Main Course' },
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Index for better query performance
menuItemSchema.index({ restaurantId: 1, name: 1 });

export default mongoose.model('MenuItem', menuItemSchema);

