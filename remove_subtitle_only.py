#!/usr/bin/env python3
from PIL import Image, ImageDraw

# Input and output paths
input_path = '/home/prosperitylabs/Desktop/development/nit-website/public/portfolio/branding-mobile.png'
output_path = '/home/prosperitylabs/Desktop/development/nit-website/public/portfolio/branding-no-subtitle.png'

# Load the image
img = Image.open(input_path).convert('RGBA')
width, height = img.size

# Create a drawing context
draw = ImageDraw.Draw(img)

# Get the background color from a sample point (top-left area)
bg_color = img.getpixel((10, 10))

# ONLY remove the subtitle text area - below "Branding"
# Keep the "Branding" title intact
subtitle_region = [(0, int(height * 0.57)), (int(width * 0.9), int(height * 0.63))]

# Fill the subtitle region with background color
draw.rectangle(subtitle_region, fill=bg_color)

# Save the result
img.save(output_path, 'PNG')
print(f"Subtitle removed successfully!")
print(f"Image saved at: {output_path}")
print(f"Dimensions: {width}x{height}")
