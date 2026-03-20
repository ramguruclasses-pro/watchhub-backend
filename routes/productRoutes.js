import express from 'express'
import {
  getProducts, getProductById,
  createProduct, updateProduct, deleteProduct,
  createReview,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
  .get(getProducts)
  .post(protect, admin, createProduct)

router.route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct)

// ✅ Review route
router.post('/:id/reviews', protect, createReview)

export default router