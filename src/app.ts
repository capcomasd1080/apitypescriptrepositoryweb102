import express ,{Express} from "express"
import * as dotevnv from "dotenv"
import cors from "cors"
import helmet from "helmet"
//import { Album,User,Adress,Company,LocationGeo,Albums} from "./album/album"
import {albumRouter} from "./album/search/album.routes"
import fs from "fs"
import http from 'http'


export const router: Express = express();

router.use(express.json());

dotevnv.config()

if (!process.env.PORT) {
    console.log(`No port value specified...`)
}


//export const findOne = async (id: string): Promise<Album> => album[id];


router.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Origin','origin, X-Request-With,Content-Type,Accept, Authorization');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','GET PATCH DELETE POST PUT');
        return res.status(200).json({});        
    }
    next();

});


const PORT = parseInt(process.env.PORT as string, 10)

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors())
app.use(helmet())
app.use('/',albumRouter)


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})