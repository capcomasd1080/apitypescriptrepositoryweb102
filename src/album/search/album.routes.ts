import express, {Request, Response} from "express"
import { Album, Photo, User } from "../album"
import * as searchData from "./album.search"
import {StatusCodes} from "http-status-codes"
import qs from "qs";
//import axios,{AxiosResponse} from '';


//import * as database from "./user.database"

export const albumRouter = express.Router()

albumRouter.get("/externalapi/photos/:id", async (req : Request, res : Response) => {
    try {
        const photo : Photo = await searchData.findOne( req.params.id)

        if (!photo) {
            return res.status(StatusCodes.NOT_FOUND).json({error : `photo not found!`})
        }
        


        return res.status(StatusCodes.OK).json({photo})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
})


albumRouter.get("/externalapi/albums", async (req : Request, res : Response) => {
    try {
        const allPhotos : Photo[] = await searchData.findAll(0)

        if (!allPhotos) {
            return res.status(StatusCodes.NOT_FOUND).json({msg : `No users at this time..`})
        }

        return res.status(StatusCodes.OK).json({total_photos : allPhotos.length, allPhotos})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
})



albumRouter.get("/externalapi/count" , async(req:Request , res :Response)=>{
    try {
        const allPhotos : Photo[] = await searchData.findAll(0)
       
        if (!allPhotos) {
            return res.status(StatusCodes.NOT_FOUND).json({total_photos : 0})
        }
        return res.status(StatusCodes.OK).json({total_photos : allPhotos.length})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
})


albumRouter.get("/externalapi/photos", async (req : Request, res : Response) => {
    try {

        const params = req.query;
        let title :string = '';    
        const paramTitle = params;//["title"] ; 
        
        
        
            if (!paramTitle) {
                return res.status(StatusCodes.BAD_REQUEST).json({error : `Please provide all the required parameters..`})
            }





            const valSearch = await searchData.findByTitle(title,params);

            //const valSearch : Photo [] = [] ;

            if(!valSearch){
                let salida : Photo[];
                salida = [] ;
            
                return res.status(StatusCodes.OK).json({total_photos : salida.length, salida})

            }else{
            
                return res.status(StatusCodes.OK).json({total_photos : valSearch.length, valSearch})
            }

    } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
 })


 albumRouter.get("/externalapi/users/:id", async (req : Request, res : Response) => {
    try {
        const user : User = await searchData.findUser( req.params.id)

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({error : `photo not found!`})
        }
        


        return res.status(StatusCodes.OK).json({user})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
 })



 albumRouter.get("/externalapi/albums/:id", async (req : Request, res : Response) => {
    try {
        const album : Album = await searchData.findAlbum( req.params.id)

        if (!album) {
            return res.status(StatusCodes.NOT_FOUND).json({error : `photo not found!`})
        }
        


        return res.status(StatusCodes.OK).json({album})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error})
    }
 })