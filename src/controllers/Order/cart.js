const mongoose = require("mongoose");
const Product = require("../../models/prodctusSchema"); 
const Items = require("../../models/itemsSchema");

const cart = async (req, res) => {
    const { email, name, productId, quantity } = req.body;

    // Validate required fields
    if (!email || !name || !productId || !quantity) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // Find product by productId
        const product = await Product.findById(productId);
        console.log('product---->', product)
        if (!product) {
            return res.status(400).json({ error: "Product not found" });
        }

        // Retrieve product details (prodName, image, price) directly from the product model
        const { price, image, prodName } = product;    //same as  --> const {name, email  }= req.body
        // console.log("------------------------>",product)
        const totalPrice = price * quantity;

        // Find the user's cart using email and name
        let cart = await Items.findOne({ email: email, name: name });

        if (!cart) {
            // If no cart exists for the user, create a new one
            cart = new Items({
                email: email,
                name: name,
                items: [],
                totalPrice: 0,
            });
        }

        // Check if the item already exists in the cart
        const itemIndex = cart.items.findIndex(item =>
            item.product.toString() === new mongoose.Types.ObjectId(productId).toString()
        );

        if (itemIndex > -1) {
            // If the product already exists, increase its quantity and price
            cart.items[itemIndex].quantity += quantity;
            cart.items[itemIndex].price += totalPrice;
        } else {
            // If the product doesn't exist, add it to the cart with prodName and image fetched from the Product model
            cart.items.push({
                product: productId,
                quantity,
                price: totalPrice,
                prodName:prodName,  
                image: image         
            });
        }    

        // Update total price of the cart
        cart.totalPrice += totalPrice;

        // Save the updated cart to the database
        await cart.save();

        // Respond with success, including updated cart
        res.status(200).json({
            message: 'Item added to cart',
            cart
        });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { cart };

// --------------------code flow

// Input Validation:

// Checks if email, name, productId, and quantity are provided.

// If any are missing, responds with a 400 error.

// Find Product:

// Fetches product using productId from the Product collection.

// If the product is not found, returns a 400 error.

// Calculate Price:

// Multiplies product price by requested quantity to calculate total price.

// Find User's Cart:

// Searches for an existing cart using email and name.

// Create New Cart:

// If no cart exists, a new cart is created with email, name, and an empty items array.

// Check if Product is Already in Cart:

// Uses findIndex to check if the product already exists in the cart.

// Update Cart if Product Exists:

// If the product is found, updates its quantity and price.

// Add Product if Not Found:

// If the product is not in the cart, it is added with the productId, quantity, and calculated price.

// Update Cart Total Price:

// Updates the totalPrice of the cart by adding the price of the new or updated product.

// Save Cart:

// Saves the cart (new or updated) to the database.

// Success Response:

// Responds with a success message and the updated cart.

// Error Handling:

// Catches errors and responds with a 500 Internal Server Error if something goes wrong during the process.

// by me:

// image and prodName retrieve from Product Model as it already saved in db so when product id get it retrieve these detils from db






