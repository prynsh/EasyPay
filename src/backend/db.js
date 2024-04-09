import mongoose  from 'mongoose';
mongoose.connect("mongodb+srv://prynsh:Priyal2112@cluster0.vi5pepe.mongodb.net/Paytm");
//(firstName, lastName, password).
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxLength:30,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxLength:30,
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    }
})

const User=mongoose.model('User',userSchema);
module.exports={User};