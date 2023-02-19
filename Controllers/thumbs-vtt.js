"use strict";
const path = require("path");
const fs = require("fs-extra");
const request = require("request");
const { Files, Servers } = require(`../Models`);
const { Cache } = require(`../Utils`);

module.exports = async (req, res) => {
  try {
    const { slug, sec } = req.params;
    const ext = req.params[0];
    let cacheDir = path.join(global.dir, ".cache", "thumbs"),
      cacheFile = path.join(cacheDir, `${slug}-thumbs`),
      sv_ip,
      quality;

    if (fs.existsSync(cacheFile)) {
      let cache = fs.readFileSync(cacheFile, "utf8");
      res.set("Content-Type", `text/plain`);
      res.set("cache-control", "public, max-age=31536000");
      return res.status(200).end(cache.replace(/thumbs/g, slug));
    } else {
      let file = await Files.Lists.findOne({
        where: {
          slug,
        },
        attributes: ["id"],
        include: [
          {
            model: Files.Datas,
            as: "datas",
            where: {
              active: 1,
              type: "thumbs",
            },
            required: true,
          },
        ],
      });

      if (!file) return res.status(404).end("");

      let thumbs_vtt = file?.datas.filter((r) => {
        return r?.type == "thumbs" && r;
      });
      let serverId = thumbs_vtt[0]?.storageId;
      let file_name = thumbs_vtt[0]?.value;
      sv_ip = await Cache.GetServer({ serverId: serverId });

      const url = `http://${sv_ip}/thumbs/${slug}/thumbs.vtt`;

      let buffers = [];
      let length = 0;
      request({ url }, (err, resp, body) => {})
        .on("response", function (res) {
          res.headers["content-type"] = `text/plain`;
          res.headers["Cache-control"] = "public, max-age=31536000";
        })
        .on("data", function (chunk) {
          length += chunk.length;
          buffers.push(chunk);
        })
        .on("end", function () {
          if (res?.statusCode == 200) {
            if (length) {
              let cache = Buffer.concat(buffers);
              if (!fs.existsSync(cacheDir)) {
                fs.mkdirSync(cacheDir, { recursive: true });
              }
              if (!fs.existsSync(cacheFile)) {
                fs.writeFileSync(cacheFile, cache, "utf8");
              }
            }
          }
        })
        .pipe(res);
    }
  } catch (error) {
    console.log(error);
    return res.status(403).end();
  }
};
