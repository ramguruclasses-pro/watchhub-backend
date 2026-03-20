import mongoose from 'mongoose'

// ✅ Review subdocument
const reviewSchema = new mongoose.Schema({
  user:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:    { type: String, required: true },
  rating:  { type: Number, required: true },
  comment: { type: String, required: true },
}, { timestamps: true })

const productSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  description:  { type: String, default: '' },
  price:        { type: Number, required: true, default: 0 },
  image:        { type: String, default: '' },
  category:     { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  countInStock: { type: Number, required: true, default: 0 },

  // ✅ Reviews
  reviews:      [reviewSchema],
  rating:       { type: Number, default: 0 },
  numReviews:   { type: Number, default: 0 },
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema)
export default Product