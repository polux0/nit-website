#!/usr/bin/env python3
from PIL import Image, ImageDraw

# Input and output paths
input_path = '/home/prosperitylabs/Desktop/development/nit-website/public/portfolio/branding-mobile.png'
output_path = '/home/prosperitylabs/Desktop/development/nit-website/public/portfolio/branding-no-text.png'

# Load the image
img = Image.open(input_path).convert('RGBA')
width, height = img.size

# Create a drawing context
draw = ImageDraw.Draw(img)

# Get the background color from a sample point (top-left area)
bg_color = img.getpixel((10, 10))

# Define regions where text appears (based on the image layout)
# "Branding" text area - lower left portion
text_region_1 = [(0, int(height * 0.45)), (int(width * 0.65), int(height * 0.65))]

# Subtitle text area - below "Branding"
text_region_2 = [(0, int(height * 0.57)), (int(width * 0.9), int(height * 0.63))]

# Fill these regions with background color
draw.rectangle(text_region_1, fill=bg_color)
draw.rectangle(text_region_2, fill=bg_color)

# Save the result
img.save(output_path, 'PNG')
print(f"Text removed successfully!")
print(f"Clean image saved at: {output_path}")
print(f"Dimensions: {width}x{height}")
