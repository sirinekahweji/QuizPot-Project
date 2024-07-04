const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const validator = require('validator')


const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    password:{
        type:String,
        required:true
    }

})

//static signup methode
userSchema.statics.signup = async function (name,email,password){
    
    //validation
    if(!email || !password || !name)
        {
            throw Error('All fields must be filled')
        }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not Strong enough')

    }
    const exists = await this.findOne({email});
    if( exists)
        {
           throw Error('Email already in use');
        }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);

    const user = await this.create({email,password:hash});
    return user;

}

//static signin methode
userSchema.statics.signin = async function (email,password){

     if(!email || !password)
        {
            throw Error('All fields must be filled')
        }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }

    const user = await this.findOne({email});
    if( !user)
        {
           throw Error('Incorrect Email');
        }
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        throw Error('Incorrect Password')
    }
    return user;


    }



module.exports = mongoose.model('User', userSchema);

