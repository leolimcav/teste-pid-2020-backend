import { resolve, extname } from 'path';
import crypto from 'crypto';
import multer from 'multer';

export default multer({
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return err;

        return cb(err, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
});
