import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  type: String,
  price: Number,
  promotionalPrice: Number,
  images: []
})

productSchema.index({name: 'text'});

export const Product = mongoose.model('Product', productSchema);