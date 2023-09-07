// imports
import fs from "fs";
import multer from "multer";

// vehicle file storage
const VehicleFileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdir("./upload/files/create-media", (err) => {
      cb(null, "./upload/files/create-media");
    });
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

// vehicle file upload handler
const upploadMedia = multer({
  storage: VehicleFileStorage,
  limits: {
    fileSize: 1024 * 1024 * 50,
  },
});

export { upploadMedia };
