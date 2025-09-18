import { Schema , model } from "mongoose";
const progressSchema = new Schema({
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
    
    // Overall progress
    completionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    
    // Detailed tracking
    lecturesCompleted: [{
      lecture: {
        type: Schema.Types.ObjectId,
        ref: 'Lecture'
      },
      completedAt: {
        type: Date,
        default: Date.now
      },
      watchTime: Number, // in seconds
      totalTime: Number // total lecture duration
    }],
    
    // Quiz/Assignment scores
    quizScores: [{
      quiz: {
        type: Schema.Types.ObjectId,
        ref: 'Quiz'
      },
      score: Number,
      maxScore: Number,
      attemptedAt: {
        type: Date,
        default: Date.now
      }
    }],
    
    // Time tracking
    totalTimeSpent: {
      type: Number,
      default: 0 // in minutes
    },
    
    lastAccessedLecture: {
      type: Schema.Types.ObjectId,
      ref: 'Lecture'
    },
    
    lastAccessedAt: {
      type: Date,
      default: Date.now
    }
    
  }, {
    timestamps: true
  });
  
  // Compound index for unique progress per user per course
  progressSchema.index({ user: 1, course: 1 }, { unique: true });
  
  export const Progress = model('Progress', progressSchema);