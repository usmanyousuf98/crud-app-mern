const fs = require("fs").promises;
const path = require("path");
const usersSchema = require("../../db/schema.js");

const getAll = async () => usersSchema.find(); //JSON.parse(await fs.readFile(recipesFilePath));

const get = async (id) => {
  const recipes = await getAll();
  return recipes.find((recipe) => recipe.id === parseInt(id));
};

const save = async (recipe) => {
  const newRecipe = new usersSchema({
    username: recipe.username,
    customerName: recipe.customerName,
    email: recipe.email,
    profilePic: recipe.profilePic,
  });
  await newRecipe.save();
  return recipe;
};

const update = async (updated) => {
  try {
    const filter = { _id: updated.id };
    const result = await usersSchema.findOneAndUpdate(filter, updated, {
      new: true,
    });

    if (!result) {
      throw new Error("Document not found");
    }

    return result;
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

const remove = async (id) => {
  try {
    console.log("usersSchema", id);
    await usersSchema.findByIdAndDelete(id);
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAll,
  get,
  save,
  update,
  remove,
};
