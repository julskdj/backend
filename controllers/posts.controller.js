import { request, response } from "express";
import { Post } from "../models/Post.js";

export const crearPost = async (req = request, res = response) => {
  try {
    const { title, content } = req.body;
    const post = new Post({ title, content });

    await post.save();
    const posts = await Post.find().lean();

    return res.json({ ok: true, message: "Post creado correctamente", posts });
  } catch (error) {
    return res.json({ ok: false, message: error.message }).status(500);
  }
};

export const obtenerPosts = async (req = request, res = response) => {
  try {
    const posts = await Post.find();

    return res.json({ ok: true, posts });
  } catch (error) {
    return res.json({ ok: false, message: error.message }).status(500);
  }
};

export const editarPost = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await Post.findByIdAndUpdate(id, { title, content });
    const posts = await Post.find();

    return res.json({
      ok: true,
      message: "Post actualizado correctamente",
      posts,
    });
  } catch (error) {
    return res.json({ ok: false, message: error.message }).status(500);
  }
};

export const eliminarPost = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.json({ ok: false, message: "El id es obligatorio" });
    } else {
      await Post.findByIdAndDelete(id);
      const posts = await Post.find();
      return res.json({
        ok: true,
        message: "Post eliminado correctamente",
        posts,
      });
    }
  } catch (error) {
    return res.json({ ok: false, message: error.message }).status(500);
  }
};
