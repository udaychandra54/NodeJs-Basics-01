const fs= require('fs');

const requestHandler=(req,res)=>{
    const url= req.url;
    const method= req.method;

    if(url==='/'){
        res.write('<html>');
        res.write('<body>');
        res.write('<head><title>Basics Node Js</title></head>');
        res.write("<main><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Submit</button></form></main>")
        res.write('</body>')
        res.write('</html>');
        return res.end();
    }
    if(url==='/message' && method==='POST'){
        const body=[];
        req.on('data',(chunk)=>{
            body.push(chunk);
            console.log('enter');
        })
        return req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(message);
            fs.writeFile('message.txt',message,(err)=>{
                res.statusCode=302;
                res.setHeader('Location','/');
                return res.end();
            });
            
        })
       
    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<body>');
    res.write('<head><title>Basics Node Js</title></head>');
    res.write('<main><h1>Hello Node Js</h1></main>')
    res.write('</body>')
    res.write('</html>');
    return res.end();
}

exports.handler= requestHandler;