const cp = require("child_process");
const modulePath = `${__dirname}/worker.js`;

const data = require("../resources/data.json");

(async function main() {
  for (const item of [data][0]) {
    const worker = cp.fork(modulePath, []);
    worker.on("message", (msg) => console.log("message caught on parent", msg));
    worker.on("error", (msg) => console.log("error caught on parent", msg));

    worker.send(item);
  }
})();
