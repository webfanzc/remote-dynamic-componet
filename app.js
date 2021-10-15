const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { promisify } = require("util");
const { readFile, writeFile } = require("fs");
const { spawn } = require("./spawn");

const app = express();
const port = 3089;
const promisifyReadFile = promisify(readFile);
const promisifyWriteFile = promisify(writeFile);

app.use(express.static("./public"));
app.use(express.json({ extended: false }));
app.use(multer({ dest: "/public/components" }).array("file"));
app.use(cors());

app.get("/getRemoteComponent", async (req, res) => {
  res.setHeader("Content-Type", "text/javascript;charset=utf-8");

  try {
    const file = await promisifyReadFile("./customPack/dist/bundle.js");
    res.status(200);
    res.end(file);
  } catch (error) {
    console.log(error);
    res.end(JSON.stringify({ message: "文件读取失败" }));
  }
});
app.post("/uploadRemoteComponent", async (req, res) => {
  res.setHeader("Content-Type", "application/json;charset=utf-8");
  const filepath = __dirname + "/public/components/remoteComponent.vue";

  try {
    const file = await promisifyReadFile(req.files[0].path);
    await promisifyWriteFile(filepath, file);
    await spawn("yarn build", [], {});

    res.end(
      JSON.stringify({
        message: "上传成功",
      })
    );
  } catch (error) {
    console.log(error);
    res.end(
      JSON.stringify({
        message: "上传失败",
      })
    );
  }

  console.log(req.files[0]);
});

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
