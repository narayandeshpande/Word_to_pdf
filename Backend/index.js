const express = require('express')
const multer  = require('multer')
const docxToPDF = require('docx-pdf');
const path=require("path");
const cors=require("cors")

const app = express()
const port = 3000
app.use(cors())
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

  app.post('/convertFile', upload.single('file'),  (req, res, next)=> {
    try {
        if (!req.file) {
            return res.status(400).json({
                message:"No file | uploded"
            })
        }
        let outputPath=path.join(__dirname,"file",`${req.file.originalname}.pdf`)
        docxToPDF(req.file.path,outputPath,(err,result)=>{
            if(err){
              console.log(err);
              res.status(500).json({
                message:"Error converting docx to PDF"
              })
            }
            res.download(outputPath,()=>{
                console.log("file downloaded");
            })
            console.log('result'+result);
          });
    } catch (error) {
        res.status(500).json({
            message:"Internal error"
        })
        console.log(error);
    }
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})