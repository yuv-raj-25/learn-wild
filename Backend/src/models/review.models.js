import { Schema , model } from "mongoose";

const reviewSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required']
    },
    
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course reference is required']
    },
    
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5']
    },
    
    title: {
      type: String,
      trim: true,
      maxLength: [100, 'Review title cannot exceed 100 characters']
    },
    
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
      trim: true,
      maxLength: [1000, 'Review comment cannot exceed 1000 characters']
    },
    
    // Helpfulness tracking
    helpful: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }],
    
    helpfulCount: {
      type: Number,
      default: 0
    },
    
    // Status
    isApproved: {
      type: Boolean,
      default: true
    },
    
    isEdited: {
      type: Boolean,
      default: false
    },
    
    editedAt: Date
    
  }, {
    timestamps: true
  });
  
  // Compound index for unique reviews per user per course
  reviewSchema.index({ user: 1, course: 1 }, { unique: true });
  
  export const Review = model('Review', reviewSchema);