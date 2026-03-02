const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

app.post("/receive", (req, res) => {
    const message = req.body.message || "";
    const match = message.match(/\d{4,6}/);
    const code = match ? match[0] : "no_code";
    fs.writeFileSync("latest.txt", code);
    res.json({ status: "saved", code });
});

app.get("/", (req, res) => {
    res.send("API Running");
});

app.get("/latest.txt", (req, res) => {
    if (fs.existsSync("latest.txt")) {
        res.sendFile(__dirname + "/latest.txt");
    } else {
        res.send("no_code");
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server started");
});
