import { Router } from 'express'
import items from './items'

const routes = Router();

routes.use('/items', items);

export default routes;