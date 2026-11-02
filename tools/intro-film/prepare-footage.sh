#!/usr/bin/env bash
# Grades the clips in footage/ into the JPEG frames render.html reads:
# footage/frames/<name>/landscape/NNN.jpg (3840x2160) and footage/frames/<name>/portrait/NNN.jpg (1080x1920).
set -euo pipefail
cd "$(dirname "$0")"

# The film stays bright and clear: mid-tones lifted while blacks stay black (lifting everything reads
# as faded), then contrast, colour and a little sharpening.
CLEAR="eq=contrast=1.12:saturation=1.22,unsharp=5:5:0.45,"
# Daylight and studio shots.
LIGHT="curves=all='0/0 0.5/0.54 1/1',$CLEAR"
# Dim interiors and night shots: a stronger mid-tone lift.
BRIGHT="curves=all='0/0 0.1/0.17 0.3/0.48 0.6/0.79 1/1',$CLEAR"

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

# Sync Anything: a hand drops the needle onto a spinning record, and the music starts.
clip music pexels-11999586.mp4 0.9 2.8 "" "$LIGHT" ""
# Film: a cinema audience in 3D glasses as the projector flares. Shot upright; the 16:9 version
# is a band with the audience in its lower half, so the word sits above their faces.
clip film pexels-7984182.mp4 3.4 1.3 "" "$BRIGHT" "crop=2160:1215:0:1500,"
# TV: a couple laughing on the sofa at night, remote in hand. The phone cut keeps their faces.
clip tv pexels-4009974.mp4 6.0 1.3 "" "$LIGHT" "" "crop=1215:2160:1900:0,"
# Ads: lemons and limes plunging into water on black, like a drinks commercial. The phone cut follows
# the lemon in, right of centre.
clip ads pexels-2583472.mp4 0.55 1.3 "" "$CLEAR" "" "crop=1215:2160:1650:0,"
# Trailers: a storm of fire and sparks on black. The phone cut follows the sparks, left of centre.
clip trailers pexels-20209228.mp4 1.0 1.3 "" "$BRIGHT" "" "crop=1215:2160:1000:0,"
# Games: hands on a lit-up game controller in a dark room.
clip games pexels-6739005.mp4 2.0 1.3 "" "$LIGHT" ""
# Streaming: a camera monitor on set showing the shot; the phone cut keeps the monitor in frame.
clip streaming pexels-8042290.mp4 3.0 1.3 "" "$BRIGHT" "" "crop=1215:2160:826:0,"
