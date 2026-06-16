import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
    destination: (_req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });
export default upload;
//# sourceMappingURL=multer.js.map