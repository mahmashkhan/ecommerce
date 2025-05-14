let cart = []

const addToCart = (req,res)=>{
    const { id, productName, productPrice } = req.body;
    const product = { id, productName, productPrice, quantity: 1 };
    
    const productExist = cart.find(item => item.id === id);
    if (productExist) {
        productExist.quantity += 1; 
    } else {
        cart.push(product);
    }
    res.json(cart);
}
module.exports = addToCart
