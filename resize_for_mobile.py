#!/usr/bin/env python3
from PIL import Image
import os

# Target dimensions
target_width = 1080
target_height = 1350

# Source and destination folder
source_folder = '/home/prosperitylabs/Desktop/development/nit-website/public/portfolio/portfolio'
dest_folder = '/home/prosperitylabs/Desktop/development/nit-website/public/portfolio/portfolio.mobile'

# Images to resize with their output names
images_to_resize = [
    ('portfolio_0000_Group 6-mobile.jpg', 'group6-mobile.png'),
    ('portfolio_0002_Group 8.jpg', 'group8-mobile.png'),
    ('portfolio_0004_Group 10.jpg', 'group10-mobile.png'),
    ('portfolio_0006_Group 12.jpg', 'group12-mobile.png'),
]

# Create destination folder if it doesn't exist
os.makedirs(dest_folder, exist_ok=True)

for source_name, dest_name in images_to_resize:
    source_path = os.path.join(source_folder, source_name)
    dest_path = os.path.join(dest_folder, dest_name)

    # Open image
    img = Image.open(source_path).convert('RGBA')
    original_size = img.size

    # Resize to target dimensions
    img_resized = img.resize((target_width, target_height), Image.Resampling.LANCZOS)

    # Save as PNG
    img_resized.save(dest_path, 'PNG')
    print(f"✓ Resized {source_name} ({original_size[0]}x{original_size[1]}) -> {dest_name} ({target_width}x{target_height})")

print(f"\nAll images resized successfully!")
print(f"Output folder: {dest_folder}")
