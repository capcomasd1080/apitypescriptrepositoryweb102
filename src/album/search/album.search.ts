
import { Album,User,Adress,Company,LocationGeo,Photo , Photos} from "../album"
import fs from "fs"

let photo: Photos  = loadAlbums()

const stringifySafe = 
    require('json-stringify-safe');

export const findAll = async (offsetSearch:number): Promise<Photo[]> => {

    

    let filterArray : Photo[] = Object.values(photo);
    //filterArray = filterArray.filter((filterArray)=> filterArray.id >= offsetSearch)
    //let photoMap = filterArray.map((filterArray) => Object.assign({ }, filterArray))

    //console.log(photoMap[0] , "maaap");
    //array2 = array1.map<MyObject>(s => new MyObject(...));

    
    return filterArray;
}

export const findOne = async (id: string): Promise<Photo> => 
    
  {
    let valueID : string ; 
    valueID = "";
     Object.entries(photo).forEach(([key,value])=>{ 
            if (value.id.toString() === id){
                valueID = key;
                return;
            }
    })
    return photo[valueID];
};



 export const searchData=  ( values: string , photo : Photo[] ): Photo[] => {

    let photoFind : Photo[];
    photoFind = [];


   


    Object.entries(photo).forEach(([key,value])=>{ 
        if (value.title.includes(values)){
            photoFind.push(value);
        }
    })

    return photoFind;
 }



export const findByTitle = async (title: string , parameters: Object ) : Promise<Photo[]> => {
    //console.log ("find");

    const parametersPar =  JSON.parse(stringifySafe(parameters));  

    let limit :number = 25;
    let offsetSearch : number = 0;
    let notLimit : boolean = false;

    if(Object.keys(parameters).length>0){
     
        if(parametersPar["notlimit"]){
            notLimit = true;
            console.log("notLimit");
        }
        if(parametersPar["limit"]){
            try{
               
                limit = parametersPar["limit"];
                
            }catch(Exception){
                console.log('parameter : limit is not a number ');
            }
        }
        if(parametersPar["offset"]){
            try{
                //console.log(parametersPar["offset"]);
                offsetSearch = parametersPar["offset"];
            //console.log(limit + "aaa");
            }catch(Exception){
                console.log('parameter : limit is not a number ');
            }
        }
    }

    if(limit <= 0 ){
        limit = 25;
    }

    let allAlbums = await findAll(offsetSearch);

    let photoFind : Photo[] = [];
    let getAlbum :  Photo[];
    let lastLevel : string = ''; 
    getAlbum = allAlbums ;//await allAlbums.filter(result =>  result.title.includes(title)  )
    
    let filterProperties : boolean =false;
    let limitExceed : boolean =false;
    

    for(let k in parameters){

        //console.log(allAlbums.length + " a3") ;
          
        if ( k !== "limit" &&  k !== "offset" && k!=="notlimit"){
            photoFind = [];
            filterProperties = true;
            Object.entries(allAlbums).forEach(([key,values])=>{ 
                
                lastLevel =  k.substring(0 ,  k.lastIndexOf('.'));
                //console.log(lastLevel);
                
                /*if(limit == photoFind.length  ){
                    limitExceed = true;
                    return;
                }*/
                switch(lastLevel){
                    case "album" :
                        const val = values[lastLevel as keyof Photo];
                        const val_1 =  val[  k.substring( k.lastIndexOf('.')+ 1  ) as keyof typeof val];

                        switch(typeof(val_1)){
                            case "number" :
                                const comp1: string = val_1 ;
                                const parametersAux  = parameters[k as keyof Object] ;

                                if(comp1 === parametersAux.toString() ){
                                    photoFind.push(values);
                                }
                                break;
                            case "string" :
                                const comp12: string = val_1 ;
                                const parametersAux1  = parameters[k as keyof Object] ;
                                if(comp12.includes(parametersAux1.toString()) ){
                                    photoFind.push(values);
                                }
                                break;
                            }


                        break;
                    case "album.user":
                        const valu1 = values["album" as keyof  Photo];
                        const valu12 = valu1["user" as keyof typeof valu1];
                        const valu13 = valu12[ k.substring( k.lastIndexOf('.')+ 1  ) as keyof typeof valu12];
                        
                        switch(typeof(valu13)){
                            case "number" :
                                const comp1: string = valu13 ;
                                const parametersAux  = parameters[k as keyof Object] ;

                                if(comp1 === parametersAux.toString() ){
                                    photoFind.push(values);
                                }
                                break;
                            case "string" :
                                const comp12: string = valu13 ;
                                const parametersAux1  = parameters[k as keyof Object] ;
                                if(comp12.includes(parametersAux1.toString()) ){
                                    photoFind.push(values);
                                }
                                break;
                            }


                        break;
                    case "album.user.address" :
                        const val2 = values["album" as keyof  Photo];
                        const val21 = val2["user" as keyof typeof val2];
                        const val22 = val21["address" as keyof typeof val21];
                        const val23 = val22[ k.substring( k.lastIndexOf('.')+ 1  ) as keyof typeof val22];
                        
                        switch(typeof(val23)){
                            case "number" :
                                const comp1: string = val23 ;
                                const parametersAux  = parameters[k as keyof Object] ;

                                if(comp1 === parametersAux.toString() ){
                                    photoFind.push(values);
                                }
                                break;
                            case "string" :
                                const comp: string = val23 ;
                                const parametersAux1  = parameters[k as keyof Object] ;
                                if(comp.includes(parametersAux1.toString()) ){
                                    photoFind.push(values);
                                    
                                }
                                break;
                        }
                        


                        break;
                    case "album.company" :
                        const val3 = values["album" as keyof  Photo];
                        const val31 = val3["company" as keyof typeof val3];
                        const val33 = val31[ k.substring( k.lastIndexOf('.')+ 1  ) as keyof typeof val31];
                       
                        switch(typeof(val33)){
                            case "number" :
                                const comp3: string = val33 ;
                                const parametersAux  = parameters[k as keyof Object] ;

                                if(comp3 === parametersAux.toString() ){
                                    photoFind.push(values);
                                }
                                break;
                            case "string" :
                                const comp31: string = val33 ;
                                const parametersAux1  = parameters[k as keyof Object] ;
                                if(comp31.includes(parametersAux1.toString()) ){
                                    photoFind.push(values);
                                }
                                break;
                            }

                        break;
                    case "album.user.address.geo" :
                        const val4 = values["album" as keyof  Photo];
                        const val41 = val4["user" as keyof typeof val4];
                        const val42 = val41["address" as keyof typeof val41];
                        const val43 = val42["geo" as keyof  typeof val42];
                        const val44 = val43[ k.substring( k.lastIndexOf('.')+ 1  ) as keyof typeof val43];
                        
                        switch(typeof(val44)){
                            case "number" :
                                const comp4: string = val44 ;
                                const parametersAux  = parameters[k as keyof Object] ;

                                if(comp4 === parametersAux.toString() ){
                                    photoFind.push(values);
                                }
                                break;
                            case "string" :
                                const comp41: string = val44 ;
                                const parametersAux1  = parameters[k as keyof Object] ;
                                if(comp41.includes(parametersAux1.toString()) ){
                                    photoFind.push(values);
                                }
                                break;
                            }

                        break;
                }
            })
        
            allAlbums = [];
            photoFind.forEach(val => allAlbums.push(Object.assign({}, val)));
        }

        //if(limitExceed ){
        //    break;
        //}

    }

   

  if (!getAlbum) {
    return null!;
  }else {

    if(photoFind.length === 0 && Object.keys(parameters).length ===0 ){
        photoFind = getAlbum;
    }else if (photoFind.length === 0 && filterProperties === false){
        photoFind = getAlbum;
    }
    //console.log(offsetSearch + ' aaa ');

    //offsetSearch =47;

    if(offsetSearch == 0 && notLimit == false ){
        photoFind = photoFind.slice(offsetSearch,Number(offsetSearch)+Number(limit) );
    }else if( (Number(offsetSearch) + Number(limit) - 1) > allAlbums.length  && notLimit == false  ){
        photoFind = photoFind.slice(offsetSearch);
    }else if(notLimit == false ){
        
        photoFind = photoFind.slice(offsetSearch,Number(offsetSearch)+Number(limit));
    }


  }

  return photoFind;//getAlbum; 
}


    // {

//load json data into Albums arrays
function loadAlbums () : Photos{

    try {
        const data = fs.readFileSync("./Albums.json", "utf-8");
        let datas : Photos ;
        datas = JSON.parse(data);
        
        return datas;
      } catch (error) {
        console.log(`Error ${error}`)
        return {}
      }
}




