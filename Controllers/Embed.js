"use strict";

const { Files, ProxyCache, Player } = require(`../Models`);
const { Alert, Google, Proxy } = require(`../Utils`);
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  try {
    let { slug } = req.params;
    let { q } = req.query;
    let where = {
      slug,
    };
    let data = {
      slug,
    };
    if (!slug) {
      return res.render("e_404", data);
    }
    let host = req.get("host");
    let referer = req.get("referer");
    let fetch_dast = req.get("sec-fetch-dest");

    if (fetch_dast != "iframe") {
      return res.render("e_404", data);
    }
    let players = await Player.Lists.findOne({
      where: {
        domain: host,
        active: 1,
      },
      include: [
        {
          raw: true,
          model: Player.Sets,
          as: "sets",
          attributes: ["name", "value"],
          required: false,
        },
      ],
    });

    if (!players) {
      return res.render("e_404", data);
    }

    let data_player = {};
    let sets = players?.sets;
    for (let key in sets) {
      if (sets.hasOwnProperty(key)) {
        if (sets[key]?.name != "") {
          data_player[sets[key]?.name] = sets[key]?.value;
        }
      }
    }
    //console.log(data_player);

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

    if (!row) {
      return res.render("e_404", data);
    }
    data.title = row?.title;
    data.host = host;
    data.jwplayer = {};
    let vdo_hls = row?.datas.filter((r) => {
      return r?.type == "video" && r;
    });

    if (!vdo_hls.length) {
      return res.render("e_process", data);
    }

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
      data.jwplayer.sources = [
        {
          file: link_m3u8,
          type: `application/vnd.apple.mpegurl`,
        },
      ];
    }

    /*if (!data.sources) {
      // error no sources
      return res.status(403).end();
    }*/

    data.jwplayer.tracks = [];
    if (thumbs_vtt.length && data_player?.preview_image == "1") {
      data.jwplayer.tracks.push({
        file: `//${host}/thumbs/${slug}.vtt`,
        kind: "thumbnails",
      });
    }
    data.jwplayer.key = "W7zSm81+mmIsg7F+fyHRKhF3ggLkTqtGMhvI92kbqf/ysE99"; //ITWMv7t88JGzI0xPwW8I0+LveiXX9SWbfdmt0ArUSyc=
    data.jwplayer.width = "100%";
    data.jwplayer.height = "100%";
    data.jwplayer.preload = "auto";
    data.jwplayer.primary = "html5";
    data.jwplayer.hlshtml = "true";
    data.jwplayer.controls = "true";
    if (data_player?.poster_url_image != "") {
      data.jwplayer.image = data_player?.poster_url_image;
    } else {
      data.jwplayer.image =
        row.duration > 0
          ? `//${host}/thumb/${slug}-${Math.floor(row.duration / 4)}.jpg`
          : "";
    }
    if (data_player?.show_video_title == "1") {
      data.jwplayer.title = row?.title;
    }
    if (data_player?.auto_play == "1") {
      data.jwplayer.autostart = "true";
    }
    if (data_player?.mute == "1") {
      data.jwplayer.mute = "true";
    }
    if (data_player?.repeat == "1") {
      data.jwplayer.repeat = "true";
    }
    if (
      data_player?.logo_url_image != "" &&
      data_player?.player_logo_status == "1"
    ) {
      data.jwplayer.logo = {
        file: data_player?.logo_url_image,
        link: data_player?.logo_url_website,
        hide: "true",
        position: data_player?.logo_position,
      };
    }
    if (data_player?.color != "") {
      data.jwplayer.skin = {
        controlbar: {
          iconsActive: data_player?.color,
        },
        timeslider: {
          progress: data_player?.color,
        },
        menus: {
          background: "#121212",
          textActive: data_player?.color,
        },
      };
      data.base_color = data_player?.color;
    } else {
      data.base_color = "rgba(255,255,255,0.8)";
    }
    if (players?.advert) {
      data.jwplayer.advertising = {
        client: "vast",
        schedule: [
          {
            offset: "pre",
            tag: `//${host}/${players?.slug}.xml`,
          },
        ],
      };
    }
    //console.log(data_player)

    let viewedAt = new Date().toISOString();
    let files_views = row?.views + 1;
    await Files.Lists.update(
      { views: files_views, viewedAt },
      { where: { id: row?.id }, silent: true }
    );
    return res.render("jwplayer", data);
  } catch (error) {
    // error 500
    console.log(error);
    return res.status(500).end();
  }
};
