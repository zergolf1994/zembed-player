"use strict";
const path = require("path");
const fs = require("fs-extra");
const request = require("request");
const os = require("os");
const { Sequelize, Op } = require("sequelize");

const { Files, Storage, Groupdomain, M3u8Cache } = require(`../Models`);
const { Cache, GDomain } = require(`../Utils`);

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
      if (!data?.groupdomainId) {
        let get_groupdomainId = await GDomain.IdCloudFlare({
          userId: data?.userId,
        });
        if (data?.groupdomainId != get_groupdomainId) {
          let update_cache_data = await Groupdomain.update(
            { groupdomainId: get_groupdomainId },
            { where: { id: data?.id } }
          );
          if (update_cache_data.length > 0) {
            await Groupdomain.update(
              { count_used: Sequelize.literal("count_used + 1") },
              { where: { id: get_groupdomainId } }
            );

            fs.unlinkSync(cacheFile);
          }
          data.groupdomainId = get_groupdomainId;
        }
      }
    } else {
      let file = await Files.Lists.findOne({
        where: {
          slug,
        },
        attributes: ["id", "userId"],
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

      // find cache db
      let where_cache = {
        type: "index",
        name: quality,
        fileId: file?.id,
        userId: file?.userId,
        storageId: storageId,
      };
      let db_cache = await M3u8Cache.findOne({
        raw: true,
        where: {
          ...where_cache,
        },
      });

      //console.log(where_cache, db_cache);
      if (db_cache) {
        data = db_cache;
        if (db_cache?.id) {
          if (!fs.existsSync(cacheDir)) {
            fs.mkdirSync(cacheDir, { recursive: true });
          }
          fs.writeFileSync(cacheFile, JSON.stringify(db_cache), "utf8");
        }
      } else {
        let sv_ip = await Cache.GetStorage({ storageId: storageId });

        const url = `http://${sv_ip}:8889/hls/${slug}/${file_name}/index.m3u8`;
        let data_html = await getRequest(url);
        if (data_html != undefined) {
          let data_cache_db = {
            type: "index",
            name: quality,
            fileId: file?.id,
            userId: file?.userId,
            storageId: storageId,
            groupdomainId: await GDomain.IdCloudFlare({ userId: file?.userId }),
            value: JSON.stringify(data_html),
          };

          data = await M3u8Cache.create(data_cache_db);
          if (data?.id) {
            if (data_cache_db?.groupdomainId) {
              await Groupdomain.update(
                { count_used: Sequelize.literal("count_used + 1") },
                { where: { id: data_cache_db?.groupdomainId } }
              );
            }
            if (!fs.existsSync(cacheDir)) {
              fs.mkdirSync(cacheDir, { recursive: true });
            }
            fs.writeFileSync(cacheFile, JSON.stringify(data), "utf8");
          }
        }
      }
    }

    let domain = await GDomain.dominLists({ id: data?.groupdomainId });
    if (!domain.length) return res.status(404).end();

    let m3u8 = await M3U8({
      domain,
      data: JSON.parse(data?.value),
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
