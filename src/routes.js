import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';

import uploadConfig from './config/multer';

const routes = new Router();
const upload = multer(uploadConfig);

routes.get('/', (req, res) => {
  res.json({ msg: 'API ITS WORKING' });
});

routes.get('/users', UserController.index);
routes.get('/users/:rg_cpf', UserController.show);
routes.post('/users', UserController.create);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.post('/files', upload.single('profile'), FileController.create);

export default routes;
