const express =require("express");
var cors= require("cors");
const app= express()
const port=3000;
const MainRouter= require("./routes/index");

app.use(cors())
app.use("/api/v1", MainRouter);

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`)
})