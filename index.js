const http = require('http');
const fs = require('fs');
const path = require('path');


const PORT = process.env.PORT || 4000;

const server = http.createServer((req,res)=>{
    let requestedUrl = req.url
    let filePath = path.join(__dirname,'public', requestedUrl === '/' ? 'index.html' : `${requestedUrl}`)
    let notFound = path.join(__dirname,'public','404.html');
    let ext = path.extname(requestedUrl)
    let contentType = {'Content-Type':''}



    fs.readFile(filePath,{encoding:'utf-8'},(err,data)=>{
        if(err){
            console.log('Page not found , Err: ',err)
            res.writeHead(404,{'Content-Type':'text/html'})
            fs.readFile(notFound,{encoding:'utf-8'},(error,content)=>{
                if(error) throw error
                res.end(content)
            })
            return
        }

            switch(ext){
                case '.html':
                    contentType['Content-Type'] = 'text/html'
                    break
                case '.css':
                    contentType['Content-Type'] = 'text/css'
                    break
                case '.js':
                    contentType['Content-Type'] = 'text/javascript'
                    break
                default:
                    contentType['Content-Type'] = 'text/html'
                    break
            }
    
            res.writeHead(200,contentType)
            res.end(data)
        
    })
})


server.listen(PORT,()=>{
    console.log('Server is up...')
})