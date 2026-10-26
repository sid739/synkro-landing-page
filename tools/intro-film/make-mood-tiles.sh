#!/usr/bin/env bash
# Builds the homepage "Browse by mood" tiles from the graded footage frames (run prepare-footage.sh
# first): for each mood, a 4:5 crop of its clip at half speed (a 2.6 s loop) and a still poster.
# Writes public/moods/<mood>.{mp4,webm,jpg}.
set -euo pipefail
cd "$(dirname "$0")"
OUT=../../public/moods
mkdir -p "$OUT"
# mood:clip[:x], where x is the left edge of the crop (centred when left out)
for spec in cinematic:trailers uplifting:ads late-night:tv dark-and-tense:games acoustic:flatlay:150 electronic:streaming; do
  IFS=: read -r mood clip x <<< "$spec"
  VF="crop=1728:2160${x:+:$x:0},scale=576:720:flags=lanczos"
  ffmpeg -loglevel error -y -framerate 30 -i "footage/frames/$clip/landscape/%03d.jpg" \
    -vf "trim=end_frame=39,setpts=2*(PTS-STARTPTS),framerate=30,$VF,trim=duration=2.6" \
    -an -c:v libx264 -preset slow -profile:v high -level:v 4.0 -crf 25 -pix_fmt yuv420p -movflags +faststart "$OUT/$mood.mp4"
  ffmpeg -loglevel error -y -i "$OUT/$mood.mp4" -an -c:v libvpx-vp9 -b:v 0 -crf 35 -row-mt 1 -deadline good -cpu-used 2 -pix_fmt yuv420p "$OUT/$mood.webm"
  ffmpeg -loglevel error -y -i "footage/frames/$clip/landscape/020.jpg" -vf "$VF" -q:v 4 "$OUT/$mood.jpg"
  echo "$mood <- $clip"
done
