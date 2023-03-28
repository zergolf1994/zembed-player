$(document).ready(function () {
  const playerInstance = jwplayer("jw_player").setup({
    playlist: [
      {
        sources: [
          {
            label: "360p",
            type: "hls",
            file: "https://qqhls1.stream-aph.xyz/media/ha3uG7qeQnNQ9yU/flower.txt",
          },
        ],
        image:
          "https://1.bp.blogspot.com/-VuipYbjN3hg/YTekkmxDnVI/AAAAAAAAIOM/nxBhhPhwYd03_0bum4_ZVPskgFSxs1VrgCLcBGAsYHQ/s852/player.jpg",
        tracks: [],
      },
    ],
    logo: {
      file: "/uploads/",
      link: "#",
      hide: "false",
      position: "top-right",
    },
    cast: {},
    playbackRateControls: true,
    playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2],
    abouttext: "Alpha-Hen",
    aboutlink: "https://www.alpha-hen.com/",
  });
  playerInstance.addButton(
    "/theme/assets/libs/jw_skin/svg/forward.svg",
    "ไปข้างหน้า 10 วินาที",
    function () {
      playerInstance.seek(playerInstance.getPosition() + 10);
    },
    "jw-icon-forward"
  );
});
