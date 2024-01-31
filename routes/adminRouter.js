const Router = require('express')
const router = new Router()
const adminController = require('../controllers/adminController')

router.get('/services', adminController.serviceGet)
router.get('/services/:id', adminController.serviceGetOne)
router.post('/services/:id', adminController.serviceUpdate)
router.delete('/services/:id', adminController.serviceDelete)
router.post('/services', adminController.serviceCreate)

router.get('/users', adminController.userGet)
router.get('/users/:id', adminController.userGetOne)
router.post('/users/:id', adminController.userUpdate)
router.delete('/users/:id', adminController.userDelete)
router.post('/users', adminController.userCreate)

router.get('/orders', adminController.ordersGet)
router.get('/orders/:id', adminController.ordersGetOne)
router.post('/orders/:id', adminController.ordersUpdate)
router.delete('/orders/:id', adminController.ordersDelete)
router.post('/orders', adminController.ordersCreate)

router.get('/reviews', adminController.reviewsGet)
router.get('/reviews/:id', adminController.reviewsGetOne)
router.post('/reviews/:id', adminController.reviewsUpdate)
router.delete('/reviews/:id', adminController.reviewsDelete)
router.post('/reviews', adminController.reviewsCreate)


module.exports = router