/**
 * Created by asus on 2017/8/6.
 */

var expres=require('express')
var bodyParser=require('body-parser')
var student=require('./mydb')

var app=expres()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(expres.static('www'))

// Allow cross-domain access／／／
app.all('/api/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'x-Request-with')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', '4.15.2')
    res.header('Content-Type', 'application/json;charset=utf-8')
    next()   //Execute the next middleware
})

//Home page to get data
app.post('/index',function (req,res) {
    //mongoose Data lookup
    student.find({}).exec(function (error,data) {
        if (error){
            console.log('Data acquisition failed'+error)
        }
        else{
            res.json({
                status:'y',
                message:'search successful',
                //Pass the returned data
                data:data
            })
        }
    })
})

//Modify page Get data
app.post('/modify',function (req,res) {
    //mongoose Find by condition
    student.find({_id: req.body.id}).exec(function (error,data) {
        console.log('2')
        if (error){
            console.log('Data acquisition failed'+error)
        }
        else{
            console.log(data)
            res.json({
                status:'y',
                message:'search successful',
                data:data
            })
            console.log(4)
        }
    })
})

//Modify the commit modification database
app.post('/modifyStu',function (req,res) {
    console.log('1')
    console.log(req.body)
    //Query conditions
    var whereStr={_id:req.body.id}
    //Updated content
    var updateStr={
        $set:{
            name:req.body.name,
            sex:req.body.sex,
            age: req.body.age,
            phone:req.body.phone,
            email:req.body.email,
            other:req.body.other,

        }
    }
    //Update the database
    student.update(whereStr,updateStr,function (error) {
        if (error){
            console.log('Data modification failed:'+error)
            res.json({
                status:'y',
                message:'fail to edit',
                data:req.body
            })
        }
        else{
            console.log('Data modification succeeded')
            res.json({
                status:'y',
                message:'Successfully modified',
                data:req.body
            })
        }
    })
})

//Delete items in the database
app.post('/del',function (req,res) {
    //mongoose Delete according to specified conditions
    student.remove({_id: req.body.id},function(error){
        if (error){
            console.log('Data acquisition failed'+error)
            res.json({
                status:'y',
                message:'Delete is not successful',
            })
        }
        else{
            res.json({
                status:'y',
                message:'successfully deleted',
            })
        }
    })
})

//Navigation bar search operation
app.post('/findName',function (req,res) {
    console.log(req.body.searchName)
    student.find({name: req.body.searchName}).exec(function (error,data) {
        if (error){
            console.log('Query failed'+error)
            res.json({
                status:'y',
                message:'Query failed',
            })
        }
        else{
            res.json({
                status:'y',
                message:'search successful',
                data:data
            })
        }
    })
})

//Add database operation
app.post('/addStu',function (req,res) {
    console.log(req.body)
    //Instantiate one student
    var newStu=new student({
        name:req.body.name,
        sex:req.body.sex,
        age:req.body.age,
        phone:req.body.phone,
        email:req.body.email,
        other:req.body.other,

    })
    //Save the instantiated content
    newStu.save(function (error) {
        if (error){
            console.log('Data addition failed:'+error)
            res.json({
                status:'y',
                message:'add failed',
                data:req.body
            })
        }
        else {
            console.log('Data added successfully')
            res.json({
                status:'y',
                message:'Added successfully',
                data:req.body
            })
        }
    })
})

//Server listening port
app.listen(3000,()=>{
    console.log('node is ok')
})
