const Blogs = require("../models/blogSchema"); 

const blogs = async (req, res) => {
  const blogData = req.body;

  if (!blogData || !blogData.content || blogData.content.trim() === "") {
    return res.status(400).json({ message: "Enter blog content" });
  }

  try {
    const newBlog = new Blog(blogData);
    await newBlog.save();

    res.status(201).json({ message: "Blog created", blog: newBlog });
  } catch (error) {
    console.error("Error saving blog:", error);
    res.status(500).json({ message: "Failed to save blog", error });
  }
};
const getBlogs = async (req, res) => {
    try {
      const blogs = await Blogs.find();
      res.status(200).json(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({ message: "Failed to fetch blogs", error });
    }
  };
  
module.exports ={blogs,getBlogs}
