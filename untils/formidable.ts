import formidable from "formidable";
import fs from "fs";
import { format, } from "date-fns"


const uploadDir = "uploads"
fs.mkdirSync(uploadDir, { recursive: true });

//多張相upload
export const newForm = new formidable.IncomingForm({
    uploadDir,
    keepExtensions: true,
    multiples: true,
    maxFiles: 6,
    maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
    filter: part => part.mimetype?.startsWith("image/") || false,
    filename: (name, ext, part, form) => {
        let newName = format(new Date(), 'yyyy-MM-dd HH-mm-ss') + name + ext
        return newName
    }
});



//1張相upload ,register
export const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFiles: 1,
    maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
    filter: part => part.mimetype?.startsWith("image/") || false,
    filename: (name, ext, part, form) => {
        let newName = format(new Date(), 'yyyy-MM-dd HH-mm-ss') + name + ext
        return newName
    },
})