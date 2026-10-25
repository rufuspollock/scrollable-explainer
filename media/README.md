# The Wrong Queue — scrolling demo

A silent excerpt recorded from [The Wrong Queue](https://reasoncommons.com/explainers/01-bottleneck/index.html), part one of the Reason Commons explainer trilogy. The URL retains its original `01-bottleneck` slug. The footage shows the live page scrolling through the opening clinic story and five-station bottleneck reveal; no page content is altered. Original story and illustrations: Reason Commons / Life Itself.

- `screenshot.png`: opening clinic illustration, 1440 × 900.
- `stations.png`: the five-station diagram.
- `preview.gif`: embedded README preview, 10 seconds, 800 × 500, 10 fps, 663 KB; excerpt starts at 29 seconds in the MP4.
- `demo.mp4`: a short H.264 scrolling excerpt, silent, with browser load time removed.
- `capture.mjs`: reproducible browser capture; `metadata.json` records source, viewport and scroll stops.

To capture again, install Node.js and FFmpeg, then run:

```sh
npm install
npx playwright install chromium ffmpeg
node capture.mjs
```

Trim the loading interval using `trimStart` from `metadata.json`, then encode the recording for distribution:

```sh
ffmpeg -ss START_SECONDS -i raw.webm -an -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p -movflags +faststart demo.mp4
```

`PLAYWRIGHT_EXECUTABLE_PATH` can select an existing Chromium installation. `OUTPUT_DIR` changes the output folder. The browser recording and npm dependencies are temporary capture files; distribute the MP4, images, script and metadata rather than `raw.webm` or `node_modules/`.

To regenerate the compact README preview from the MP4:

```sh
ffmpeg -ss 29 -t 10 -i demo.mp4 -filter_complex "[0:v]fps=10,scale=800:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=96:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=3" -loop 0 preview.gif
```
