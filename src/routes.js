import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import FileController from './app/controllers/FileController';
import SessionController from './app/controllers/SessionController';

import uploadConfig from './config/multer';
import googleauth from './config/google-auth';

const routes = new Router();
const upload = multer(uploadConfig);

routes.get('/', (req, res) => {
  res.json({ msg: 'API ITS WORKING' });
});

routes.get('/googlesign', (req, res) => {
  return res.json(googleauth);
});

routes.post('/signin', SessionController.create);

routes.get('/users', UserController.index);
routes.get('/users/:rg_cpf', UserController.show);
routes.post('/users', UserController.create);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:rg_cpf', UserController.delete);

routes.post('/files', upload.single('profile'), FileController.create);

export default routes;
