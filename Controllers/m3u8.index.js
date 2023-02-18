"use strict";
const path = require("path");
const fs = require("fs-extra");
const request = require("request");
const os = require("os");

const { Files, Storage, Groupdomain } = require(`../Models`);
const { Cache } = require(`../Utils`);

module.exports = async (req, res) => {
  try {
    const { slug, quality } = req.params;
    if (!slug) return res.status(404).end();
    let cacheDir = path.join(global.dir, ".cache", "m3u8", "index"),
      cacheFile = path.join(cacheDir, `${slug}-${quality}`),
      data;

    if (fs.existsSync(cacheFile)) {
      let file_read = fs.readFileSync(cacheFile, "utf8");
      data = JSON.parse(file_read);
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
              type: "video",
              name: quality,
            },
            required: true,
          },
        ],
      });

      if (!file) return res.status(404).end();

      const video = file?.datas[0];
      let storageId = video?.storageId;
      let file_name = video?.value;

      let sv_ip = await Cache.GetStorage({ storageId: storageId });

      const url = `http://${sv_ip}:8889/hls/${slug}/${file_name}/index.m3u8`;
      data = await getRequest(url);
      if (data != undefined) {
        if (!fs.existsSync(cacheDir)) {
          fs.mkdirSync(cacheDir, { recursive: true });
        }
        fs.writeFileSync(cacheFile, JSON.stringify(data), "utf8");
      }
    }

    let domain = await Groupdomain.findOne({
      raw: true,
      where: {
        type: "cloudflare",
        active: 1,
      },
      attributes: ["id", "domain_list"],
      order: [["count_used", "ASC"]],
    });
    if (!domain) return res.status(404).end();
    let m3u8 = await M3U8({
      domain: domain?.domain_list.split(/\r?\n/),
      data,
      slug,
      quality,
    });

    res.set("content-type", "application/x-mpegURL");
    return res.status(200).end(m3u8);
  } catch (error) {
    console.log(error);
    return res.status(403).end();
  }
};
function M3U8({ domain, data, slug, quality }) {
  try {
    return new Promise(function (resolve, reject) {
      const array = [];
      let start = 0,
        end = domain?.length - 1;

      data.forEach((k, i) => {
        if (isNaN(k)) {
          if (!k.match(/EXT-X-MAP:URI=(.*?)-/gm)) {
            array.push(k);
          }
        } else {
          array.push(`//${domain[start]}/${slug}/${quality}-${k}.png`);
          if (start == end) {
            start = 0;
          } else {
            start++;
          }
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
        if (response.statusCode == 200) {
          const array = [],
            html = body.split(/\r?\n/),
            regex = /seg-(.*?)-/gm;

          html.forEach((k, i) => {
            if (k.match(regex)) {
              let nameitem = k.match(regex);
              let numitem = nameitem
                .toString()
                .replace("seg-", "")
                .replace("-", "")
                .replace(".ts", "")
                .replace("-v1", "")
                .replace("-a1", "");
              array.push(numitem);
            } else {
              if (k) {
                array.push(k.trim());
              }
            }
          });

          resolve(array);
        } else {
          resolve();
        }
      });
    });
  } catch (error) {
    return;
  }
}
