"""
VetPlan — Logo Generator
═════════════════════════
Generates app icon, favicons, PWA icons, and apple-touch-icon.
Style: Modern rounded square with calendar + paw mark.
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
import os
import struct
import io

OUT_DIR = os.path.join(os.path.dirname(__file__), "public")

# Brand colors
BRAND_BLUE = (74, 144, 217)       # #4A90D9 — the app's accent
BRAND_BLUE_LIGHT = (110, 170, 230)
BRAND_BLUE_DIM = (40, 90, 150)
BRAND_BLUE_DARK = (30, 70, 130)
SKY_BLUE = (130, 195, 255)
DEEP_BG = (20, 30, 50)
CARD_BG = (28, 40, 65)
WHITE = (255, 255, 255)
WARM_WHITE = (250, 249, 247)      # #FAF9F7 — app background
GREEN_ACCENT = (72, 199, 142)     # for the paw/vet element
GREEN_BRIGHT = (100, 220, 165)
MUTED = (140, 155, 180)


def make_layer(w, h):
    return Image.new("RGBA", (w, h), (0, 0, 0, 0))


def draw_rounded_rect(draw, bbox, radius, fill=None, outline=None, width=1):
    x0, y0, x1, y1 = [int(v) for v in bbox]
    r = int(radius)
    if fill:
        draw.rectangle([x0 + r, y0, x1 - r, y1], fill=fill)
        draw.rectangle([x0, y0 + r, x1, y1 - r], fill=fill)
        draw.pieslice([x0, y0, x0 + 2*r, y0 + 2*r], 180, 270, fill=fill)
        draw.pieslice([x1 - 2*r, y0, x1, y0 + 2*r], 270, 360, fill=fill)
        draw.pieslice([x0, y1 - 2*r, x0 + 2*r, y1], 90, 180, fill=fill)
        draw.pieslice([x1 - 2*r, y1 - 2*r, x1, y1], 0, 90, fill=fill)
    if outline:
        draw.arc([x0, y0, x0 + 2*r, y0 + 2*r], 180, 270, fill=outline, width=width)
        draw.arc([x1 - 2*r, y0, x1, y0 + 2*r], 270, 360, fill=outline, width=width)
        draw.arc([x0, y1 - 2*r, x0 + 2*r, y1], 90, 180, fill=outline, width=width)
        draw.arc([x1 - 2*r, y1 - 2*r, x1, y1], 0, 90, fill=outline, width=width)
        draw.line([(x0 + r, y0), (x1 - r, y0)], fill=outline, width=width)
        draw.line([(x0 + r, y1), (x1 - r, y1)], fill=outline, width=width)
        draw.line([(x0, y0 + r), (x0, y1 - r)], fill=outline, width=width)
        draw.line([(x1, y0 + r), (x1, y1 - r)], fill=outline, width=width)


def make_glow(w, h, center, radius, color, intensity=60):
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    cx, cy = int(center[0]), int(center[1])
    r = max(int(radius * 0.35), 2)
    draw.ellipse([cx - r, cy - r, cx + r, cy + r],
                 fill=(*color, int(min(intensity, 255))))
    blur_r = max(int(radius * 0.65), 1)
    layer = layer.filter(ImageFilter.GaussianBlur(radius=blur_r))
    return layer


def load_font(size):
    fp = "/System/Library/Fonts/SFNS.ttf"
    if not os.path.exists(fp):
        fp = "/System/Library/Fonts/HelveticaNeue.ttc"
    if not os.path.exists(fp):
        fp = "/System/Library/Fonts/Helvetica.ttc"
    return ImageFont.truetype(fp, size)


def draw_paw(draw, cx, cy, size, color, alpha=220):
    """Draw a stylized paw print."""
    # Main pad (oval)
    pad_w = int(size * 0.42)
    pad_h = int(size * 0.35)
    pad_y = cy + int(size * 0.08)
    draw.ellipse([cx - pad_w, pad_y - pad_h, cx + pad_w, pad_y + pad_h],
                 fill=(*color, alpha))

    # Toe beans — 4 small circles above the main pad
    toe_r = int(size * 0.15)
    toe_y = cy - int(size * 0.22)
    toe_spread = int(size * 0.32)
    toe_inner_spread = int(size * 0.12)
    toe_outer_y = cy - int(size * 0.12)

    # Outer left
    draw.ellipse([cx - toe_spread - toe_r, toe_outer_y - toe_r,
                  cx - toe_spread + toe_r, toe_outer_y + toe_r],
                 fill=(*color, alpha))
    # Inner left
    draw.ellipse([cx - toe_inner_spread - toe_r, toe_y - toe_r,
                  cx - toe_inner_spread + toe_r, toe_y + toe_r],
                 fill=(*color, alpha))
    # Inner right
    draw.ellipse([cx + toe_inner_spread - toe_r, toe_y - toe_r,
                  cx + toe_inner_spread + toe_r, toe_y + toe_r],
                 fill=(*color, alpha))
    # Outer right
    draw.ellipse([cx + toe_spread - toe_r, toe_outer_y - toe_r,
                  cx + toe_spread + toe_r, toe_outer_y + toe_r],
                 fill=(*color, alpha))


def draw_calendar_icon(draw, x, y, w, h, color, line_w=None):
    """Draw a simple calendar outline."""
    if line_w is None:
        line_w = max(w // 20, 2)
    r = int(min(w * 0.12, h * 0.08))  # ensure radius fits

    body_top = y + int(h * 0.12)

    # Calendar body
    draw_rounded_rect(draw, (x, body_top, x + w, y + h), r,
                      outline=(*color, 220), width=line_w)

    # Top bar — use smaller radius so it fits
    bar_h = int(h * 0.22)
    bar_r = min(r, bar_h // 2)
    # Fill top bar area (no rounding on bottom edge — just fill rect)
    draw.rectangle([x + line_w, body_top + line_w, x + w - line_w, body_top + bar_h],
                   fill=(*color, 200))
    # Re-draw rounded top corners
    draw.pieslice([x, body_top, x + 2 * r, body_top + 2 * r], 180, 270,
                  fill=(*color, 200))
    draw.pieslice([x + w - 2 * r, body_top, x + w, body_top + 2 * r], 270, 360,
                  fill=(*color, 200))

    # Calendar pins (two small rectangles at top)
    pin_w = max(line_w + 2, 4)
    pin_h = int(h * 0.14)
    pin_y = y
    pin_r = pin_w // 2

    pin1_x = x + int(w * 0.28)
    pin2_x = x + int(w * 0.72)
    draw.rounded_rectangle([pin1_x - pin_r, pin_y, pin1_x + pin_r, pin_y + pin_h],
                           radius=pin_r, fill=(*color, 240))
    draw.rounded_rectangle([pin2_x - pin_r, pin_y, pin2_x + pin_r, pin_y + pin_h],
                           radius=pin_r, fill=(*color, 240))

    # Grid lines — 2 horizontal, 2 vertical
    grid_top = body_top + bar_h + int(h * 0.04)
    grid_bot = y + h - int(h * 0.06)
    grid_left = x + int(w * 0.08)
    grid_right = x + w - int(w * 0.08)
    grid_h = grid_bot - grid_top
    grid_w = grid_right - grid_left
    thin = max(line_w // 2, 1)

    for i in range(1, 3):
        gy = grid_top + int(grid_h * i / 3)
        draw.line([(grid_left, gy), (grid_right, gy)], fill=(*color, 80), width=thin)
    for i in range(1, 3):
        gx = grid_left + int(grid_w * i / 3)
        draw.line([(gx, grid_top), (gx, grid_bot)], fill=(*color, 80), width=thin)


# ═══════════════════════════════════════════════════════════════
#  MAIN ICON — Calendar with paw print
# ═══════════════════════════════════════════════════════════════

def render_icon(size=1024):
    """Render the VetPlan app icon."""
    w = h = size
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))

    # Background glow
    glow1 = make_glow(w, h, (w * 0.4, h * 0.4), w * 0.45, BRAND_BLUE, intensity=35)
    img = Image.alpha_composite(img, glow1)
    glow2 = make_glow(w, h, (w * 0.6, h * 0.6), w * 0.3, GREEN_ACCENT, intensity=20)
    img = Image.alpha_composite(img, glow2)

    # Main rounded square background
    pad = int(w * 0.04)
    card = make_layer(w, h)
    c_draw = ImageDraw.Draw(card)
    corner_r = int(w * 0.20)

    # Gradient-like background: draw multiple rects with slightly different colors
    draw_rounded_rect(c_draw, (pad, pad, w - pad, h - pad), corner_r,
                      fill=(*DEEP_BG, 250))
    img = Image.alpha_composite(img, card)

    # Subtle gradient overlay — lighter at top
    gradient = make_layer(w, h)
    g_draw = ImageDraw.Draw(gradient)
    for i in range(h // 3):
        alpha = int(15 * (1 - i / (h / 3)))
        g_draw.line([(pad, pad + i), (w - pad, pad + i)],
                    fill=(100, 140, 200, alpha))
    img = Image.alpha_composite(img, gradient)

    # Border
    border = make_layer(w, h)
    b_draw = ImageDraw.Draw(border)
    draw_rounded_rect(b_draw, (pad, pad, w - pad, h - pad), corner_r,
                      outline=(*BRAND_BLUE_DIM, 100), width=max(w // 180, 2))
    img = Image.alpha_composite(img, border)

    # Inner glow
    inner_glow = make_glow(w, h, (w * 0.5, h * 0.35), w * 0.3, BRAND_BLUE, intensity=18)
    img = Image.alpha_composite(img, inner_glow)

    # Calendar icon
    cal_w = int(w * 0.52)
    cal_h = int(h * 0.48)
    cal_x = (w - cal_w) // 2
    cal_y = int(h * 0.10)

    cal_layer = make_layer(w, h)
    cal_draw = ImageDraw.Draw(cal_layer)
    draw_calendar_icon(cal_draw, cal_x, cal_y, cal_w, cal_h,
                       BRAND_BLUE_LIGHT, line_w=max(w // 80, 3))
    img = Image.alpha_composite(img, cal_layer)

    # Paw print centered in lower part of icon
    paw_layer = make_layer(w, h)
    paw_draw = ImageDraw.Draw(paw_layer)
    paw_size = int(w * 0.28)
    paw_cx = w // 2
    paw_cy = int(h * 0.68)
    draw_paw(paw_draw, paw_cx, paw_cy, paw_size, GREEN_ACCENT, alpha=230)

    # Paw glow
    paw_glow = make_glow(w, h, (paw_cx, paw_cy), paw_size * 0.8, GREEN_ACCENT, intensity=25)
    img = Image.alpha_composite(img, paw_glow)
    img = Image.alpha_composite(img, paw_layer)

    # "VP" text small at calendar top bar
    try:
        vp_font = load_font(int(cal_h * 0.14))
        text_layer = make_layer(w, h)
        t_draw = ImageDraw.Draw(text_layer)
        vp_text = "VP"
        bb = t_draw.textbbox((0, 0), vp_text, font=vp_font)
        tw = bb[2] - bb[0]
        th = bb[3] - bb[1]
        vp_x = cal_x + (cal_w - tw) // 2
        vp_y = cal_y + int(cal_h * 0.14) + (int(cal_h * 0.18) - th) // 2
        t_draw.text((vp_x, vp_y), vp_text, font=vp_font, fill=(*WHITE, 240))
        img = Image.alpha_composite(img, text_layer)
    except Exception:
        pass

    # Checkmark in one of the calendar grid cells (bottom-right)
    check_layer = make_layer(w, h)
    ck_draw = ImageDraw.Draw(check_layer)
    check_cx = cal_x + int(cal_w * 0.78)
    check_cy = cal_y + int(cal_h * 0.72)
    check_size = int(cal_w * 0.10)
    stroke_w = max(w // 120, 2)
    # Checkmark polyline
    ck_draw.line([
        (check_cx - check_size, check_cy),
        (check_cx - int(check_size * 0.3), check_cy + int(check_size * 0.7)),
        (check_cx + check_size, check_cy - int(check_size * 0.5)),
    ], fill=(*GREEN_BRIGHT, 220), width=stroke_w, joint="curve")
    img = Image.alpha_composite(img, check_layer)

    return img


# ═══════════════════════════════════════════════════════════════
#  FAVICON ICO — Multi-size ICO file
# ═══════════════════════════════════════════════════════════════

def create_ico(icon_img, path, sizes=(16, 32, 48)):
    """Create a multi-resolution .ico file."""
    imgs = []
    for s in sizes:
        resized = icon_img.resize((s, s), Image.LANCZOS)
        imgs.append(resized)
    # Save as ICO
    imgs[0].save(path, format='ICO', sizes=[(s, s) for s in sizes],
                 append_images=imgs[1:])


# ═══════════════════════════════════════════════════════════════
#  LIGHT VARIANT — for apple-touch-icon (white bg)
# ═══════════════════════════════════════════════════════════════

def render_icon_light(size=1024):
    """Render icon with light background for apple-touch-icon."""
    w = h = size
    img = Image.new("RGBA", (w, h), (*WARM_WHITE, 255))

    # Subtle blue glow
    glow = make_glow(w, h, (w * 0.5, h * 0.4), w * 0.4, BRAND_BLUE, intensity=15)
    img = Image.alpha_composite(img, glow)

    # Calendar icon
    cal_w = int(w * 0.55)
    cal_h = int(h * 0.50)
    cal_x = (w - cal_w) // 2
    cal_y = int(h * 0.08)

    cal_layer = make_layer(w, h)
    cal_draw = ImageDraw.Draw(cal_layer)
    draw_calendar_icon(cal_draw, cal_x, cal_y, cal_w, cal_h,
                       BRAND_BLUE, line_w=max(w // 70, 3))
    img = Image.alpha_composite(img, cal_layer)

    # Paw
    paw_layer = make_layer(w, h)
    paw_draw = ImageDraw.Draw(paw_layer)
    paw_size = int(w * 0.28)
    draw_paw(paw_draw, w // 2, int(h * 0.70), paw_size, BRAND_BLUE, alpha=200)
    img = Image.alpha_composite(img, paw_layer)

    # VP text
    try:
        vp_font = load_font(int(cal_h * 0.14))
        text_layer = make_layer(w, h)
        t_draw = ImageDraw.Draw(text_layer)
        bb = t_draw.textbbox((0, 0), "VP", font=vp_font)
        tw = bb[2] - bb[0]
        vp_x = cal_x + (cal_w - tw) // 2
        vp_y = cal_y + int(cal_h * 0.15)
        t_draw.text((vp_x, vp_y), "VP", font=vp_font, fill=(*WHITE, 240))
        img = Image.alpha_composite(img, text_layer)
    except Exception:
        pass

    # Checkmark
    check_layer = make_layer(w, h)
    ck_draw = ImageDraw.Draw(check_layer)
    check_cx = cal_x + int(cal_w * 0.78)
    check_cy = cal_y + int(cal_h * 0.72)
    check_size = int(cal_w * 0.10)
    ck_draw.line([
        (check_cx - check_size, check_cy),
        (check_cx - int(check_size * 0.3), check_cy + int(check_size * 0.7)),
        (check_cx + check_size, check_cy - int(check_size * 0.5)),
    ], fill=(*GREEN_ACCENT, 220), width=max(w // 100, 2), joint="curve")
    img = Image.alpha_composite(img, check_layer)

    return img


# ═══════════════════════════════════════════════════════════════
#  MAIN
# ═══════════════════════════════════════════════════════════════

def main():
    os.makedirs(OUT_DIR, exist_ok=True)

    print("═══════════════════════════════════════════════════")
    print("  VetPlan — Logo Generator")
    print("═══════════════════════════════════════════════════")

    # 1. Master icon (1024x1024) — dark variant
    print("\n[1/7] Master icon (1024x1024)...")
    icon = render_icon(1024)
    icon.save(os.path.join(OUT_DIR, "icon-master.png"), "PNG")
    print("  Done")

    # 2. PWA icon 512x512
    print("[2/7] PWA icon (512x512)...")
    icon_512 = icon.resize((512, 512), Image.LANCZOS)
    icon_512.save(os.path.join(OUT_DIR, "icon-512.png"), "PNG")
    print("  Done")

    # 3. PWA icon 192x192
    print("[3/7] PWA icon (192x192)...")
    icon_192 = icon.resize((192, 192), Image.LANCZOS)
    icon_192.save(os.path.join(OUT_DIR, "icon-192.png"), "PNG")
    print("  Done")

    # 4. Apple touch icon (180x180) — light variant
    print("[4/7] Apple touch icon (180x180)...")
    apple_icon = render_icon_light(1024)
    apple_180 = apple_icon.resize((180, 180), Image.LANCZOS)
    apple_180.save(os.path.join(OUT_DIR, "apple-touch-icon.png"), "PNG")
    print("  Done")

    # 5. Favicon ICO (multi-size)
    print("[5/7] Favicon ICO (16, 32, 48)...")
    # Use dark icon for favicon
    try:
        create_ico(icon, os.path.join(OUT_DIR, "favicon.ico"), sizes=(16, 32, 48))
        print("  Done")
    except Exception as e:
        # Fallback: save as single 32x32 PNG-based ICO
        print(f"  ICO multi-size failed ({e}), using single 32x32...")
        ico_32 = icon.resize((32, 32), Image.LANCZOS)
        ico_32.save(os.path.join(OUT_DIR, "favicon.ico"), format="ICO")
        print("  Done (single size)")

    # 6. Favicon PNG (32x32) for browsers that prefer PNG
    print("[6/7] Favicon PNG (32x32)...")
    icon_32 = icon.resize((32, 32), Image.LANCZOS)
    icon_32.save(os.path.join(OUT_DIR, "favicon-32x32.png"), "PNG")
    print("  Done")

    # 7. OG/social image (1200x630)
    print("[7/7] OG social image (1200x630)...")
    og_w, og_h = 1200, 630
    og = Image.new("RGBA", (og_w, og_h), (*DEEP_BG, 255))

    # Background glows
    g1 = make_glow(og_w, og_h, (og_w * 0.3, og_h * 0.5), 300, BRAND_BLUE, intensity=18)
    og = Image.alpha_composite(og, g1)
    g2 = make_glow(og_w, og_h, (og_w * 0.7, og_h * 0.5), 250, GREEN_ACCENT, intensity=12)
    og = Image.alpha_composite(og, g2)

    # Icon on left
    og_icon_size = int(og_h * 0.65)
    og_icon = icon.resize((og_icon_size, og_icon_size), Image.LANCZOS)
    og_icon_x = int(og_w * 0.08)
    og_icon_y = (og_h - og_icon_size) // 2
    og_layer = make_layer(og_w, og_h)
    og_layer.paste(og_icon, (og_icon_x, og_icon_y), og_icon)
    og = Image.alpha_composite(og, og_layer)

    # Text
    try:
        font_title = load_font(int(og_h * 0.14))
        font_sub = load_font(int(og_h * 0.06))
        text_layer = make_layer(og_w, og_h)
        t_draw = ImageDraw.Draw(text_layer)

        text_x = og_icon_x + og_icon_size + int(og_w * 0.05)
        title_y = og_h // 2 - int(og_h * 0.16)

        # Shadow
        shadow = make_layer(og_w, og_h)
        s_draw = ImageDraw.Draw(shadow)
        s_draw.text((text_x, title_y + 3), "VetPlan", font=font_title, fill=(0, 0, 0, 60))
        shadow = shadow.filter(ImageFilter.GaussianBlur(radius=6))
        og = Image.alpha_composite(og, shadow)

        t_draw.text((text_x, title_y), "Vet", font=font_title, fill=(*WHITE, 255))
        vet_bb = t_draw.textbbox((0, 0), "Vet", font=font_title)
        vet_w = vet_bb[2] - vet_bb[0]
        t_draw.text((text_x + vet_w + 4, title_y), "Plan", font=font_title,
                    fill=(*BRAND_BLUE_LIGHT, 255))

        t_draw.text((text_x, title_y + int(og_h * 0.20)),
                    "Πρόγραμμα Επισκέψεων", font=font_sub,
                    fill=(*MUTED, 200))
        og = Image.alpha_composite(og, text_layer)
    except Exception:
        pass

    og_rgb = Image.new("RGB", og.size, (20, 30, 50))
    og_rgb.paste(og, mask=og.split()[3])
    og_rgb.save(os.path.join(OUT_DIR, "og-image.png"), "PNG")
    print("  Done")

    print("\n═══════════════════════════════════════════════════")
    print("  All 7 assets generated in:", OUT_DIR)
    print("═══════════════════════════════════════════════════")


if __name__ == "__main__":
    main()
