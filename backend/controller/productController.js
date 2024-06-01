import asyncHandler from 'express-async-handler';
import product from '../models/productModel.js';


// @desc Fetch all products
// @route GET /api/products
// @access public
const getProducts =asyncHandler(async(req,res)=>{
    const pageSize = 8;
    const page = Number(req.query.pageNumber || 1 );
    
    const keyword = req.query.keyword ? {name:{$regex: req.query.keyword, $options: 'i'}} : {};
    
    const count = await product.countDocuments({...keyword});

    const products = await product.find({...keyword}).limit(pageSize).skip(pageSize * (page -1));
    res.json({products, page, pages: Math.ceil(count/pageSize)});
});

// @desc Fetch a product
// @route GET /api/products/:id
// @access public
const getProductById =asyncHandler(async(req,res)=>{
    const productItem = await product.findById(req.params.id);

    if (product){
    return res.json(productItem);
    }else{
        res.status(404);
        throw new Error("product not found");
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const delProduct = await product.findById(req.params.id);

  if (delProduct) {
    await product.deleteOne({ _id: delProduct._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const newProduct = new product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    });
    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct);
  });

  // @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } =
      req.body;
  
    const updateProduct = await product.findById(req.params.id);
  
    if (updateProduct) {
      updateProduct.name = name;
      updateProduct.price = price;
      updateProduct.description = description;
      updateProduct.image = image;
      updateProduct.brand = brand;
      updateProduct.category = category;
      updateProduct.countInStock = countInStock;
  
      const updatedProduct = await updateProduct.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  });

  // @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const reviewedProduct = await product.findById(req.params.id);

  if (reviewedProduct) {
    const alreadyReviewed = reviewedProduct.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      createdAt: Date.now(),
      user: req.user._id,
    };

    reviewedProduct.reviews.push(review);

    reviewedProduct.numReviews = reviewedProduct.reviews.length;

    reviewedProduct.rating =
      reviewedProduct.reviews.reduce((acc, item) => item.rating + acc, 0) /
      reviewedProduct.reviews.length;

    await reviewedProduct.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const topProducts = await product.find({}).sort({ rating: -1 }).limit(3);

  res.json(topProducts);
});

export {getProductById, getProducts, createProduct, updateProduct ,deleteProduct, createProductReview, getTopProducts};