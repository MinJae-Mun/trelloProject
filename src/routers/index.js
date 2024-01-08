import { Router } from 'express';
import { listsRouter } from './list.router.js';

const apiRouter = Router();

apiRouter.use('/lists', listsRouter);


export { apiRouter };