
import express ,{Express} from "express"
import * as dotevnv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import {albumRouter} from "./src/album/search/album.routes" //album/search/album.routes";
import fs from "fs"
import http from 'http'

const app = express();

const PORT = 7000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
})
app.use('/',albumRouter)

app.listen(PORT, () => {
  console.log("Server is listening on port ${PORT}")
})