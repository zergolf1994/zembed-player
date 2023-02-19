"use strict";

const { Files, ProxyCache } = require(`../Models`);
const { Alert, Google, Proxy } = require(`../Utils`);
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  try {
    let { slug } = req.params;
    let { q } = req.query;
    if (!slug) {
      // error no slug
      return res.status(404).end();
    }
    let host = req.get("host");
    let where = {
      slug,
    };
    let data = {
      slug,
    };
    let row = await Files.Lists.findOne({
      where,
      include: [
        {
          model: Files.Datas,
          as: "datas",
          where: { active: 1 },
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

    let vdo_hls = row?.datas.filter((r) => {
      return r?.type == "video" && r;
    });
    let thumbs_vtt = row?.datas.filter((r) => {
      return r?.type == "thumbs" && r;
    });
    if (vdo_hls.length) {
      let link_m3u8;
      if (["1080", "720", "480", "360"].includes(q)) {
        link_m3u8 = `//${host}/${slug}/${q}-m3u8/_`;
      } else {
        link_m3u8 = `//${host}/${slug}/master-m3u8/0`;
      }
      data.sources = {
        file: link_m3u8,
        type: `application/vnd.apple.mpegurl`,
      };
    }
    if (!data.sources) {
      // error no sources
      return res.status(403).end();
    }
    data.tracks = [];
    if (thumbs_vtt.length) {
      data.tracks.push({
        file: `//${host}/thumbs/${slug}.vtt`,
        kind: "thumbnails",
      });
    }

    data.title = row?.title;
    data.host = host;
    data.image =
      row.duration > 0
        ? `//${host}/thumb/${slug}-${Math.floor(row.duration / 4)}.jpg`
        : "";
    return res.render("player", data);
  } catch (error) {
    // error 500
    console.log(error);
    return res.status(500).end();
  }
};
