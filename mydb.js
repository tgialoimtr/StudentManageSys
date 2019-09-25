/**
 * Created by asus on 2017/8/6.
 */

var mongoose=require('mongoose')

//Database connection address Link to myStudent database
var DB_URL='mongodb://localhost:27017/myStudent'
//Database Connectivity
mongoose.connect(DB_URL)

//Successful connection terminal displays a message
mongoose.connection.on('connected',function () {
    console.log('mongoose connection open to '+DB_URL)
})
//Connection failed terminal display message
mongoose.connection.on('error',function () {
    console.log('mongoose error ')
})
//Connection disconnected terminal display message
mongoose.connection.on('disconnected',function () {
    console.log('mongoose disconnected')
})

//Create a schema
//Each schema will correspond to the collection in mongo
var schema=mongoose.Schema

//Instantiate a Schema
var studentSchema=new schema(
    {
        //Set the data format of the studentSchema information
        name:{type:String},
        sex:{type:String},
        age:{type:Number},
        phone:{type:String},
        email:{type:String},
        other:{type:String},
    },
    //{versionKey: false}Why use it? If you don't add this setting, we will create a collection for the first time through mongoose.
    // It will set a versionKey property value for this collection, we don't need it, so don't let it show
    {
        versionKey:false
    }
)

//Generate a specific user model and export
//The first parameter is the collection name, which is automatically added in the database.
//Change the name of the Model name to lowercase and add the plural s after it.
var student=mongoose.model('student',studentSchema)
//Export the student's model
module.exports=student
