import express from "express";
import router from "./routes";
import mongoose from "mongoose"
import cors from "cors";
import fileupload from 'express-fileupload';

import multer from "multer"
const upload = multer()

const PORT = process.env.PORT || 3000;
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileupload({useTempFiles: true}));
app.use(router)



mongoose.connect(CONNDOTENV,{
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})



app.listen(PORT,()=>console.log(`Ouvindo PORT ${PORT}`))
