import { Course } from "../models/course.models";
import { User } from "../models/user.models";
import { asyncHandler } from "../utility/asyncHandler";
import { ApiError } from "../utility/apiError";
import { ApiResponse } from "../utility/apiResponse";
import { Category } from "../models/catogory.models";


const createCourse = asyncHandler( async(req , res)=>{
    const {
        title,
        description,
        category,
        level,
        language,
        price,

      } = req.body;

      if (req.user.role !== 'instructor') {
        throw new ApiError(403, "Only instructors can create courses");
      }

      if (!title || !description  || !category || !level || !price) {
        throw new ApiError(400, "Please provide all required fields");
      }

      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        throw new ApiError(400, "Invalid category");
    
    }

    




})

export {
    createCourse
}