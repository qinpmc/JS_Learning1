var net = require("net");

const server = net.createServer();
server.on('connection', (conn) => { 
	console.log("connection   ...");
});

server.listen(8080, () => {
	console.log("listening on port 3000")
});
	
server.on('listening', () => {
	console.log("listening2 on port 3000");
	
});
	
console.log("同步结束！");	
/*	
输出： 
	
*/
 