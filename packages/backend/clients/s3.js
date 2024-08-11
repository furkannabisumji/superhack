import { S3Client } from "@aws-sdk/client-s3";
import multer from 'multer';
import multerS3 from 'multer-s3';

const s3 = new S3Client({
  region: 'us-east-1',
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'superhack24',
    metadata: function (req, file, cb){
      cb(null, { fieldName: file.fieldname });
    },
    key: async function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  })
});

export { s3, upload };
