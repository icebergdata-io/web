#!/bin/bash

# Compress video for mobile devices
compress_for_mobile() {
    input=$1
    output=$2
    
    # Mobile optimization settings:
    # - Scale to 720p max
    # - Reduce bitrate
    # - Use H.264 codec for better compatibility
    # - Maintain aspect ratio
    ffmpeg -i "$input" \
        -vf "scale='min(1280,iw)':min'(720,ih)':force_original_aspect_ratio=decrease" \
        -c:v libx264 \
        -preset slow \
        -crf 28 \
        -movflags +faststart \
        -c:a aac \
        -b:a 128k \
        "$output"
}

# Usage example:
# ./video-compress.sh /path/to/input.mp4 /path/to/output-mobile.mp4
compress_for_mobile "$1" "$2" 