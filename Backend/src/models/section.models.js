import { Schema , model } from "mongoose";
const sectionSchema = new Schema({
    title: {
      type: String,
      required: [true, 'Section title is required'],
      trim: true
    },
    
    description: {
      type: String,
      trim: true
    },
    
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, 'Course reference is required']
    },
    
    lectures: [{
      type: Schema.Types.ObjectId,
      ref: 'Lecture'
    }],
    
    order: {
      type: Number,
      required: [true, 'Section order is required']
    },
    
    isPublished: {
      type: Boolean,
      default: true
    }
    
  }, {
    timestamps: true
  });
  
  export const Section = model('Section', sectionSchema);