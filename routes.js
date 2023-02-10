"use strict";

const express = require("express");
const router = express.Router();
const Control = require("./Controllers");
//data
router.route("/embed/:slug").get(Control.Embed);
router.route("/thumb/:slug-:sec.(jpg|png)").get(Control.Thumb);
router.route("/:slug/:quality-m3u8").get(Control.M3U8.INDEX);

router.all("*", async (req, res) => {
  res.status(404).end();
});

module.exports = router;
