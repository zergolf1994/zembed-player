"use strict";
const path = require("path");
const fs = require("fs-extra");
const request = require("request");
const { Files, Storage } = require(`../Models`);
const { Cache } = require(`../Utils`);

module.exports = async (req, res) => {
  try {
    const { slug, sec } = req.params;
    const ext = req.params[0];
    let cacheDir = path.join(global.dir, ".cache", slug),
      cacheFile = path.join(cacheDir, `${slug}-${sec}-image`),
      sv_ip,
      quality;

    if (fs.existsSync(cacheFile)) {
      let cache = fs.readFileSync(cacheFile);
      res.set("Content-Type", ext == "html" ? "text/html" : `image/${ext}`);
      res.set("cache-control", "public, max-age=31536000");
      res.set("S-Cache", "HIT");
      return res.status(200).end(cache);
    } else {
      let file = await Files.Lists.findOne({
        where: {
          slug,
        },
        attributes: ["id"],
        include: [
          {
            model: Files.Videos,
            as: "videos",
            attributes: ["storageId", "quality"],
            where: {
              active: 1,
            },
            required: true,
          },
        ],
      });

      if (!file) return res.status(404).end();

      let storageId = file?.videos[0]?.storageId;
      quality = file?.videos[0]?.quality;
      sv_ip = await Cache.GetStorage({ storageId: storageId });

      const url = `http://${sv_ip}:8889/thumb/${slug}/file_${quality}.mp4/thumb-${
        sec * 1000
      }-w400.jpg`;

      let buffers = [];
      let length = 0;
      request({ url }, (err, resp, body) => {})
        .on("response", function (res) {
          res.headers["content-type"] =
            ext == "html" ? "text/html" : `image/${ext}`;
          res.headers["Cache-control"] = "public, max-age=31536000";
        })
        .on("data", function (chunk) {
          length += chunk.length;
          buffers.push(chunk);
        })
        .on("end", function () {
          if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
          }
          if (!fs.existsSync(cacheFile)) {
            fs.writeFileSync(cacheFile, Buffer.concat(buffers), "utf8");
          }
        })
        .pipe(res);
    }
  } catch (error) {
    console.log(error);
    return res.status(403).end();
  }
};