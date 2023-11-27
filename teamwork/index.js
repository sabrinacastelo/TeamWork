const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const cors = require('cors')

dotenv.config();  

async function conectarAoBancoDeDados() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado com MongoDB");
  } catch (erro) {
    console.error("Erro ao conectar ao banco de dados", erro);
  }
}

conectarAoBancoDeDados();

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors())

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute)

app.listen(8800, () => {
  console.log("O servidor do backend está em execução na porta 8800");
});

