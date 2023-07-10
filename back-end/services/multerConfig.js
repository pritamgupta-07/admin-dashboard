import multer from 'multer'
import path from 'path'


const upload = multer({
    storage: multer.diskStorage({}),
    fileFilter:
        (req,file,callback)=>{
            let extention = path.extname(file.originalname)

            if(extention !== '.png' && extention !== '.jpg' && extention !== '.jpeg'){
                callback(new Error('file type not supported'),false)
                return
        }
        callback(null,true)
    }
    
})

export default upload
