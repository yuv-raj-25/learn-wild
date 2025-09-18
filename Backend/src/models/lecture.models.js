import { Schema , model } from "mongoose";

const lectureSchema = new Schema({
    title: {
      type: String,
      required: [true, 'Lecture title is required'],
      trim: true
    },
    
    description: {
      type: String,
      trim: true
    },
    
    section: {
      type: Schema.Types.ObjectId,
      ref: 'Section',
      required: [true, 'Section reference is required']
    },
    
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course reference is required']
    },
    
    // Content
    contentType: {
      type: String,
      enum: ['video', 'text', 'quiz', 'assignment', 'resource'],
      required: [true, 'Content type is required']
    },
    
    // Video content
    video: {
      public_id: String,
      url: String,
      duration: Number, // in seconds
      quality: [{
        resolution: String, // '720p', '1080p', etc.
        url: String
      }]
    },
    
    // Text content
    textContent: {
      type: String
    },
    
    // Resources/Downloads
    resources: [{
      title: String,
      url: String,
      fileType: String,
      fileSize: Number
    }],
    
    // Settings
    order: {
      type: Number,
      required: [true, 'Lecture order is required']
    },
    
    isPreview: {
      type: Boolean,
      default: false
    },
    
    isPublished: {
      type: Boolean,
      default: true
    },
    
    // Completion tracking
    completions: [{
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      completedAt: {
        type: Date,
        default: Date.now
      },
      watchTime: Number // in seconds
    }]
    
  }, {
    timestamps: true
  });
  
  export const Lecture = model('Lecture', lectureSchema);