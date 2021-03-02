const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head>");
    res.write("<title>Hello</title>");
    res.write("</head>");
    res.write("<body>");
    res.write("<h1>Another page</h1>");
    res.write(
      '<form action="/message" method="POST"><input type="text" name="message"> <button type="submit">Send</button></form>'
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method == "POST") {
    const body = [];
    req.on("data", (dataChunk) => {
      console.log(dataChunk);
      body.push(dataChunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log("Parsed body:");
      console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head>");
  res.write("<title>Hello</title>");
  res.write("</head>");
  res.write("<body>");
  res.write("<h1>Do you wanna build a snowman?");
  res.write("</h1>");
  res.write("</body>");
  res.write("</html>");
  res.end();
};

module.exports = requestHandler;
