const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const searchRoute = require("./routes/search");
const cors = require('cors')
const multer = require("multer");
const path = require("path");

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

app.use("/images", express.static(path.join(__dirname, "public/images")))

//middleware

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors({
  origin: 'http://localhost:3000' // substitua por seu domínio
}));
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  next();
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images")
  },
  filename: (req, file, cb) => {
      cb(null, req.body.name);
  }
})

const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req, res) => {

  try{
    return res.status(200).json("O arquivo foi enviado");

  }catch(err){
    console.log(err)
  }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute)
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/search", searchRoute);

app.listen(8800, () => {
  console.log("O servidor do backend está em execução na porta 8800");
});

