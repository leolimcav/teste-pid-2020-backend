import File from '../models/File';

class FileController {
  async create(req, res) {
    const { originalname: name, filename: path } = req.file;
    const file = await File.create({ name, path });
    const { url } = file;

    return res.json({ file, url });
  }
}

export default new FileController();
