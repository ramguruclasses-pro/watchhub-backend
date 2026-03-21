import express from 'express'
import {
  createContact,
  getContacts,
  markAsRead,
  deleteContact,
} from '../controllers/contactController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', createContact)                          // public
router.get('/', protect, admin, getContacts)             // admin only
router.put('/:id/read', protect, admin, markAsRead)      // admin only
router.delete('/:id', protect, admin, deleteContact)     // admin only

export default router