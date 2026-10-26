#!/usr/bin/env bash
# Builds the hero's sync-timeline reel from the graded category frames (run prepare-footage.sh first):
# each category's 1.3 s of footage at half speed, cut together, 1280x720, plus a thumbnail per category.
# Writes public/hero/sync-reel.{mp4,webm,jpg} and public/hero/<category>.jpg.
set -euo pipefail
cd "$(dirname "$0")"
OUT=../../public/hero TMP=$(mktemp -d)
mkdir -p "$OUT"
CATS=(film tv ads trailers games streaming)
for n in "${CATS[@]}"; do
  # 39 frames (1.3 s) stretched to 2.6 s, with in-between frames blended so the slow motion stays smooth.
  ffmpeg -loglevel error -y -framerate 30 -i "footage/frames/$n/landscape/%03d.jpg" \
    -vf "trim=end_frame=39,setpts=2*(PTS-STARTPTS),framerate=30,scale=1280:720:flags=lanczos,trim=duration=2.6" -an -c:v libx264 -crf 14 -pix_fmt yuv420p "$TMP/$n.mp4"
  ffmpeg -loglevel error -y -i "footage/frames/$n/landscape/020.jpg" -vf "scale=320:180:flags=lanczos" -q:v 4 "$OUT/$n.jpg"
  echo "file '$TMP/$n.mp4'" >> "$TMP/list.txt"
done
ffmpeg -loglevel error -y -f concat -safe 0 -i "$TMP/list.txt" -an -c:v libx264 -preset slow -profile:v high -level:v 4.0 -crf 25 -pix_fmt yuv420p -movflags +faststart "$OUT/sync-reel.mp4"
ffmpeg -loglevel error -y -i "$OUT/sync-reel.mp4" -an -c:v libvpx-vp9 -b:v 0 -crf 34 -row-mt 1 -deadline good -cpu-used 2 -pix_fmt yuv420p "$OUT/sync-reel.webm"
ffmpeg -loglevel error -y -ss 0.5 -i "$OUT/sync-reel.mp4" -frames:v 1 -q:v 4 "$OUT/sync-reel.jpg"
rm -rf "$TMP"
