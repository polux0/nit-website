#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

# Paths
font_title_path = '/home/prosperitylabs/Desktop/development/nit-website/public/fonts/LOUISfelligri-Light.otf'
dest_folder = '/home/prosperitylabs/Desktop/development/nit-website/public/portfolio/portfolio.mobile'

# Images to process with their text
images_to_process = [
    {
        'file': 'branding.with.text.png',
        'title': 'Branding',
        'subtitle': 'Od ideje do prepoznatljivog kvaliteta',
    },
    {
        'file': 'photo.video.with.text.png',
        'title': 'Photo & Video',
        'subtitle': 'kampanje koje angažuju, povezuju i grade zajednice',
    },
    {
        'file': 'social.media.with.text.png',
        'title': 'Social Media',
        'subtitle': 'Sajtovi koji spajaju brzinu, funkcionalnost i estetiku.',
    },
    {
        'file': 'web.with.text.png',
        'title': 'Web',
        'subtitle': 'Vizuelni sadržaji koji osnažuju i izdvajaju brend.',
    },
]

# Text colors (extracted earlier)
title_color = (168, 197, 227, 255)      # Light blue for title
subtitle_color = (130, 125, 162, 255)   # Purple/lavender for subtitle

def remove_text_area(img, draw):
    """Remove existing text by covering with black background"""
    width, height = img.size

    # Sample background color from top area (should be dark/black)
    bg_color = img.getpixel((10, 10))

    # Cover the bottom portion where text appears (roughly 40% from bottom)
    text_start_y = int(height * 0.5)
    draw.rectangle([(0, text_start_y), (width, height)], fill=bg_color)

def wrap_text(text, font, max_width):
    """Wrap text into multiple lines to fit within max_width"""
    words = text.split(' ')
    lines = []
    current_line = []

    for word in words:
        test_line = ' '.join(current_line + [word])
        bbox = font.getbbox(test_line)
        line_width = bbox[2] - bbox[0]

        if line_width <= max_width:
            current_line.append(word)
        else:
            if current_line:
                lines.append(' '.join(current_line))
                current_line = [word]
            else:
                # Single word is too long, add it anyway
                lines.append(word)

    if current_line:
        lines.append(' '.join(current_line))

    return lines

def add_shifted_text(img, draw, title, subtitle, shift_right=80):
    """Add text with right shift to prevent cutoff and multiline support"""
    width, height = img.size

    try:
        # Load the custom font for title
        title_font_size = int(width * 0.14)  # Adjust size for good appearance
        title_font = ImageFont.truetype(font_title_path, title_font_size)

        # For subtitle, try to use a cleaner font
        subtitle_font_size = int(width * 0.038)
        try:
            subtitle_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", subtitle_font_size)
        except:
            subtitle_font = ImageFont.truetype(font_title_path, int(subtitle_font_size * 0.8))

    except Exception as e:
        print(f"  ⚠ Font loading error: {e}")
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()

    # Title positioning - shifted right to prevent cutoff
    # Use same percentage for all images to keep consistent left margin
    base_margin = int(width * 0.14)  # 14% from left for all images
    title_x = base_margin
    title_y = int(height * 0.58)

    # Draw title
    draw.text((title_x, title_y), title, fill=title_color, font=title_font)
    print(f"  Title positioned at ({title_x}, {title_y})")

    # Subtitle positioning - same left margin as title
    if subtitle:
        subtitle_x = base_margin
        subtitle_y = int(height * 0.70)

        # Calculate max width for subtitle (leave 14% margin on right side too)
        max_subtitle_width = int(width * 0.72)  # 14% left + 72% content + 14% right

        # Wrap text into multiple lines
        subtitle_lines = wrap_text(subtitle, subtitle_font, max_subtitle_width)

        # Draw each line
        line_height = int(subtitle_font_size * 1.4)  # 1.4x for comfortable line spacing
        for i, line in enumerate(subtitle_lines):
            line_y = subtitle_y + (i * line_height)
            draw.text((subtitle_x, line_y), line, fill=subtitle_color, font=subtitle_font)

        print(f"  Subtitle positioned at ({subtitle_x}, {subtitle_y}), {len(subtitle_lines)} lines")

# Process each image
for img_info in images_to_process:
    img_path = os.path.join(dest_folder, img_info['file'])

    if not os.path.exists(img_path):
        print(f"⚠ Skipping {img_info['file']} - not found")
        continue

    print(f"\nProcessing {img_info['file']}...")

    # Load image
    img = Image.open(img_path).convert('RGBA')
    draw = ImageDraw.Draw(img)

    # Remove existing text
    remove_text_area(img, draw)

    # Add new text with multiline support
    add_shifted_text(img, draw, img_info['title'], img_info['subtitle'], shift_right=80)

    # Save
    img.save(img_path, 'PNG')
    print(f"  ✓ Saved with shifted text")

print("\n✅ All text shifted to the right successfully with multiline support!")
