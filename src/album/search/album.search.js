"use strict";
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
exports.findAlbum = exports.findUser = exports.findByTitle = exports.searchData = exports.findOne = exports.findAll = void 0;
const fs_1 = __importDefault(require("fs"));
let photo = loadAlbums();
const stringifySafe = require('json-stringify-safe');
const findAll = (offsetSearch) => __awaiter(void 0, void 0, void 0, function* () {
    let filterArray = Object.values(photo);
    //filterArray = filterArray.filter((filterArray)=> filterArray.id >= offsetSearch)
    //let photoMap = filterArray.map((filterArray) => Object.assign({ }, filterArray))
    //console.log(photoMap[0] , "maaap");
    //array2 = array1.map<MyObject>(s => new MyObject(...));
    return filterArray;
});
exports.findAll = findAll;
const findOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let valueID;
    valueID = "";
    Object.entries(photo).forEach(([key, value]) => {
        if (value.id.toString() === id) {
            valueID = key;
            return;
        }
    });
    return photo[valueID];
});
exports.findOne = findOne;
const searchData = (values, photo) => {
    let photoFind;
    photoFind = [];
    Object.entries(photo).forEach(([key, value]) => {
        if (value.title.includes(values)) {
            photoFind.push(value);
        }
    });
    return photoFind;
};
exports.searchData = searchData;
const findByTitle = (title, parameters) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log ("find");
    const parametersPar = JSON.parse(stringifySafe(parameters));
    let limit = 25;
    let offsetSearch = 0;
    let notLimit = false;
    if (Object.keys(parameters).length > 0) {
        if (parametersPar["notlimit"]) {
            notLimit = true;
            //console.log("notLimit");
        }
        if (parametersPar["limit"]) {
            try {
                limit = parametersPar["limit"];
            }
            catch (Exception) {
                console.log('parameter : limit is not a number ');
            }
        }
        if (parametersPar["offset"]) {
            try {
                //console.log(parametersPar["offset"]);
                offsetSearch = parametersPar["offset"];
                //console.log(limit + "aaa");
            }
            catch (Exception) {
                console.log('parameter : limit is not a number ');
            }
        }
    }
    if (limit <= 0) {
        limit = 25;
    }
    let allAlbums = yield (0, exports.findAll)(offsetSearch);
    let photoFind = [];
    let getAlbum;
    let lastLevel = '';
    getAlbum = allAlbums; //await allAlbums.filter(result =>  result.title.includes(title)  )
    let filterProperties = false;
    let limitExceed = false;
    for (let k in parameters) {
        //console.log(allAlbums.length + " a3") ;
        if (k !== "limit" && k !== "offset" && k !== "notlimit") {
            photoFind = [];
            filterProperties = true;
            Object.entries(allAlbums).forEach(([key, values]) => {
                lastLevel = k.substring(0, k.lastIndexOf('.'));
                //console.log(lastLevel);
                /*if(limit == photoFind.length  ){
                    limitExceed = true;
                    return;
                }*/
                switch (lastLevel) {
                    case "album":
                        const val = values[lastLevel];
                        const val_1 = val[k.substring(k.lastIndexOf('.') + 1)];
                        switch (typeof (val_1)) {
                            case "number":
                                const comp1 = val_1;
                                const parametersAux = parameters[k];
                                if (comp1 === parametersAux.toString()) {
                                    photoFind.push(values);
                                }
                                break;
                            case "string":
                                const comp12 = val_1;
                                const parametersAux1 = parameters[k];
                                if (comp12.includes(parametersAux1.toString())) {
                                    photoFind.push(values);
                                }
                                break;
                        }
                        break;
                    case "album.user":
                        const valu1 = values["album"];
                        const valu12 = valu1["user"];
                        const valu13 = valu12[k.substring(k.lastIndexOf('.') + 1)];
                        switch (typeof (valu13)) {
                            case "number":
                                const comp1 = valu13;
                                const parametersAux = parameters[k];
                                if (comp1 === parametersAux.toString()) {
                                    photoFind.push(values);
                                }
                                break;
                            case "string":
                                const comp12 = valu13;
                                const parametersAux1 = parameters[k];
                                if (comp12.includes(parametersAux1.toString())) {
                                    photoFind.push(values);
                                }
                                break;
                        }
                        break;
                    case "album.user.address":
                        const val2 = values["album"];
                        const val21 = val2["user"];
                        const val22 = val21["address"];
                        const val23 = val22[k.substring(k.lastIndexOf('.') + 1)];
                        switch (typeof (val23)) {
                            case "number":
                                const comp1 = val23;
                                const parametersAux = parameters[k];
                                if (comp1 === parametersAux.toString()) {
                                    photoFind.push(values);
                                }
                                break;
                            case "string":
                                const comp = val23;
                                const parametersAux1 = parameters[k];
                                if (comp.includes(parametersAux1.toString())) {
                                    photoFind.push(values);
                                }
                                break;
                        }
                        break;
                    case "album.company":
                        const val3 = values["album"];
                        const val31 = val3["company"];
                        const val33 = val31[k.substring(k.lastIndexOf('.') + 1)];
                        switch (typeof (val33)) {
                            case "number":
                                const comp3 = val33;
                                const parametersAux = parameters[k];
                                if (comp3 === parametersAux.toString()) {
                                    photoFind.push(values);
                                }
                                break;
                            case "string":
                                const comp31 = val33;
                                const parametersAux1 = parameters[k];
                                if (comp31.includes(parametersAux1.toString())) {
                                    photoFind.push(values);
                                }
                                break;
                        }
                        break;
                    case "album.user.address.geo":
                        const val4 = values["album"];
                        const val41 = val4["user"];
                        const val42 = val41["address"];
                        const val43 = val42["geo"];
                        const val44 = val43[k.substring(k.lastIndexOf('.') + 1)];
                        switch (typeof (val44)) {
                            case "number":
                                const comp4 = val44;
                                const parametersAux = parameters[k];
                                if (comp4 === parametersAux.toString()) {
                                    photoFind.push(values);
                                }
                                break;
                            case "string":
                                const comp41 = val44;
                                const parametersAux1 = parameters[k];
                                if (comp41.includes(parametersAux1.toString())) {
                                    photoFind.push(values);
                                }
                                break;
                        }
                        break;
                }
            });
            allAlbums = [];
            photoFind.forEach(val => allAlbums.push(Object.assign({}, val)));
        }
        //if(limitExceed ){
        //    break;
        //}
    }
    if (!getAlbum) {
        return null;
    }
    else {
        if (photoFind.length === 0 && Object.keys(parameters).length === 0) {
            photoFind = getAlbum;
        }
        else if (photoFind.length === 0 && filterProperties === false) {
            photoFind = getAlbum;
        }
        //console.log(offsetSearch + ' aaa ');
        //offsetSearch =47;
        if (offsetSearch == 0 && notLimit == false) {
            photoFind = photoFind.slice(offsetSearch, Number(offsetSearch) + Number(limit));
        }
        else if ((Number(offsetSearch) + Number(limit) - 1) > allAlbums.length && notLimit == false) {
            photoFind = photoFind.slice(offsetSearch);
        }
        else if (notLimit == false) {
            photoFind = photoFind.slice(offsetSearch, Number(offsetSearch) + Number(limit));
        }
    }
    return photoFind; //getAlbum; 
});
exports.findByTitle = findByTitle;
// {
//load json data into Albums arrays
function loadAlbums() {
    try {
        const data = fs_1.default.readFileSync("./Albums.json", "utf-8");
        let datas;
        datas = JSON.parse(data);
        return datas;
    }
    catch (error) {
        console.log(`Error ${error}`);
        return {};
    }
}
const findUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let valueID;
    valueID = "";
    Object.entries(photo).forEach(([key, value]) => {
        if (value.album.user.id.toString() === id) {
            valueID = key;
            return;
        }
    });
    return photo[valueID].album.user;
});
exports.findUser = findUser;
const findAlbum = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let valueID;
    valueID = "";
    Object.entries(photo).forEach(([key, value]) => {
        if (value.album.id.toString() === id) {
            valueID = key;
            return;
        }
    });
    return photo[valueID].album;
});
exports.findAlbum = findAlbum;
