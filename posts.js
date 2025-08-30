require('dotenv').config()

const pool = require("./src/helpers/connect").getInstance();
// const { Pool } = require('pg')



const getAllPosts = async() => {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
};

const addPost = async (payload) => {
  const consulta =
    "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, $4)RETURNING * ";
  const values = [payload.titulo, payload.url, payload.descripcion, 0];
  const result = await pool.query(consulta, values);
};

const addLike = async (id) => {
  console.log(id);
  const result = await pool.query("UPDATE posts SET likes = likes + 1 WHERE id = $1", [id]);
  console.log(result);
  return result.rows;
};

const deletePost = async (id) => {
  const query = "DELETE FROM posts WHERE id = $1";
  const values = [id];
  const result = await pool.query(query, values);
};


module.exports = { getAllPosts, addPost, deletePost, addLike };
