module.exports = {
  Embed: require("./Embed"),
  Thumb: require("./image"),
  Vast: require("./vast"),
  API: require("./api.request"),
  Redirect: require("./redirect"),
  M3U8: { INDEX: require("./m3u8.index"), MASTER: require("./m3u8.master") },
  Thumbs: { VTT: require("./thumbs-vtt"), Image: require("./thumbs-image") },
};
