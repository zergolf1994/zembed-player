"use strict";

const { Files, ProxyCache } = require(`../Models`);
const { Alert, Google, Proxy } = require(`../Utils`);
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  try {
    let { slug } = req.params;
    let { json } = req.query;
    if (!slug) return res.status(404).end();
    let host = req.get("host");
    let where = {
      slug,
    };
    let data = {
      slug,
    };

    let row = await Files.Lists.findOne({
      attributes: ["id", "title", "type", "source", "duration"],
      where,
      include: [
        {
          model: Files.Videos,
          as: "videos",
          attributes: ["quality", "storageId"],
          required: false,
        },
        {
          model: Files.Backups,
          as: "backups",
          attributes: ["type", "quality", "source"],
          required: false,
        },
        {
          model: Files.Sets,
          as: "sets",
          attributes: ["name", "value"],
          required: false,
        },
      ],
    });
    if (row.videos.length) {
      data.sources = row.videos
        .map((e) => {
          if (["360", "480", "720", "1080", "default"].includes(e?.quality))
            return {
              file: `//${host}/${slug}/${e?.quality}-m3u8`,
              type: `application/vnd.apple.mpegurl`,
            };
        })
        .filter((element) => {
          return element !== undefined;
        });
    } else if (!row.videos.length && row.type == "gdrive") {
      let ProxyVideo = await Proxy.Cache(row);

      switch (ProxyVideo) {
        case "time_over":
          ProxyVideo = await Proxy.Google(row);
          break;
        case "not_cache":
          ProxyVideo = await Proxy.Google(row);
          break;

        default:
          break;
      }
      data.sources = ProxyVideo.map((e) => {
        if (["360", "480", "720", "1080"].includes(e?.name))
          return {
            file: `//proxy.zembed.xyz/proxy/${e?.id}.mp4`,
            label: `${e?.name}p`,
            type: `video/mp4`,
          };
      }).filter((element) => {
        return element !== undefined;
      });
      /*data.sources = [
        {
          file: `//cdn.jwplayer.com/manifests/GQlE6Rqd.m3u8`,
          type: `application/vnd.apple.mpegurl`,
        },
      ];*/
    } else if (row.backups.length && row.type == "upload") {
      data.sources = row.backups
        .map((e) => {
          if (["360", "480", "720", "1080", "default"].includes(e?.quality))
            return {
              file: `//backup.zembed.xyz/${e?.source.replace(
                "/home/public/",
                ""
              )}`,
              label: `${e?.name}p`,
              type: `video/mp4`,
            };
        })
        .filter((element) => {
          return element !== undefined;
        });
    }
    if (!data.sources) {
      return res.status(403).end();
    }
    data.title = row?.title;
    data.host = host;
    data.image =
      row.duration > 0 ? `//${host}/thumb/${slug}-${row.duration / 2}.jpg` : "";
    /*if (json) {
      return res.json(data);
    }*/
    return res.render("player", data);
  } catch (error) {
    return res.status(403).end();
  }
};
