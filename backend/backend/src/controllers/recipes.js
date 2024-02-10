const usersSchema = require("../../db/schema");
const service = require("../services/recipes");

const getAll = async (req, res, next) => {
  try {
    res.json({ data: await service.getAll() });
  } catch (error) {
    next(error);
  }
};

const save = async (req, res, next) => {
  try {
    const { username, customerName, email } = req.body;
    const existingEmail = await usersSchema.findOne({ email });

    if (existingEmail) {
      return res.status(401).json({ message: " email exist" });
    }

    let profilePic;
    if (req.file) {
      profilePic = req.file.filename;
    }

    const newUser = {
      username,
      customerName,
      email,
      profilePic,
    };

    res.status(201).json({ data: await service.save(newUser) });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id, username, customerName, email, profilePic } = req.body;

    const updatedCustomer = await service.update({
      id,
      username,
      customerName,
      email,
      profilePic,
    });

    if (!updatedCustomer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json({ data: updatedCustomer });
  } catch (error) {
    console.error("Error during customer update:", error);

    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Validation error", details: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.query;
    console.log(id);

    if (!id) {
      return res
        .status(400)
        .json({ error: "Missing 'id' parameter in the request." });
    }

    await service.remove(id);

    res.status(204).json({ message: "Successfully deleted." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,

  save,
  update,
  remove,
};
