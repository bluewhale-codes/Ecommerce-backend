const connectDataBase = require("./db");
const app = require("./index");
const cloudinary = require('cloudinary')
const port = 4000;

// Handling Uncaught Exception;
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting Down the server Due to uncaught Exception");
    process.exit(1);
})

// console.log(Youtube)
app.listen(port,()=>{
    console.log(`server is working on  http://localhost:${port}`)
}) 

//connect to data base;
connectDataBase();
cloudinary.config({
    cloud_name:"dycjjaxsk",
    api_key:"325247431186386",
    api_secret:"WEMuN15iF5KQYEeUXyJX0ES-KUA",
})
