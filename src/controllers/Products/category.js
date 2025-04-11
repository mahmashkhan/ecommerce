const Category = require('../../models/categorySchema');
const multer = require('multer');

const storage = multer.memoryStorage();
const categoryUploads = multer({ storage });
const createCategory = async (req, res) => {
    try {
        const { category, slug } = req.body;
        const image = req.file;

        if (!category || !slug || !image) {
            return res.status(400).json({ message: 'All fields are mandatory' });
        }

        // Check if slug already exists (instead of category name)
        const existingCategory = await Category.findOne({ slug });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category slug already exists' });
        }

        // Convert image to Base64
        const base64Image = `data:${image.mimetype};base64,${image.buffer.toString("base64")}`;

        // Create a new category
        const newCategory = new Category({ category, image: base64Image, slug });
        await newCategory.save();

        res.status(201).json({ message: "Category created successfully", data: newCategory });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ error: "Failed to create category" });
    }
};

// Get all categories
const getAllCategory = async (req, res) => {
    try {
        const data = await Category.find();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching category:", error);
        res.status(500).json({ error: "Failed to fetch category" });
    }
};

module.exports = { createCategory, getAllCategory, categoryUploads };
