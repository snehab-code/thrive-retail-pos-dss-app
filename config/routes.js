const express = require('express')
const router = express.Router()

// middleware
const {authenticateUser, checkAuthorisation} = require('../app/middlewares/authenticateUser')

// controllers
const usersController = require('../app/controllers/usersController')
const businessController = require('../app/controllers/businessController')
const cashBankController = require('../app/controllers/cashBankController')
const creditorsController = require('../app/controllers/creditorsController')
const clientsController = require('../app/controllers/clientsController')
const commoditiesController = require('../app/controllers/commoditiesController')
const journalController = require('../app/controllers/journalController')
const payablesController = require('../app/controllers/payablesController')
const purchaseOrdersController = require('../app/controllers/purchaseOrdersController')
const suppliersController = require('../app/controllers/suppliersController')
// const transactionsController = require('../app/controllers/transactionController')
const salesController = require('../app/controllers/salesController')
const purchasesController = require('../app/controllers/purchasesController')
const ordersController = require('../app/controllers/ordersController')

// routes

// reminder: add limits etc for pagination
router.get('/api/businesses', authenticateUser, businessController.list)
router.get('/api/businesses/:id', authenticateUser, businessController.show)
router.post('/api/businesses', authenticateUser, businessController.create)
router.put('/api/businesses/:id', authenticateUser, businessController.update)
router.delete('/api/businesses/:id', authenticateUser, businessController.destroy)
router.get('/api/businesses/:id/invites', authenticateUser, businessController.viewInvite)
router.post('/api/businesses/:id/invites', authenticateUser, businessController.createInvite)
router.post('/api/businesses/:id/invites/acceptance', authenticateUser, businessController.join)

// router.get('/api/businesses/:id/all-info', authenticateUser, businessController.listInfo)

router.get('/api/businesses/:businessId/cash-bank', authenticateUser, checkAuthorisation, cashBankController.list)
router.get('/api/businesses/:businessId/cash-bank/:cashBankId', authenticateUser, checkAuthorisation, cashBankController.show)
router.post('/api/businesses/:businessId/cash-bank', authenticateUser, checkAuthorisation, cashBankController.create)
router.put('/api/businesses/:businessId/cash-bank/:cashBankId', authenticateUser, checkAuthorisation, cashBankController.update)
router.delete('/api/businesses/:businessId/cash-bank/:cashBankId', authenticateUser, checkAuthorisation, commoditiesController.destroy)

router.get('/api/businesses/:businessId/clients', authenticateUser, checkAuthorisation, clientsController.list)
router.get('/api/businesses/:businessId/clients/:clientId', authenticateUser, checkAuthorisation, clientsController.show)
router.post('/api/businesses/:businessId/clients', authenticateUser, checkAuthorisation, clientsController.create)
router.put('/api/businesses/:businessId/clients/:clientId', authenticateUser, checkAuthorisation, clientsController.update)
router.delete('/api/businesses/:businessId/clients/:clientId', authenticateUser, checkAuthorisation, clientsController.destroy)

router.get('/api/businesses/:businessId/commodities', authenticateUser, checkAuthorisation, commoditiesController.list)
router.get('/api/businesses/:businessId/commodities/:commodityId', authenticateUser, checkAuthorisation, commoditiesController.show)
router.post('/api/businesses/:businessId/commodities', authenticateUser, checkAuthorisation, commoditiesController.create)
router.put('/api/businesses/:businessId/commodities/:commodityId', authenticateUser, checkAuthorisation, commoditiesController.update)
router.delete('/api/businesses/:businessId/commodities/:commodityId', authenticateUser, checkAuthorisation, commoditiesController.destroy)

router.get('/api/businesses/:businessId/creditors', authenticateUser, checkAuthorisation, creditorsController.list)
router.get('/api/businesses/:businessId/creditors/:creditorId', authenticateUser, checkAuthorisation, creditorsController.show)
router.post('/api/businesses/:businessId/creditors', authenticateUser, checkAuthorisation, creditorsController.create)
router.put('/api/businesses/:businessId/creditors/:creditorId', authenticateUser, checkAuthorisation, creditorsController.update)
router.delete('/api/businesses/:businessId/creditors/:creditorId', authenticateUser, checkAuthorisation, creditorsController.destroy)

router.get('/api/businesses/:businessId/journal-entries', authenticateUser, checkAuthorisation, journalController.list)
router.get('/api/businesses/:businessId/journal-entries/:journalId', authenticateUser, checkAuthorisation, journalController.show)
router.post('/api/businesses/:businessId/journal-entries', authenticateUser, checkAuthorisation, journalController.create)
router.put('/api/businesses/:businessId/journal-entries/:journalId', authenticateUser, checkAuthorisation, journalController.update)
router.delete('/api/businesses/:businessId/journal-entries/:journalId', authenticateUser, checkAuthorisation, journalController.destroy)

router.get('/api/businesses/:businessId/payables', authenticateUser, checkAuthorisation, payablesController.list)
router.get('/api/businesses/:businessId/payables/:payableId', authenticateUser, checkAuthorisation, payablesController.show)
router.post('/api/businesses/:businessId/payables', authenticateUser, checkAuthorisation, payablesController.create)
router.put('/api/businesses/:businessId/payables/:payableId', authenticateUser, checkAuthorisation, payablesController.update)
router.delete('/api/businesses/:businessId/payables/:payableId', authenticateUser, checkAuthorisation, payablesController.destroy)

router.get('/api/businesses/:businessId/purchase-orders', authenticateUser, checkAuthorisation, purchaseOrdersController.list)
router.get('/api/businesses/:businessId/purchase-orders/:purchaseOrderId', authenticateUser, checkAuthorisation, purchaseOrdersController.show)
router.post('/api/businesses/:businessId/purchase-orders', authenticateUser, checkAuthorisation, purchaseOrdersController.create)
router.put('/api/businesses/:businessId/purchase-orders/:purchaseOrderId', authenticateUser, checkAuthorisation, purchaseOrdersController.update)
router.delete('/api/businesses/:businessId/purchase-orders/:purchaseOrderId', authenticateUser, checkAuthorisation, purchaseOrdersController.destroy)

router.get('/api/businesses/:businessId/suppliers', authenticateUser, checkAuthorisation, suppliersController.list)
router.get('/api/businesses/:businessId/suppliers/:supplierId', authenticateUser, checkAuthorisation, suppliersController.show)
router.post('/api/businesses/:businessId/suppliers', authenticateUser, checkAuthorisation, suppliersController.create)
router.put('/api/businesses/:businessId/suppliers/:supplierId', authenticateUser, checkAuthorisation, suppliersController.update)
router.delete('/api/businesses/:businessId/suppliers/:supplierId', authenticateUser, checkAuthorisation, suppliersController.destroy)

// router.get('/api/businesses/:businessId/transactions', authenticateUser, checkAuthorisation, transactionsController.list)
// router.get('/api/businesses/:businessId/transactions/:transactionId', authenticateUser, checkAuthorisation, transactionsController.show)
// router.post('/api/businesses/:businessId/transactions', authenticateUser, checkAuthorisation, transactionsController.create)
// router.put('/api/businesses/:businessId/transactions/:transactionId', authenticateUser, checkAuthorisation, transactionsController.update)
// router.delete('/api/businesses/:businessId/transactions/:transactionId', authenticateUser, checkAuthorisation, transactionsController.destroy)

router.get('/api/businesses/:businessId/sales', authenticateUser, checkAuthorisation, salesController.list)
router.get('/api/businesses/:businessId/sales/:saleId', authenticateUser, checkAuthorisation, salesController.show)
router.post('/api/businesses/:businessId/sales', authenticateUser, checkAuthorisation, salesController.create)
router.put('/api/businesses/:businessId/sales/:saleId', authenticateUser, checkAuthorisation, salesController.update)
router.delete('/api/businesses/:businessId/sales/:saleId', authenticateUser, checkAuthorisation, salesController.destroy)


router.get('/api/businesses/:businessId/orders', authenticateUser, checkAuthorisation, ordersController.list)
router.get('/api/businesses/:businessId/orders/:orderId', authenticateUser, checkAuthorisation, ordersController.show)
router.post('/api/businesses/:businessId/orders', authenticateUser, checkAuthorisation, ordersController.create)
router.put('/api/businesses/:businessId/orders/:orderId', authenticateUser, checkAuthorisation, ordersController.update)
router.delete('/api/businesses/:businessId/orders/:orderId', authenticateUser, checkAuthorisation, ordersController.destroy)

// router.post('/api/businesses/:businessId/orders/:orderId/delivery', authenticateUser, checkAuthorisation, ordersController.createPurchase)

router.get('/api/businesses/:businessId/purchases', authenticateUser, checkAuthorisation, purchasesController.list)
router.get('/api/businesses/:businessId/purchases/:purchaseId', authenticateUser, checkAuthorisation, purchasesController.show)
router.post('/api/businesses/:businessId/purchases', authenticateUser, checkAuthorisation, purchasesController.create)
router.put('/api/businesses/:businessId/purchases/:purchaseId', authenticateUser, checkAuthorisation, purchasesController.update)
router.delete('/api/businesses/:businessId/purchases/:purchaseId', authenticateUser, checkAuthorisation, purchasesController.destroy)


router.get('/api/users', usersController.list)
router.post('/api/users/register', usersController.register)
router.post('/api/users/login', usersController.login)
router.delete('/api/users/logout', authenticateUser, usersController.logout)
router.delete('/api/users/logout-all', authenticateUser, usersController.logoutAll)
router.get('/api/users/relogin', authenticateUser, usersController.checkLoginStatus)
// add a route for all invites

module.exports = router