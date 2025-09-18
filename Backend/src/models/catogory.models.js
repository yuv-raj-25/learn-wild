import { Schema , model} from "mongoose";
const categorySchema = new Schema({
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
      trim: true
    },
    
    description: {
      type: String,
      trim: true
    },
    
    slug: {
      type: String,
      unique: true,
      lowercase: true
    },
    
    icon: {
      public_id: String,
      url: String
    },
    
    color: {
      type: String,
      match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please enter a valid hex color']
    },
    
    isActive: {
      type: Boolean,
      default: true
    },
    
    order: {
      type: Number,
      default: 0
    }
    
  }, {
    timestamps: true
  });
  
  // Generate slug from name
  categorySchema.pre('save', function(next) {
    if (this.isModified('name') && !this.slug) {
      this.slug = this.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    }
    next();
  });
  
  export const Category = model('Category', categorySchema);