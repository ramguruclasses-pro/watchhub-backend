import Product from '../models/productModel.js'

// GET /api/products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate('category', 'name')
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name')
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// POST /api/products
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ message: 'Product not found' })
    res.json({ message: 'Product deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// ✅ POST /api/products/:id/reviews
export const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)

    if (!product) return res.status(404).json({ message: 'Product not found' })

    // Check if already reviewed
    const alreadyReviewed = product.reviews.find(
      r => r.user?.toString() === req.user._id.toString()
    )
    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You have already reviewed this product' })
    }

    const review = {
      name:    req.user.name,
      rating:  Number(rating),
      comment,
      user:    req.user._id,
    }

    product.reviews.push(review)
    product.numReviews = product.reviews.length
    product.rating = product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Review added' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}