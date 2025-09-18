import { Schema , model } from "mongoose";
const enrollmentSchema = new Schema({
    student: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Student reference is required']
    },
    
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course reference is required']
    },
    
    // Payment information
    paymentMethod: {
      type: String,
      enum: ['stripe', 'paypal', 'razorpay', 'free'],
      required: true
    },
    
    paymentId: String,
    amountPaid: {
      type: Number,
      required: true,
      min: 0
    },
    
    currency: {
      type: String,
      default: 'USD'
    },
    
    // Enrollment status
    status: {
      type: String,
      enum: ['active', 'completed', 'dropped', 'refunded'],
      default: 'active'
    },
    
    // Progress tracking
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    
    completedLectures: [{
      lecture: {
        type: Schema.Types.ObjectId,
        ref: 'Lecture'
      },
      completedAt: {
        type: Date,
        default: Date.now
      },
      watchTime: Number
    }],
    
    // Dates
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    
    completedAt: Date,
    
    lastAccessedAt: {
      type: Date,
      default: Date.now
    },
    
    // Certificate
    certificateIssued: {
      type: Boolean,
      default: false
    },
    
    certificateIssuedAt: Date,
    
    certificateId: String
    
  }, {
    timestamps: true
  });
  
  // Compound index for unique enrollments
  enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });
  
  export const Enrollment = model('Enrollment', enrollmentSchema);