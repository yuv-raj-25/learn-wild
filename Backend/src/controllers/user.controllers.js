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

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    // Validation
    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }
  
    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }
  
    // Check if account is locked
    if (user.isLocked) {
      throw new ApiError(423, "Account temporarily locked due to too many failed login attempts");
    }
  
    // Compare password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      // Increment login attempts
      user.loginAttempts += 1;
      if (user.loginAttempts >= 5) {
        user.lockUntil = Date.now() + 30 * 60 * 1000; // Lock for 30 minutes
      }
      await user.save();
      
      throw new ApiError(401, "Invalid email or password");
    }
  
    // Reset login attempts on successful login
    user.loginAttempts = 0;
    user.lockUntil = undefined;
    user.lastLogin = new Date();
    await user.save();
  
    // Generate auth token
    // const token = user.generateAuthToken();
  
    // Remove sensitive fields
    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.loginAttempts;
    delete userResponse.lockUntil;
  
    res.status(200).json(new ApiResponse(200, {
      user: userResponse,
      token
    }, "Login successful"));
  });
  
  const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
      .populate('enrolledCourses.course', 'title thumbnail slug')
      .populate('wishlist', 'title thumbnail price slug');
  
    if (!user) {
      throw new ApiError(404, "User not found");
    }
  
    res.status(200).json(new ApiResponse(200, user, "User profile fetched successfully"));
  });

  const updateUserProfile = asyncHandler(async (req, res) => {
    const updates = req.body;
    const userId = req.user._id;
  
    // Remove sensitive fields that shouldn't be updated this way
    delete updates.password;
    delete updates.email;
    delete updates.role;
  
    // Handle avatar update
    if (req.file) {
      const user = await User.findById(userId);
      
      // Delete old avatar
      if (user.avatar?.public_id) {
        await deleteFromCloudinary(user.avatar.public_id);
      }
  
      // Upload new avatar
      const avatarResult = await uploadOnCloudinary(req.file.path);
      if (avatarResult) {
        updates.avatar = {
          public_id: avatarResult.public_id,
          url: avatarResult.secure_url
        };
      }
    }
  
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true, runValidators: true }
    );
  
    res.status(200).json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
  });
  
  const changeCurrentPassword = asyncHandler( async (req , res) =>{
    const {oldPassword , newPassword , confirmPassword } = req.body
  
    const user  = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
  
    if(!isPasswordCorrect){
      throw new ApiError(400 , "Invalid old Password" )
    }
    
    if (newPassword !== confirmPassword) {
      throw new ApiError(400, "New password and confirm password do not match");
    }
  
    user.password =  newPassword
    await user.save({validateBeforeSave: false})
  
    return res 
    .status(200)
    .json(
      new ApiResponse(
        200 , {} , "Password Change successfully"
      )
    )
  })
  
export {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    changeCurrentPassword
}