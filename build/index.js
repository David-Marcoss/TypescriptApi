"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
server_1.app.listen(3000, () => {
    console.log("Start serever in port 3000 ...");
});
