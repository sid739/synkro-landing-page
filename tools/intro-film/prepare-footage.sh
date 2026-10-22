#!/usr/bin/env bash
# Grades the clips in footage/ into the JPEG frames render.html reads:
# footage/frames/<name>/landscape/NNN.jpg (3840x2160) and footage/frames/<name>/portrait/NNN.jpg (1080x1920).
set -euo pipefail
cd "$(dirname "$0")"

# The film stays bright. Daylight and studio shots: colour kept, a touch of violet in the shadows.
LIGHT="eq=contrast=1.03:saturation=1.05,colorbalance=bs=0.03,"
# Dim interiors and night shots: exposure lifted, colour kept.
BRIGHT="eq=brightness=0.05:gamma=1.35:contrast=1.04:saturation=1.08,colorbalance=bs=0.03,"
# Shot on a white table: lightness inverted (hues kept) so the table goes dark.
INVERT="negate,hue=h=180,eq=brightness=-0.03:saturation=0.9,colorbalance=bs=0.06:rs=0.02,"

# soften <n> <x> <y> <w> <h> <dy>: blurs a w*h box at x,y in the source frame, moving dy pixels per
# second (to follow a logo as the camera tilts). n keeps each box's filter labels unique.
soften() {
  echo "split[s$1][t$1];[t$1]crop=$4:$5:$2:$3+$6*t,boxblur=24:3[u$1];[s$1][u$1]overlay=$2:$3+$6*t,"
}

# clip <name> <source file> <start s> <length s> <cleanup filters> <grade> <landscape-only filters> [phone-only filters]
# Landscape-only filters turn or crop an upright shot for the 16:9 version; phone-only filters pick
# where the 9:16 version is cut from (the centre otherwise).
clip() {
  local name=$1 src=$2 ss=$3 len=$4 clean=$5 grade=$6 wide=$7 tall=${8:-} out=footage/frames/$1
  rm -rf "$out"; mkdir -p "$out/landscape" "$out/portrait"
  ffmpeg -loglevel error -y -ss "$ss" -t "$len" -i "footage/$src" \
    -vf "fps=30,${clean}${wide}${grade}scale=3840:2160:force_original_aspect_ratio=increase:flags=lanczos,crop=3840:2160" -q:v 2 "$out/landscape/%03d.jpg"
  ffmpeg -loglevel error -y -ss "$ss" -t "$len" -i "footage/$src" \
    -vf "fps=30,${clean}${tall}${grade}scale=1080:1920:force_original_aspect_ratio=increase:flags=lanczos,crop=1080:1920" -q:v 2 "$out/portrait/%03d.jpg"
  echo "$name: $(ls "$out/landscape" | wc -l) frames"
}

# Overhead guitar, headphones, cassettes and record player (shot upright, so turned for landscape).
clip flatlay pexels-3944271.mp4 0 5.24 "" "$INVERT" "transpose=2,"
# Film: a cinema audience in 3D glasses as the projector flares. Shot upright; the 16:9 version
# is a band with the audience in its lower half, so the word sits above their faces.
clip film pexels-7984182.mp4 3.4 1.3 "" "$BRIGHT" "crop=2160:1215:0:1500,"
# TV: New York skyline at dusk, someone watching from a pier.
clip tv pexels-15370550.mp4 3.0 1.3 "" "$BRIGHT" ""
# Ads: cheerleaders in a white studio, with the team crest on their shirts softened.
clip ads ads-cheer.mp4 3.0 1.3 "$(soften 1 1385 365 175 150 141)$(soften 2 255 445 110 125 140)$(soften 3 2490 445 100 125 140)" "$LIGHT" ""
# Trailers: aerial of the Schilthorn summit, with the 007 marks on the building softened.
clip trailers pexels-4395386.mp4 2.0 1.3 "delogo=x=735:y=635:w=275:h=120,delogo=x=1185:y=625:w=170:h=120,delogo=x=515:y=625:w=90:h=110," "$LIGHT" ""
# Games: first-person view down a gun sight along a brick wall, with the logo on the glove softened.
clip games pexels-13721796.mp4 5.0 1.3 "$(soften 1 925 690 170 175 12)" "$BRIGHT" ""
# Streaming: a camera monitor on set showing the shot; the phone cut keeps the monitor in frame.
clip streaming pexels-8042290.mp4 3.0 1.3 "" "$BRIGHT" "" "crop=1215:2160:826:0,"
