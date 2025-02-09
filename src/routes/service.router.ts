import { Router } from 'express'
import { getServiceByName } from '../controllers/service.controller'

const router: Router = Router()

router.get('/:name', getServiceByName)

export default router
