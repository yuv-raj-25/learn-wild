import { Schema , model } from "mongoose";
const orderSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required']
    },
    
    courses: [{
      course: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      currency: {
        type: String,
        required: true
      }
    }],
    
    // Order totals
    subtotal: {
      type: Number,
      required: true
    },
    
    tax: {
      type: Number,
      default: 0
    },
    
    discount: {
      type: Number,
      default: 0
    },
    
    total: {
      type: Number,
      required: true
    },
    
    currency: {
      type: String,
      required: true,
      default: 'USD'
    },
    
    // Payment details
    paymentMethod: {
      type: String,
      enum: ['stripe', 'paypal', 'razorpay'],
      required: true
    },
    
    paymentId: {
      type: String,
      required: true
    },
    
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    },
    
    // Order status
    status: {
      type: String,
      enum: ['pending', 'completed', 'cancelled', 'refunded'],
      default: 'pending'
    },
    
    // Coupon/Discount
    couponCode: String,
    
    // Dates
    completedAt: Date,
    refundedAt: Date
    
  }, {
    timestamps: true
  });
  
  export const Order = model('Order', orderSchema);