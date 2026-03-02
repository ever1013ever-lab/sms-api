const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

const FILE = "latest.txt";

app.post("/receive", (req, res) => {

    const message = req.body.message || "";
    const match = message.match(/\d{4,6}/);
    const code = match ? match[0] : "no_code";

    fs.writeFileSync(FILE, code);

    res.json({ status: "saved", code });
});

/*
   讀取驗證碼
   讀完後自動清空
*/
app.get("/latest", (req, res) => {

    if (!fs.existsSync(FILE)) {
        return res.json({ code: null });
    }

    const code = fs.readFileSync(FILE, "utf8");

    // 🔥 讀完自動清空
    fs.writeFileSync(FILE, "");

    res.json({ code: code });
});

app.get("/", (req, res) => {
    res.send("API Running");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server started");
});
