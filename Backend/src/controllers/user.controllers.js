import {asyncHandler} from "../utility/asyncHandler.js"
import {ApiError} from "../utility/apiError.js"
import {ApiResponse} from "../utility/apiResponse.js"
import { User } from "../models/user.models.js"

const registerUser = asyncHandler( async(req , res) => {
    const {email , userName, password ,} = req.body
    if(
        [email , userName , password].some((field) =>  field?.trim() === "")
    ){
        throw new ApiError(400 , "All Fields are required")

    }

    const existedUser =  await User.findOne({
        $or:[{userName} , {email}]
    })
    if(existedUser){
        // console.log(existedUser);
        throw new ApiError(409 , "this User is already exists")
    }

    const user = await User.create({
        password,
        email,
        userName: userName.toLowerCase()
   })

   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

   if(!createdUser){
    throw new ApiError(500 , "Something went Wrong while registering the User")
   }

   return res.status(201).json(
    new ApiResponse(200 , createdUser , "User Register SuccessFully ")
   )
})


export {
    registerUser
}