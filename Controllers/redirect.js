"use strict";

module.exports = async (req, res) => {
  try {
    let { baseurl, baseref } = req.params;
    let host = req.get("host");
    let url = new Buffer.from(baseurl, "base64").toString("utf-8");
    let ref = new Buffer.from(baseref, "base64").toString("utf-8");

    res.set("Referer", `https://${ref}`);
    return res
      .writeHead(301, {
        Location: url,
      })
      .end();
  } catch (error) {
    return res.status(404).end();
  }
};
