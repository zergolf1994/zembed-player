"use strict";

const { Player } = require(`../Models`);
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  try {
    let { slug } = req.params;

    if (!slug) {
      return res.status(404).end();
    }

    let host = req.get("host");
    let data = {};
    let players = await Player.Lists.findOne({
      where: {
        domain: host,
        active: 1,
        advert: 1,
      },
      attributes: ["id"],
    });

    if (!players) {
      return res.status(404).end();
    }

    let advert = await Player.Advert.findAll({
      raw: true,
      where: {
        playerId: players?.id,
      },
      order: [["position", "ASC"]],
    });

    if (!advert.length) return res.status(404).end();

    data.data = advert;

    res.type("xml");
    return res.render("vast", data);
  } catch (error) {
    // error 500
    console.log(error);
    return res.status(500).end();
  }
};
