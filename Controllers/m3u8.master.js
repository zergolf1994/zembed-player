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

    let video_lists = file?.videos;
    let quality_array = ["#EXTM3U","#EXT-X-VERSION:5","#EXT-X-INDEPENDENT-SEGMENTS"];
    for (const key in video_lists) {
      if (video_lists.hasOwnProperty.call(video_lists, key)) {
        const video = video_lists[key];
        let quality = video?.quality;
        let cacheDir = path.join(global.dir, ".cache", slug),
          cacheFile = path.join(cacheDir, `master-${quality}`);
        if (!fs.existsSync(cacheFile)) {
          if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
          }
          let sv_ip = await Cache.GetStorage({ storageId: video?.storageId });
          const url = `http://${sv_ip}:8889/hls/${slug}/file_${quality}.mp4/master.m3u8`;
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
          array.push(k);
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
        if (response.statusCode == 200) {
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
