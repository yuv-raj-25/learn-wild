import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    userName:{
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    firstName: {
        type: String,
        trim: true,
        maxLength: [50, 'First name cannot exceed 50 characters']
    },  
    lastName: {
        type: String,
        trim: true,
        maxLength: [50, 'Last name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true , "password is required "],
        unique: true
    },
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     validate:{
    //         validator: function (email) {
    //             // Simple email format validation
    //             return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    //           },
    //           message: props => `${props.value} is not a valid email!`
    //     }
    // },
    // password: {
    //     type: String,
    //     required: [true , "password is required "],
    //     validate: {
    //         validator: function (password){
    //             return strongPasswordRegex.test(password)
    //         },
    //         message: props => 
    //         `Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character.`
    //     }
        
    // },
    phoneNumber: {
        type: String,
        match: [/^\+?[\d\s-()]+$/, 'Please enter a valid phone number']
    },
    role: {
        type: String,
        enum: {
          values: ['student', 'instructor', 'admin'],
          message: 'Role must be either student, instructor, or admin'
        },
        default: 'student'
    },
    avatar: {
        public_id: String,
        url: String
    },
    bio: {
        type: String,
        maxLength: [500, 'Bio cannot exceed 500 characters']
    },

    dateOfBirth: Date,

    socialLinks: {
        website: String,
        linkedin: String,
        twitter: String,
        youtube: String,
        github: String
    },
    refreshToken:{
        type: String
    }


}, {timestamps:true})


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password =  await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            userName: this.userName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = model("User" , userSchema)
