"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const album_routes_1 = require("./src/album/search/album.routes"); //album/search/album.routes";
const app = (0, express_1.default)();
const PORT = 7000;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use('/', album_routes_1.albumRouter);
app.listen(PORT, () => {
    console.log("Server is listening on port ${PORT}");
});
