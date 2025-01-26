import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// === CREATE CATEGORY ===
export const createCategory = async (req, res) => {
  try {
    const { name, imageUrl } = req.body;

    if (!name || !imageUrl) {
      return res.status(400).json({ error: "Name and imageUrl are required." });
    }

    const category = await prisma.category.create({
      data: { name, imageUrl },
    });

    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create category." });
  }
};

// === READ ALL CATEGORIES ===
export const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch categories." });
  }
};

// === READ SINGLE CATEGORY BY ID ===
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch category." });
  }
};

// === UPDATE CATEGORY ===
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, imageUrl } = req.body;

    const category = await prisma.category.update({
      where: { id },
      data: { name, imageUrl },
    });

    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update category." });
  }
};

// === DELETE CATEGORY ===
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.category.delete({
      where: { id },
    });

    res.status(204).send(); // No content
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete category." });
  }
};
