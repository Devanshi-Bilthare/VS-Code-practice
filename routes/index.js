var express = require('express');
var router = express.Router();
var fs = require('fs')
var path = require('path')

const uploadPath = path.join(__dirname,'../','public','uploads')
// console.log(__dirname)

// fs.writeFileSync('script.css','')
//  fs.writeFileSync(filePath,'')

function readUploads(){
  return fs.readdirSync(uploadPath)
}


/* GET home page. */
router.get('/', function(req, res, next) {
  // const readUploads = fs.readdirSync(uploadPath)
  res.render('index',{readUploads : readUploads(),fileData:'',filename:''});
});


// Post create route 
router.post('/createFile',function(req,res){
  // const createFile = req.body.createFile
  // const createFolderr = req.body.createFolder

  // var {createFile, createFolder} = req.body

  const {createFile} = req.body
  fs.writeFileSync(path.join(uploadPath,createFile),'')

  // res.send(createFolder)
  res.redirect(`/${createFile}`)
})


router.get('/:filename',function(req,res){
  const {filename} = req.params

  const fileData = fs.readFileSync(path.join(uploadPath,filename),'utf8')
  // console.log(fileData.toString())
  res.render('index',{readUploads:readUploads(),fileData,filename})
})

router.get('/delete/:filename',function(req,res){
  const {filename} = req.params
  fs.unlinkSync(path.join(uploadPath,filename))

  res.redirect('/')
})

router.post('/update/:filename',function(req,res){
  const {filename} = req.params
  const {updateData} = req.body

  // fs.appendFileSync(path.join(uploadPath,filename),updateData)
  fs.writeFileSync(path.join(uploadPath,filename),updateData)

  res.redirect(`/${filename}`)
})

module.exports = router;
