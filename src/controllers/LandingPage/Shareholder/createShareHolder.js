const ShareHolder = require('../../../models/shareHolder');
const createShareHolder = async (req, res)=>{
  const {name, title,description}= req.body;    
  if(!name || !title || !description){
    return res.status(400).json({message: 'All fields are mandatory'});
  }
    const newShareHolder = new ShareHolder({name, title, description});
    await newShareHolder.save();
    res.status(201).json({message: 'ShareHolder created successfully', data: newShareHolder});
}
module.exports = {createShareHolder};