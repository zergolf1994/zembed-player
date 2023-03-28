"use strict";

const express = require("express");
const router = express.Router();
const Control = require("./Controllers");
//data
router.route("/embed/:slug").get(Control.Embed);
router.route("/:slug.xml").get(Control.Vast);
router.route("/thumb/:slug-:sec.(jpg|png)").get(Control.Thumb);
router.route("/:slug/master-m3u8/0").get(Control.M3U8.MASTER);
router.route("/:slug/:quality-m3u8/_").get(Control.M3U8.INDEX);

router.route("/thumbs/:slug.vtt").get(Control.Thumbs.VTT);
router.route("/thumbs/:slug-:item.jpg").get(Control.Thumbs.Image);
router.route("/red/:baseurl/:baseref").get(Control.Redirect);

router.route("/api/request").post(Control.API);

router.route("/api/request").all((req, res) => {
  res.status(404).json({ status: false });
});
router.all("*", async (req, res) => {
  res.status(404).end();
});

module.exports = router;
