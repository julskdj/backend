import { Router } from "express";
import multer from "multer";
const router = Router();
import fs from "fs";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
        },
        filename: function (req, file, cb) {
        cb(null, "Video.jpg" )
        },
        // limits: {
        //     fileSize: 100000000
        // }
});

const upload = multer({ storage: storage });


router.post("/video", upload.single("video"), (req, res) => {
    
    
    res.send(req.file);
})

export default router;
