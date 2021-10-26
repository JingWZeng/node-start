var server = require("./test.js");
var route = require("./testRouter.js");
var handlerRequest = require("./testHandlers");

var handler = {};
handler["/"] = handlerRequest.start;
handler["/start"] = handlerRequest.start;
handler["/upload"] = handlerRequest.upload;
handler["/show"] = handlerRequest.show;
console.log(handler);
server.start(route.route, handler);
