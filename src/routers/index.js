import { Router } from 'express';
import { listsRouter } from './list.router.js';
import { cardRouter } from './card.router.js';

const apiRouter = Router();

apiRouter.use('/lists', listsRouter);

apiRouter.use('/card', cardRouter);

export { apiRouter };
