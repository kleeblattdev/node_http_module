import http from 'http'
import fs from 'fs'

const sendFile = (path, res) =>{
    fs.readFile (path, (err, data) =>{
        
        if (err){
            res.writeHead(500)
            res.end()
            return
        }

        if (path.includes('.jpeg')){
            res.writeHead(200, {contentType: 'image/jpeg'})
            res.end(data)
            return
        }

        res.writeHead(200, {contentType: 'text/html', charset: 'utf8'})
        res.write(data)
        res.end()
    })
}


const reqHandler =(req,res) =>{
    console.log('Neuer Request:', req.method, req.url)

    if(req.url === '/'){
        sendFile('./assets/html/index.html',res)
        return
    } else if (req.url === '/assets/css/style.css'){
        sendFile('./assets/css/style.css',res)
    } 
    else{
        const filePath = './assets/html/' + req.url
        sendFile(filePath, res)
    }
    
}

//create a server object
const server = http.createServer(reqHandler)
server.listen(8080)

