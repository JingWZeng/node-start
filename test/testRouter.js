function route(handler, pathname, res, req) {
  console.log("About to route a request for  " + pathname);
  if (typeof handler[pathname] === "function") {
    return handler[pathname](res, req);
  } else {
    console.log("该路径没有对应的处理程序");
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("404 Not found");
    res.end();
  }
}
exports.route = route;
