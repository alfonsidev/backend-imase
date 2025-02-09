import { Router } from 'express'
import { getProductByName } from '../controllers/product.controller'

const router: Router = Router()

router.get('/:name', getProductByName)

export default router
