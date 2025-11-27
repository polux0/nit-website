#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

# Paths
black_bg_path = '/home/prosperitylabs/Desktop/development/nit-website/public/portfolio/portfolio.recreation.attempt/black bg.png'
fon_path = '/home/prosperitylabs/Desktop/development/nit-website/public/portfolio/portfolio.recreation.attempt/fon.png'
output_path = '/home/prosperitylabs/Desktop/development/nit-website/public/portfolio/branding-mobile.png'

# Load images
black_bg = Image.open(black_bg_path).convert('RGBA')
fon = Image.open(fon_path).convert('RGBA')

# Target dimensions (mobile portrait - matching typical card aspect ratio)
# Using dimensions that work well for mobile cards (roughly 9:16 or similar)
target_width = 1080
target_height = 1350

# Create new canvas
canvas = Image.new('RGBA', (target_width, target_height), (0, 0, 0, 255))

# Resize and center the black background pattern
# We want to use the interesting wavy part from the black bg
bg_ratio = black_bg.width / black_bg.height
target_ratio = target_width / target_height

if bg_ratio > target_ratio:
    # Background is wider - scale by height
    new_height = target_height
    new_width = int(black_bg.width * (target_height / black_bg.height))
else:
    # Background is taller - scale by width
    new_width = target_width
    new_height = int(black_bg.height * (target_width / black_bg.width))

black_bg_resized = black_bg.resize((new_width, new_height), Image.Resampling.LANCZOS)

# Center crop
left = (new_width - target_width) // 2
top = (new_height - target_height) // 2
black_bg_cropped = black_bg_resized.crop((left, top, left + target_width, top + target_height))

# Paste the background
canvas.paste(black_bg_cropped, (0, 0), black_bg_cropped)

# Resize fon to fit nicely in upper right (matching reference size)
fon_scale = 0.55  # Slightly smaller to match reference
fon_new_width = int(target_width * fon_scale)
fon_new_height = int(fon.height * (fon_new_width / fon.width))
fon_resized = fon.resize((fon_new_width, fon_new_height), Image.Resampling.LANCZOS)

# Position in upper right corner - closer to edge, more to the right
padding_right = -100  # Negative to extend beyond canvas edge (moved further right)
padding_top = -30     # Negative to extend above canvas
fon_x = target_width - fon_new_width - padding_right
fon_y = padding_top
canvas.paste(fon_resized, (fon_x, fon_y), fon_resized)

# Save the result
canvas.save(output_path, 'PNG')
print(f"Mobile branding image created successfully at: {output_path}")
print(f"Dimensions: {target_width}x{target_height}")
