"use strict";
const fs = require("fs-extra");
const { Op } = require("sequelize");
const request = require("request");

const { Files, ProxyCache } = require(`../Models`);
const { Google } = require(`../Utils`);

module.exports = async (req, res) => {
  try {
    let { id } = req.params;
    if (!id) return res.status(404).end();
    let row = await ProxyCache.findOne({
      where: { id },
      raw: true,
      attributes: ["name", "value", "fileId"],
    });
    if (!row) return res.status(404).end();
    if (!["360", "480", "720", "1080"].includes(row?.name))
      return res.status(404).end();

    let rows = await ProxyCache.findAll({
      where: {
        fileId: row?.fileId,
        name: { [Op.or]: ["cookie", "timestamp"] },
      },
      raw: true,
      attributes: ["name", "value", "fileId"],
    });

    //get timestamp
    let array = {};
    for (const key in rows) {
      if (rows.hasOwnProperty.call(rows, key)) {
        let name = rows[key].name;
        array[name] = rows[key].value;
      }
    }

    let nowTime = Date.now();
    let cacheTime = array.timestamp;
    let Time = Math.floor((nowTime - cacheTime) / 1000);

    if (Time > 12600) {
      await ProxyCache.destroy({
        where: {
          fileId: row?.fileId,
        },
      });
      return res.status(403).end();
    }

    let url = row?.value;
    let cookie = JSON.parse(array.cookie);

    const headers = Object.assign(req.headers, { cookie });
    delete headers.host;
    delete headers.referer;

    var stream = request({ url, headers });
    stream.on("response", (resp) => {
      res.statusCode = resp.statusCode;
      Object.keys(resp.headers).forEach((key) => {
        res.setHeader(key, resp.headers[key]);
      });
    });

    stream.pipe(res);
  } catch (error) {
    console.log(error);
    return res.status(403).end();
  }
};
