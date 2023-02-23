"use strict";
const path = require("path");
const fs = require("fs-extra");
const request = require("request");
const os = require("os");

const { Files, Storage, GroupDomain } = require(`../Models`);
const { Cache } = require(`../Utils`);

module.exports = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) return res.status(404).end();

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
            type: "video",
          },
          required: true,
        },
      ],
    });
    if (!file) return res.status(404).end();

    let vdo_hls = file?.datas.map((r) => {
      return r?.type == "video" && r;
    });

    let quality_array = [
      "#EXTM3U",
      "#EXT-X-VERSION:5",
      "#EXT-X-INDEPENDENT-SEGMENTS",
    ];
    for (const key in vdo_hls) {
      if (vdo_hls.hasOwnProperty.call(vdo_hls, key)) {
        const video = vdo_hls[key];
        let storageId = vdo_hls[key]?.storageId;
        let quality = vdo_hls[key]?.name;
        let file_name = vdo_hls[key]?.value;

        let cacheDir = path.join(global.dir, ".cache", "m3u8", "master"),
          cacheFile = path.join(cacheDir, `${slug}-${quality}`);

        if (!fs.existsSync(cacheFile)) {
          if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
          }
          let sv_ip = await Cache.GetStorage({ storageId: video?.storageId });
          const url = `http://${sv_ip}:8889/hls/${slug}/${file_name}/master.m3u8`;
          let data = await getRequest(url);
          if (data != undefined) {
            let getMaster = await M3U8Master({
              domain: req.get("host"),
              data,
              slug,
              quality,
            });
            fs.writeFileSync(cacheFile, JSON.stringify(getMaster), "utf8");
            quality_array.push(getMaster);
          }
        } else {
          let file_read = fs.readFileSync(cacheFile, "utf8");
          let getMaster = JSON.parse(file_read);
          quality_array.push(getMaster);
        }
      }
    }
    if (quality_array.length <= 3) return res.status(404).end();
    res.set("content-type", "application/x-mpegURL");
    return res.status(200).end(quality_array.join(os.EOL));
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};
function M3U8Master({ domain, data, slug, quality }) {
  try {
    return new Promise(function (resolve, reject) {
      const array = [];
      data.forEach((k, i) => {
        if (k.match(/EXT-X-STREAM-INF(.*?)-/gm)) {
          let check = k.split(","),
            newArray = [];
          check.forEach((a, ii) => {
            if (a.match(/RESOLUTION=(.*?)/gm)) {
              const resol = /RESOLUTION=([\w\-]{1,200})x([\w\-]{1,200})$/i;
              const match = a.match(resol)
              newArray.push(`RESOLUTION=${match[1]}x${quality}`);
            } else {
              newArray.push(a);
            }
          });
          array.push(newArray.join());
          array.push(`//${domain}/${slug}/${quality}-m3u8/_`);
        }
      });
      resolve(array.join(os.EOL));
    });
  } catch (error) {
    return;
  }
}
function getRequest(url) {
  try {
    return new Promise(function (resolve, reject) {
      request(url, function (err, response, body) {
        if (response?.statusCode == 200) {
          const array = [],
            html = body.split(/\r?\n/),
            regex = /seg-(.*?)-/gm;
          resolve(html);
        } else {
          resolve();
        }
      });
    });
  } catch (error) {
    return;
  }
}
