var http = require("http");
var url = require("url");

function start(route, handler) {
  function onRequest(req, res) {
    // var postData = "";
    var pathname = url.parse(req.url).pathname;
    console.log(pathname);

    // req.setEncoding("utf8");
    // req.addListener("data", function (postDataChunk) {
    //   postData += postDataChunk;
    //   console.log("Received POST data chunk '" + postDataChunk + "'.");
    // });
    // req.addListener("end", function () {
    //   route(handler, pathname, res, postData);
    // });
    route(handler, pathname, res, req);
    // const content = route(handler, pathname);

    // res.writeHead(200, { "Content-Type": "text/plain" });
    // res.write(content);
    // res.end();
  }
  http.createServer(onRequest).listen(8000);

  console.log(`Serve has started`);
}

module.exports.start = start;
