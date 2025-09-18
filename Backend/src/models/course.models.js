import { Schema , model} from "mongoose";

const courseSchema = Schema({
    tittle: {
        type: String,
        required: [true, 'Course title is required'],
        trim: true,
        maxLength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Course description is required'],
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: [true, 'Instructor is required']
    },
    category: {
        type: String,
        required: [true, 'Course category is required'],
        enum: {
          values: ['Programming', 'Design', 'Business', 'Marketing', 'Photography', 'Music', 'Health', 'Language'],
          message: 'Please select a valid category'
        }
    },
    level:{
        type: String,
        required: true,
        enum: {
            values: ['Beginner', 'Intermediate', 'Advanced'],
            message: 'Please select a valid difficulty level'
        }
    },
    price: {
        type: Number,
        required: [true, 'Course price is required'],
        min: [0, 'Price cannot be negative']
    },
    

} , {timestamps: true})



export const Course = model("Course" , courseSchema)