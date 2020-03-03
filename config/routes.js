const express = require('express')
const router = express.Router()

// middleware
const {authenticateUser, checkAuthorisation} = require('../app/middlewares/authenticateUser')

// controllers
const usersController = require('../app/controllers/usersController')
const businessController = require('../app/controllers/businessController')
const creditorsController = require('../app/controllers/creditorsController')

router.get('/api/users', usersController.list)
router.post('/api/users/register', usersController.register)
router.post('/api/users/login', usersController.login)
router.delete('/api/users/logout', authenticateUser, usersController.logout)
router.delete('/api/users/logout-all', authenticateUser, usersController.logoutAll)
router.get('/api/users/check-login', authenticateUser, usersController.checkLoginStatus)

router.get('/api/businesses', authenticateUser, businessController.list)
router.get('/api/businesses/:id', authenticateUser, businessController.show)
router.post('/api/businesses', authenticateUser, businessController.create)
router.put('/api/businesses/:id', authenticateUser, businessController.update)
router.delete('/api/businesses/:id', authenticateUser, businessController.destroy)

// router.get('/api/suppliers', authenticateUser)
// router.get('/api/suppliers/:supplierId', authenticateUser)
// router.post('/api/suppliers', authenticateUser)
// router.put('/api/suppliers/:supplierId', authenticateUser)
// router.delete('/api/suppliers/:supplierId', authenticateUser, authoriseUser)

// router.get('/api/clients', authenticateUser)
// router.get('/api/clients/:clientId', authenticateUser)
// router.post('/api/clients', authenticateUser)
// router.put('/api/clients/:clientId', authenticateUser)
// router.delete('/api/clients/:clientId', authenticateUser, authoriseUser)

// router.get('/api/commodities', authenticateUser)
// router.get('/api/commodities/:commodityId', authenticateUser)
// router.post('/api/commodities', authenticateUser)
// router.put('/api/commodities/:commodityId', authenticateUser)
// router.delete('/api/commodities/:commodityId', authenticateUser, authoriseUser)

router.get('/api/businesses/:businessId/creditors', authenticateUser, checkAuthorisation, creditorsController.list)
router.get('/api/businesses/:businessId/creditors/:creditorId', authenticateUser, checkAuthorisation, creditorsController.show)
router.post('/api/businesses/:businessId/creditors', authenticateUser, checkAuthorisation, creditorsController.create)
router.put('/api/businesses/:businessId/creditors/:creditorId', authenticateUser, checkAuthorisation, creditorsController.update)
router.delete('/api/businesses/:businessId/creditors/:creditorId', authenticateUser, checkAuthorisation, creditorsController.destroy)

// router.get('/api/payables', authenticateUser)
// router.get('/api/payables/:payableId', authenticateUser)
// router.post('/api/payables', authenticateUser)
// router.put('/api/payables/:payableId', authenticateUser)
// router.delete('/api/payables/:payableId', authenticateUser, authoriseUser)

// router.get('/api/purchaseOrders', authenticateUser)
// router.get('/api/purchaseOrders/:purchaseOrderId', authenticateUser)
// router.post('/api/purchaseOrders', authenticateUser)
// router.put('/api/purchaseOrders/:purchaseOrderId', authenticateUser)
// router.delete('/api/purchaseOrders/:purchaseOrderId', authenticateUser, authoriseUser)

// router.get('/api/transactions', authenticateUser)
// router.get('/api/transactions/:transactionId', authenticateUser)
// router.post('/api/transactions', authenticateUser)
// router.put('/api/transactions/:transactionId', authenticateUser)
// router.delete('/api/transactions/:transactionId', authenticateUser, authoriseUser)

module.exports = router