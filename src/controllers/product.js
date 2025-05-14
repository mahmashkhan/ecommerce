const fs = require('fs');
const multer = require('multer');
const path = require('path');

let allProduct = [];

const loadProducts = () => {
  try {
    const data = fs.readFileSync('./src/mock_db.json', 'utf-8');  //reading the file which is use
    allProduct = JSON.parse(data);
  } catch (error) {
    console.error('Error reading mock_db.json:', error);
    allProduct = [];
  }
};

loadProducts();

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const addProduct = (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error uploading file' });
    }

    const { productName, productPrice } = req.body;

    if (!productName) {
      return res.json({ message: 'Please provide a product name' });
    }

    if (!productPrice) {
      return res.json({ message: 'Please provide a product price' });
    }

    const product = {
      id: Date.now(),
      image: req.file ? req.file.filename : null, // If an image is uploaded
      productName,
      productPrice,
    };

    allProduct.push(product);

    try {
      fs.writeFileSync('./src/mock_db.json', JSON.stringify(allProduct, null, 2));
    } catch (error) {
      return res.status(500).json({ message: 'Error saving product' });
    }
    res.json(product);
  });
};

module.exports = addProduct;