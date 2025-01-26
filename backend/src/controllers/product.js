import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// === CREATE PRODUCT ===
export const createProduct = async (req, res) => {
  try {
    const { name, imageUrl, description, actualPrice, discountedPrice, categoryId } = req.body;

    if (!name || !imageUrl || !description || !actualPrice || !discountedPrice || !categoryId) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const product = await prisma.product.create({
      data: {
        name,
        imageUrl,
        description,
        actualPrice,
        discountedPrice,
        categoryId,
      },
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create product." });
  }
};

// === READ ALL PRODUCTS ===
export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true, // Include category details in the response
      },
    });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products." });
  }
};

// === READ PRODUCTS BY CATEGORY ===
export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await prisma.product.findMany({
      where: { categoryId },
    });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products by category." });
  }
};

// === READ SINGLE PRODUCT BY ID ===
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true, // Include category details in the response
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch product." });
  }
};

// === UPDATE PRODUCT ===
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, imageUrl, description, actualPrice, discountedPrice, categoryId } = req.body;

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        imageUrl,
        description,
        actualPrice,
        discountedPrice,
        categoryId,
      },
    });

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update product." });
  }
};

// === DELETE PRODUCT ===
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id },
    });

    res.status(204).send(); // No content
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete product." });
  }
};
