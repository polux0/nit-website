#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont

# Target dimensions
target_width = 1080
target_height = 1350

# Source and destination folder
source_folder = '/home/prosperitylabs/Desktop/development/nit-website/public/portfolio/portfolio'
dest_folder = '/home/prosperitylabs/Desktop/development/nit-website/public/portfolio/portfolio.mobile'

# Images to process
images_to_process = [
    {
        'source': 'portfolio_0000_Group 6-mobile.jpg',
        'dest': 'branding.with.text.png',
        'title': 'Branding',
        'subtitle': 'Od ideje do prepoznatljivog kvaliteta',
    },
    {
        'source': 'portfolio_0002_Group 8.jpg',
        'dest': 'photo.video.with.text.png',
        'title': 'Photo & Video',
        'subtitle': None,  # Keep original subtitle
    },
    {
        'source': 'portfolio_0004_Group 10.jpg',
        'dest': 'social.media.with.text.png',
        'title': 'Social Media',
        'subtitle': None,  # Keep original subtitle
    },
    {
        'source': 'portfolio_0006_Group 12.jpg',
        'dest': 'web.with.text.png',
        'title': 'Web',
        'subtitle': None,  # Keep original subtitle
    },
]

def auto_crop_border(img, threshold=20):
    """Automatically detect and crop black borders from image"""
    pixels = img.load()
    width, height = img.size

    # Find top border
    top = 0
    for y in range(height):
        row_brightness = sum(sum(pixels[x, y][:3]) for x in range(width))
        if row_brightness / width > threshold:
            top = y
            break

    # Find bottom border
    bottom = height
    for y in range(height - 1, -1, -1):
        row_brightness = sum(sum(pixels[x, y][:3]) for x in range(width))
        if row_brightness / width > threshold:
            bottom = y + 1
            break

    # Find left border
    left = 0
    for x in range(width):
        col_brightness = sum(sum(pixels[x, y][:3]) for y in range(height))
        if col_brightness / height > threshold:
            left = x
            break

    # Find right border
    right = width
    for x in range(width - 1, -1, -1):
        col_brightness = sum(sum(pixels[x, y][:3]) for y in range(height))
        if col_brightness / height > threshold:
            right = x + 1
            break

    # Add small padding to avoid cutting actual content
    padding = 5
    left = max(0, left - padding)
    top = max(0, top - padding)
    right = min(width, right + padding)
    bottom = min(height, bottom + padding)

    return img.crop((left, top, right, bottom))

def remove_text_area(img, draw, bg_sample_point=(10, 10)):
    """Remove text from bottom portion of image"""
    width, height = img.size
    bg_color = img.getpixel(bg_sample_point)

    # Clear the bottom area where text typically appears
    text_start_y = int(height * 0.55)  # Start from 55% down
    draw.rectangle([(0, text_start_y), (width, height)], fill=bg_color)

def add_text_with_positioning(img, draw, title, subtitle=None, shift_right=50):
    """Add title and subtitle text with proper positioning"""
    width, height = img.size

    # We'll use default fonts since we don't have the exact font
    # Adjust font sizes based on image dimensions
    try:
        # Try to use a nice serif font if available
        title_font_size = int(width * 0.12)
        subtitle_font_size = int(width * 0.035)

        title_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSerif-Italic.ttf", title_font_size)
        subtitle_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", subtitle_font_size)
    except:
        # Fallback to default font
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()

    # Title positioning - shifted right
    title_x = int(width * 0.05) + shift_right
    title_y = int(height * 0.60)

    # Title color (light blue/cyan gradient - we'll use light blue)
    title_color = (168, 197, 227, 255)  # Light blue
    draw.text((title_x, title_y), title, fill=title_color, font=title_font)

    # Subtitle positioning if provided
    if subtitle:
        subtitle_x = int(width * 0.05) + shift_right
        subtitle_y = int(height * 0.68)
        subtitle_color = (130, 125, 162, 255)  # Purple/lavender
        draw.text((subtitle_x, subtitle_y), subtitle, fill=subtitle_color, font=subtitle_font)

# Process each image
for img_info in images_to_process:
    source_path = f"{source_folder}/{img_info['source']}"
    dest_path = f"{dest_folder}/{img_info['dest']}"

    print(f"\nProcessing {img_info['source']}...")

    # Load image
    img = Image.open(source_path).convert('RGBA')
    print(f"  Original size: {img.size}")

    # Step 1: Auto-crop borders
    img_cropped = auto_crop_border(img)
    print(f"  After crop: {img_cropped.size}")

    # Step 2: Resize maintaining aspect ratio
    source_ratio = img_cropped.width / img_cropped.height
    target_ratio = target_width / target_height

    if source_ratio > target_ratio:
        new_width = target_width
        new_height = int(target_width / source_ratio)
    else:
        new_height = target_height
        new_width = int(target_height * source_ratio)

    img_resized = img_cropped.resize((new_width, new_height), Image.Resampling.LANCZOS)

    # Step 3: Create canvas and center image
    canvas = Image.new('RGBA', (target_width, target_height), (0, 0, 0, 255))
    x_offset = (target_width - new_width) // 2
    y_offset = (target_height - new_height) // 2
    canvas.paste(img_resized, (x_offset, y_offset), img_resized)

    # Step 4: For branding image, update the text
    if img_info['subtitle']:
        draw = ImageDraw.Draw(canvas)
        # Remove old text area
        remove_text_area(canvas, draw)
        # Add new text with right shift
        add_text_with_positioning(canvas, draw, img_info['title'], img_info['subtitle'], shift_right=50)

    # Save
    canvas.save(dest_path, 'PNG')
    print(f"  ✓ Saved to {img_info['dest']} ({target_width}x{target_height})")

print("\n✅ All images processed successfully!")
