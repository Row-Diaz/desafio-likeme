const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const { getAllPosts, addPost, deletePost, addLike } = require("./posts");
const CsbInspector = require('csb-inspector');
CsbInspector();

require("dotenv").config({ path: "./.env" }); // Usa .env real si existe

app.use(express.json());
app.use(cors());
app.use(express.static("public")); // Solo una vez

// Envia archivo a mostrar en el Home
app.get("/", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  } catch (error) {
    res.status(404).json({ message: "No se encuentra el recurso que estas solicitando" });
  }
});

// Endpoint para buscar los Posts
app.get("/posts", async (req, res) => {
  try {
    const getPosts = await getAllPosts();
    res.json(getPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al obtener los posts" });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const payload = req.body;
    await addPost(payload);
    res.send("Post creado con exito");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el post" });
  }
});

// Endpoint Like
app.put("/posts/like/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await addLike(id);
    res.send(resp);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al dar like" });
  }
});

// Endpoint Eliminar posts
app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deletePost(id);
    res.json({ message: "Eliminado con exito el Post" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al eliminar el post" });
  }
});

app.listen(3000, () => console.log("SERVIDOR ENCENDIDO en http://localhost:3000"));