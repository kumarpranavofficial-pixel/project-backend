import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

// If path refers to a symbolic link, then the link is removed without affecting the file or directory to which that link refers. If the path refers to a file path that is not a symbolic link, the file is deleted

CLOUDINARY_URL=cloudinary;//748922554682613:km78dR0Hx1H1b85BonR3lyOTrW4@das1j4fmn

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

});

// method: send file path parameter => upload => unlink

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if (!localFilePath) return null
        // upload the fil on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
         })
         // file has been uploaded succussfully
         console.log("file has been uploaded on cloudinary", response.url);

        fs.unlinkSync(localFilePath)
        return response;
         
    } catch (error){ 
        // remove the locally saved temporary file as the upload operation got failed 
        fs.unlinkSync(localFilePath)
        return  null; 
    }
}


// cloudinary.v2.uploader.upload("",
//     { public_id: "olympic_flag" },
//     function(error, result) {console.log(result); }
// );

export { uploadOnCloudinary }