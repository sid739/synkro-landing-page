#!/usr/bin/env bash
# Grades the clips in footage/ into the JPEG frames render.html reads:
# footage/frames/<name>/landscape/NNN.jpg (1920x1080) and footage/frames/<name>/portrait/NNN.jpg (720x1280).
set -euo pipefail
cd "$(dirname "$0")"

# Real scenes: darker, a little less saturated, violet in the shadows.
DARK="eq=brightness=-0.05:saturation=0.85:contrast=1.05,colorbalance=bs=0.06:rs=0.02,"
# Already dark (night shots): violet in the shadows only.
NIGHT="eq=saturation=0.9,colorbalance=bs=0.05:rs=0.02,"
# Shot on a white table: lightness inverted (hues kept) so the table goes dark.
INVERT="negate,hue=h=180,eq=brightness=-0.03:saturation=0.9,colorbalance=bs=0.06:rs=0.02,"

# clip <name> <source file> <start s> <length s> <cleanup filters> <grade> <landscape turn>
clip() {
  local name=$1 src=$2 ss=$3 len=$4 clean=$5 grade=$6 turn=$7 out=footage/frames/$1
  rm -rf "$out"; mkdir -p "$out/landscape" "$out/portrait"
  ffmpeg -loglevel error -y -ss "$ss" -t "$len" -i "footage/$src" \
    -vf "fps=30,${clean}${turn}${grade}scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080" -q:v 3 "$out/landscape/%03d.jpg"
  ffmpeg -loglevel error -y -ss "$ss" -t "$len" -i "footage/$src" \
    -vf "fps=30,${clean}${grade}scale=720:1280:force_original_aspect_ratio=increase,crop=720:1280" -q:v 3 "$out/portrait/%03d.jpg"
  echo "$name: $(ls "$out/landscape" | wc -l) frames"
}

# Overhead guitar, headphones, cassettes and record player (shot upright, so turned for landscape).
clip flatlay pexels-3944271.mp4 0 5.24 "" "$INVERT" "transpose=2,"
# Film: aerial of the Schilthorn summit, with the 007 marks on the building softened.
clip film pexels-4395386.mp4 2.0 1.3 "delogo=x=735:y=635:w=275:h=120,delogo=x=1185:y=625:w=170:h=120,delogo=x=515:y=625:w=90:h=110," "$DARK" ""
# TV: New York skyline at dusk, someone watching from a pier.
clip tv pexels-15370550.mp4 3.0 1.3 "" "$NIGHT" ""
