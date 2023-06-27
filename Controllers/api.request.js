"use strict";
const request = require("request");

const { Files, Player } = require(`../Models`);
const { Google, Allow, Generate, getSets } = require(`../Utils`);

module.exports = async (req, res) => {
  try {
    let { title, source, token } = req.body;
    if (!source || !token) return res.json({ status: false, msg: "invalid" });
    // check token
    let play = await Player.Lists.findOne({
      where: {
        api_key: token,
      },
    });

    if (!play) return res.json({ status: false, msg: "not_exists" });
    if (!play?.active) return res.json({ status: false, msg: "api_disable" });
    if (!play?.userId) return res.json({ status: false, msg: "demo_api" });
    if (play?.domain != req.get("host"))
      return res.json({ status: false, msg: "domain_not_match" });

    let allow = Allow.Files(source);
    if (!allow?.status)
      return res.json({ status: false, msg: "not_supported" });

    // find file
    let where = {};
    where.type = allow?.type;
    where.source = allow?.source;
    where.userId = play?.userId;
    let file = await Files.Lists.findOne({
      where,
      attributes: ["id", "slug", "title"],
    });

    if (file?.slug) {
      return res.json({
        status: "success",
        cache: true,
        embed_url: `https://${play?.domain}/embed/${file?.slug}/`,
        slug: `${file?.slug}`,
        title: `${file?.title}`,
      });
    } else {
      let data = {
        userId: where.userId,
        type: where.type,
        source: where.source,
        title: title,
        slug: await Generate.file_slug(),
      };
      if (allow?.type == "gdrive") {
        //let drive_info = await Google.Info(data);
        let drive_info = {
          error: true,
        };
        if (drive_info?.error) {
          // with source

          let gSource = await Google.Source(data);
          if (!gSource?.status || gSource?.error_code) {
            if (gSource?.error_code) {
              let e_code = gSource?.error_code || 333;
              return res.json({
                status: false,
                msg: "video_error",
                e_code,
              });
            } else {
              return res.json({
                status: false,
                msg: drive_info.error.message,
              });
            }
          } else {
            if (!data?.title) {
              data.title = gSource?.title;
            }
          }
          /*return res.json({
            status: false,
            msg: drive_info.error.message,
          });*/
        }
        if (drive_info?.fileSize) {
          data.size = drive_info?.fileSize;
        }
        if (drive_info?.videoMediaMetadata?.durationMillis) {
          data.duration = Math.floor(
            drive_info?.videoMediaMetadata?.durationMillis / 1000
          );
        }

        if (!data?.title) {
          data.title = drive_info?.title;
        }
      } else {
        if (!data?.title) {
          data.title = allow?.title;
        }
      }

      let db_create = await Files.Lists.create(data);
      if (db_create?.id) {
        console.log("create", data?.source);
        return res.json({
          status: "success",
          embed_url: `https://${play?.domain}/embed/${db_create?.slug}/`,
          slug: `${db_create?.slug}`,
          title: `${db_create?.title}`,
        });
      } else {
        return res.json({ status: false, msg: `db_err` });
      }
    }
  } catch (error) {
    console.log("catch", error);
    return res.json({ status: false, msg: error.name });
  }
};
