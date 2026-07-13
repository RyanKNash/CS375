const http = require("http");

const port = Number(process.env.PORT) || 3000;
const energyUsageByDevice = new Map();

function sendJson(response, statusCode, value) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(value));
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function sendSummaryPage(response) {
  const rows = Array.from(energyUsageByDevice, ([deviceId, readings]) => {
    const total = readings.reduce((sum, reading) => sum + reading, 0);
    const style = total > 1000 ? ' style="background-color: red;"' : "";

    return `      <tr${style}><td>${escapeHtml(deviceId)}</td><td>${readings.join(", ")}</td></tr>`;
  }).join("\n");

  const html = `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>Device Energy Usage</title>
        <style>
          table {
            border: 2px solid black;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
          }
        </style>
      </head>
      <body>
        <table>
          <thead>
            <tr><th>Device ID</th><th>Energy Usage</th></tr>
          </thead>
          <tbody>
    ${rows}
          </tbody>
        </table>
      </body>
    </html>`;

  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  response.end(html);
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";

    request.setEncoding("utf8");
    request.on("data", (chunk) => {
      body += chunk;
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    request.on("error", reject);
  });
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);

  if (request.method === "GET" && url.pathname === "/") {
    sendSummaryPage(response);
    return;
  }

  const match = url.pathname.match(/^\/api\/([^/]+)$/);
  if (!match) {
    sendJson(response, 404, { error: "Not found" });
    return;
  }

  let deviceId;
  try {
    deviceId = decodeURIComponent(match[1]);
  } catch {
    sendJson(response, 400, { error: "Invalid device ID" });
    return;
  }

  if (request.method === "POST") {
    try {
      const data = await readJsonBody(request);
      const reading = data && data["energy-usage"];

      if (
        typeof data !== "object" ||
        Array.isArray(data) ||
        !Number.isInteger(reading)
      ) {
        sendJson(response, 400, { error: "Invalid energy usage data" });
        return;
      }

      const readings = energyUsageByDevice.get(deviceId) || [];
      readings.push(reading);
      energyUsageByDevice.set(deviceId, readings);
      sendJson(response, 200, { status: "stored" });
    } catch {
      sendJson(response, 400, { error: "Invalid JSON" });
    }
    return;
  }

  if (request.method === "GET") {
    const readings = energyUsageByDevice.get(deviceId);
    if (!readings) {
      sendJson(response, 404, { error: "Device Not Found" });
      return;
  }

    sendJson(response, 200, { "total-energy-usage": readings });
    return;
  }

  sendJson(response, 405, { error: "Method not allowed" });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = server;
