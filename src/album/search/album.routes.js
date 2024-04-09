"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.albumRouter = void 0;
const express_1 = __importDefault(require("express"));
const searchData = __importStar(require("./album.search"));
const http_status_codes_1 = require("http-status-codes");
//import axios,{AxiosResponse} from '';
//import * as database from "./user.database"
exports.albumRouter = express_1.default.Router();
exports.albumRouter.get("/externalapi/photos/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const photo = yield searchData.findOne(req.params.id);
        if (!photo) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: `photo not found!` });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({ photo });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
exports.albumRouter.get("/externalapi/albums", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPhotos = yield searchData.findAll(0);
        if (!allPhotos) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ msg: `No users at this time..` });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({ total_photos: allPhotos.length, allPhotos });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
exports.albumRouter.get("/externalapi/count", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPhotos = yield searchData.findAll(0);
        if (!allPhotos) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ total_photos: 0 });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({ total_photos: allPhotos.length });
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
exports.albumRouter.get("/externalapi/photos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.query;
        let title = '';
        const paramTitle = params; //["title"] ; 
        if (!paramTitle) {
            return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: `Please provide all the required parameters..` });
        }
        const valSearch = yield searchData.findByTitle(title, params);
        //const valSearch : Photo [] = [] ;
        if (!valSearch) {
            let salida;
            salida = [];
            return res.status(http_status_codes_1.StatusCodes.OK).json({ total_photos: salida.length, salida });
        }
        else {
            return res.status(http_status_codes_1.StatusCodes.OK).json({ total_photos: valSearch.length, valSearch });
        }
    }
    catch (error) {
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
}));
