// var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");
function start(res) {
  console.log("开始的处理程序");
  // var content = "empty";

  //   exec(
  //     "find /",
  //     { timeout: 10000, maxBuffer: 20000 * 1024 },
  //     function (error, stdout, stderr) {
  //       res.writeHead(200, { "Content-Type": "text/plain" });
  //       res.write(stdout);
  //       res.end();
  //     }
  //   );
  //   return content;
  var body =
    "<html>" +
    "<head>" +
    '<meta http-equiv="Content-Type" ' +
    'content="text/html; charset=UTF-8" />' +
    "</head>" +
    "<body>" +
    '<form action="/upload" enctype="multipart/form-data" ' +
    'method="post">' +
    '<input type="file" name="upload">' +
    '<input type="submit" value="Upload file" />' +
    "</form>" +
    "</body>" +
    "</html>";
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(body);
  res.end();
}

function upload(res, req) {
  console.log("上传的处理程序");
  var form = new formidable.IncomingForm();
  form.parse(req, function (error, fields, files) {
    fs.renameSync(files.upload.path, "/tmp/test.png");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("received image:<br/>");
    res.write("<img src='/show' />");
    res.end();
  });
}

function show(res) {
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.png", "binary", function (error, file) {
    if (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.write(error + "\n");
      res.end();
    } else {
      res.writeHead(200, { "Content-Type": "image/png" });
      res.write(file, "binary");
      res.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
