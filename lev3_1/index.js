import http from 'http'
import fs from 'fs'

const sendFile = (path, res) =>{
    fs.readFile (path, (err, data) =>{
        
        if (err){
            console.log(err)
            res.writeHead(500)
            res.end()
            return
        }

        if (path.includes('.jpeg')){
            console.log(data)
            res.writeHead(200, {'Content-Type': 'image/jpeg'})
            res.end(data)
            return
        } else if (path.includes('.ttf')){
            res.writeHead(200, {'Content-Type': 'font/ttf'})
            res.end(data)
            return
        }else{
            res.writeHead(200, {'Content-Type': 'text/html', 'charset': 'utf8'})
            res.write(data)
            res.end()
        }

    })
}


const reqHandler =(req,res) =>{
    console.log('Neuer Request:', req.method, req.url)

    if(req.url === '/'){
        sendFile('./assets/html/index.html',res)
        return
    } else if (req.url === '/style.css'){
        sendFile('./assets/html'+ req.url,res)
    } 
    else if(req.url.includes('.html')){
        const filePath = './assets/html' + req.url
        sendFile(filePath, res)
    }
    else if(req.url.includes('.ico')){
        res.end()
    }
    else{
        const filePath = './assets' + req.url
        sendFile(filePath, res)
    }
    
}

//create a server object
const server = http.createServer(reqHandler)
server.listen(8080)

