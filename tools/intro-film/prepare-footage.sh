#!/usr/bin/env bash
# Grades the clips in footage/ into the JPEG frames render.html reads:
# footage/frames/<name>/NNN.jpg, 3840x2160. Both shapes of the film show the whole 16:9 shot, inset.
set -euo pipefail
cd "$(dirname "$0")"

# The film stays bright and clear: mid-tones lifted while blacks stay black (lifting everything reads
# as faded), then contrast, colour and a little sharpening.
CLEAR="eq=contrast=1.12:saturation=1.22,unsharp=5:5:0.45,"
# Daylight and studio shots.
LIGHT="curves=all='0/0 0.5/0.54 1/1',$CLEAR"
# Dim interiors and night shots: a stronger mid-tone lift.
BRIGHT="curves=all='0/0 0.1/0.17 0.3/0.48 0.6/0.79 1/1',$CLEAR"

# clip <name> <source file> <start s> <length s> <cleanup filters> <grade> [framing filters]
# Framing filters turn or crop a shot that isn't 16:9 to begin with.
clip() {
  local name=$1 src=$2 ss=$3 len=$4 clean=$5 grade=$6 frame=${7:-} out=footage/frames/$1
  rm -rf "$out"; mkdir -p "$out"
  ffmpeg -loglevel error -y -ss "$ss" -t "$len" -i "footage/$src" \
    -vf "fps=30,${clean}${frame}${grade}scale=3840:2160:force_original_aspect_ratio=increase:flags=lanczos,crop=3840:2160" -q:v 2 "$out/%03d.jpg"
  echo "$name: $(ls "$out" | wc -l) frames"
}

# Sync Anything: a hand drops the needle onto a spinning record, and the music starts.
clip music pexels-11999586.mp4 0.9 2.8 "" "$LIGHT"
# Film: a cinema audience in 3D glasses as the projector flares. Shot upright; the 16:9 version
# is a band with the audience in its lower half, so the word sits above their faces.
clip film pexels-7984182.mp4 3.4 1.3 "" "$BRIGHT" "crop=2160:1215:0:1500,"
# TV: a couple laughing on the sofa at night, remote in hand.
clip tv pexels-4009974.mp4 6.0 1.3 "" "$LIGHT"
# Ads: lemons and limes plunging into water on black, like a drinks commercial.
clip ads pexels-2583472.mp4 0.55 1.3 "" "$CLEAR"
# Trailers: a storm of fire and sparks on black.
clip trailers pexels-20209228.mp4 1.0 1.3 "" "$BRIGHT"
# Games: hands on a lit-up game controller in a dark room.
clip games pexels-6739005.mp4 2.0 1.3 "" "$LIGHT"
# Streaming: a camera monitor on set showing the shot.
clip streaming pexels-8042290.mp4 3.0 1.3 "" "$BRIGHT"
