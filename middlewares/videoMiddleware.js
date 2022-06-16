import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
        },
        filename: function (req, file, cb) {
        cb(null, "Video.mp4")
        },
        // limits: {
        //     fileSize: 100000000
        // }
});

const upload = multer({ storage: storage });

export const video = upload.single("video")