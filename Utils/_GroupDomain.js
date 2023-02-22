"use strict";
const { Groupdomain } = require(`../Models`);
const { Sequelize, Op } = require("sequelize");

exports.IdCloudFlare = async ({ userId }) => {
  try {
    let where = {
      type: "cloudflare",
      active: 1,
    };
    if (userId != undefined) where.userId = userId;

    let row = await Groupdomain.findOne({
      raw: true,
      where,
      order: [["count_used", "ASC"]],
      attributes: ["id", "count_used"],
    });

    if (!row && userId != undefined) {
      delete where.userId;
      row = await Groupdomain.findOne({
        raw: true,
        where,
        order: [["count_used", "ASC"]],
        attributes: ["id", "count_used"],
      });
    }

    if (!row) return 0;
    return row?.id;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

exports.dominLists = async ({ id }) => {
  try {
    let where = {
      id: id,
      active: 1,
    };

    let row = await Groupdomain.findOne({
      raw: true,
      where,
      attributes: ["id", "domain_list"],
    });

    if (!row && id != undefined) {
      row = await Groupdomain.findOne({
        raw: true,
        attributes: ["id", "domain_list"],
        where: {
          type: "stream",
          active: 1,
        },
        order: [[Sequelize.literal("RAND()")]],
      });
    }

    if (!row) return [];
    return row?.domain_list.split(/\r?\n/);
  } catch (error) {
    console.log(error);
    return [];
  }
};
