#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

# Paths
black_bg_path = '/home/prosperitylabs/Desktop/development/nit-website/public/portfolio/portfolio.recreation.attempt/black bg.png'
icon_path = '/home/prosperitylabs/Desktop/development/nit-website/public/portfolio/portfolio.recreation.attempt/web.png'
output_path = '/home/prosperitylabs/Desktop/development/nit-website/public/portfolio/web-mobile.png'

# Load images
black_bg = Image.open(black_bg_path).convert('RGBA')
icon = Image.open(icon_path).convert('RGBA')

# Target dimensions (mobile portrait - matching typical card aspect ratio)
target_width = 1080
target_height = 1350

# Create new canvas
canvas = Image.new('RGBA', (target_width, target_height), (0, 0, 0, 255))

# Resize and center the black background pattern
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

# Resize icon to fit nicely in upper right
icon_scale = 0.55
icon_new_width = int(target_width * icon_scale)
icon_new_height = int(icon.height * (icon_new_width / icon.width))
icon_resized = icon.resize((icon_new_width, icon_new_height), Image.Resampling.LANCZOS)

# Position in upper right corner
padding_right = -100  # Negative to extend beyond canvas edge
padding_top = -30     # Negative to extend above canvas
icon_x = target_width - icon_new_width - padding_right
icon_y = padding_top
canvas.paste(icon_resized, (icon_x, icon_y), icon_resized)

# Save the result
canvas.save(output_path, 'PNG')
print(f"Web mobile image created successfully at: {output_path}")
print(f"Dimensions: {target_width}x{target_height}")
