const Category = require('../../models/categorySchema');

const category = async (req, res) => {
    try {
        const { category, image, slug } = req.body;

        if (!category || !image || !slug) {
            return res.status(400).json({ message: 'All fields are mandatory' });
        }

        // Check if category already exists
        const existingCategory = await Category.findOne({ category });
        if (existingCategory) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        // Create a new category
        const newCategory = new Category({ category, image, slug });
        await newCategory.save();

        res.status(201).json({ message: "Category created successfully", data: newCategory });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ error: "Failed to create category" });
    }
};

const getAllCategory = async (req, res) => {
    try {
        const data = await Category.find();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching category:", error);
        res.status(500).json({ error: "Failed to fetch category" });
    }
};

module.exports = { category, getAllCategory };
