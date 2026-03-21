import Contact from '../models/contactModel.js'

// POST /api/contact — user message save karo
export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Sab fields required hain' })
    }
    const contact = await Contact.create({ name, email, subject, message })
    res.status(201).json({ message: 'Message sent successfully ✅', contact })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/contact — admin ke liye sab messages
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 })
    res.json(contacts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// PUT /api/contact/:id/read — message read mark karo
export const markAsRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    )
    res.json(contact)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// DELETE /api/contact/:id — message delete karo
export const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id)
    res.json({ message: 'Message deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}