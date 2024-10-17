const prisma = require("../config/prisma");
const cloudinary = require("../config/cloudinary");
const fs = require("fs/promises");
const path = require("path");
const { date } = require("joi");
const createError = require("../utils/create-error");

exports.listMember = async (req, res, next) => {
  try {
    const members = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
    res.json(members);
  } catch (err) {
    next(err);
  }
};

exports.updateMember = async (req, res, next) => {
  try {
    const { memberId } = req.params;
    const { role } = req.body;
    console.log(req.body);
    const user = await prisma.user.update({
      where: {
        id: Number(memberId),
      },
      data: {
        role: role,
      },
    });
    res.json({ message: "Update Success" });
  } catch (err) {
    next(err);
  }
};

exports.removeMember = async (req, res, next) => {
  try {
    const { memberId } = req.params;
    const member = await prisma.user.delete({
      where: {
        id: Number(memberId),
      },
    });
    res.json("Delete Success");
  } catch (err) {
    next(err);
  }
};

exports.getAllProduct = async (req, res, next) => {
  try {
    const allProduct = await prisma.product.findMany({
      select: {
        id: true,
        image: true,
        title: true,
        author: true,
        description: true,
        price: true,
        amount: true,
        sellAmount: true,
        publishDate: true,
        publisher: true,
        categoryId: true,
        image: true,
        imageId: true,
        category: {
          select: {
            name: true,
          },
        },
      },
    });
    res.json(allProduct);
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      amount,
      image,
      categoryId,
      author,
      publishDate,
      publisher,
    } = req.body;

    const haveBook = await prisma.product.findUnique({
      where: {
        title,
      },
    });

    if (haveBook) {
      return createError(400, "Already have this book");
    }

    let result = { secure_url: "", public_id: "" };

    if (image) {
      result = await cloudinary.uploader.upload(req.body.image, {
        public_id: `Nitipong-${Date.now()}`,
        resource_type: "auto",
        folder: "PersonalProject",
      });
    }

    const product = await prisma.product.create({
      data: {
        title,
        description,
        author,
        price: +price,
        amount: +amount,
        categoryId: +categoryId,
        image: result.secure_url,
        imageId: result.public_id,
        publisher,
        publishDate,
      },
    });

    res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const target = await prisma.product.findUnique({
      where: {
        id: +productId,
      },
    });

    if (target.image) {
      cloudinary.uploader.destroy(target.imageId);
    }

    const deleteItem = await prisma.product.delete({
      where: {
        id: +productId,
      },
    });

    res.json("Delete Success");
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const {
      title,
      description,
      price,
      amount,
      image,
      imageId,
      categoryId,
      author,
      publishDate,
      publisher,
    } = req.body;

    // const target = await prisma.product.findUnique({
    //   where: {
    //     id: +productId,
    //   },
    // });

    // let result;

    // if (target.imageId !== imageId) {
    //   cloudinary.uploader.destroy(target.imageId);
    //     result = await cloudinary.uploader.upload(req.body.image, {
    //     public_id: `Nitipong-${Date.now()}`,
    //     resource_type: "auto",
    //     folder: "PersonalProject",
    //   });
    // }

    // const product = await prisma.product.update({
    //   where: {
    //     id: +productId,
    //   },
    //   data: {
    //     title,
    //     description,
    //     price: +price,
    //     amount: +amount,
    //     image,
    //     categoryId: +categoryId,
    //     // image: result.secure_url,
    //     // imageId: result.public_id,
    //     author,
    //     publishDate,
    //     publisher,
    //   },
    // });

    // code from chat
    const target = await prisma.product.findUnique({
      where: {
        id: +productId,
      },
    });

    let updatedImage = target.image;
    let updatedImageId = target.imageId;

    if (target.imageId !== imageId) {
      // Remove the old image
      await cloudinary.uploader.destroy(target.imageId);
    }
    // Upload new image if provided
    if (image) {
      const result = await cloudinary.uploader.upload(image, {
        public_id: `Nitipong-${Date.now()}`,
        resource_type: "auto",
        folder: "PersonalProject",
      });

      console.log(result, "result");

      updatedImage = result.secure_url;
      updatedImageId = result.public_id;
    }

    const product = await prisma.product.update({
      where: {
        id: +productId,
      },
      data: {
        title,
        description,
        price: +price,
        amount: +amount,
        image: updatedImage, // use updated image URL
        imageId: updatedImageId, // use updated image ID
        categoryId: +categoryId,
        author,
        publishDate,
        publisher,
      },
    });

    res.json(product);
    console.log("Update Product");
  } catch (err) {
    next(err);
  }
};
