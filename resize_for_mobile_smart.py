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
    ('portfolio_0000_Group 6-mobile.jpg', 'branding.with.text.png'),
    ('portfolio_0002_Group 8.jpg', 'photo.video.with.text.png'),
    ('portfolio_0004_Group 10.jpg', 'social.media.with.text.png'),
    ('portfolio_0006_Group 12.jpg', 'web.with.text.png'),
]

# Create destination folder if it doesn't exist
os.makedirs(dest_folder, exist_ok=True)

for source_name, dest_name in images_to_resize:
    source_path = os.path.join(source_folder, source_name)
    dest_path = os.path.join(dest_folder, dest_name)

    # Open image
    img = Image.open(source_path).convert('RGBA')
    original_size = img.size

    # Calculate aspect ratios
    source_ratio = img.width / img.height
    target_ratio = target_width / target_height

    # Scale to fit within target dimensions while maintaining aspect ratio
    # Then add black padding to reach exact target size
    if source_ratio > target_ratio:
        # Image is wider - fit by width
        new_width = target_width
        new_height = int(target_width / source_ratio)
    else:
        # Image is taller - fit by height
        new_height = target_height
        new_width = int(target_height * source_ratio)

    # Resize maintaining aspect ratio
    img_resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)

    # Create canvas with target dimensions and black background
    canvas = Image.new('RGBA', (target_width, target_height), (0, 0, 0, 255))

    # Center the resized image on the canvas
    x_offset = (target_width - new_width) // 2
    y_offset = (target_height - new_height) // 2

    canvas.paste(img_resized, (x_offset, y_offset), img_resized)

    # Save as PNG
    canvas.save(dest_path, 'PNG')
    print(f"✓ Resized {source_name} ({original_size[0]}x{original_size[1]}) -> {dest_name} ({target_width}x{target_height})")
    print(f"  Scaled to {new_width}x{new_height}, centered on canvas")

print(f"\nAll images resized successfully with text preserved!")
print(f"Output folder: {dest_folder}")
