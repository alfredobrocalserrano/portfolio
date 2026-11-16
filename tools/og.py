"""Render assets/og.png (1200x630 share card) from the real CO2 data.

Usage: python tools/og.py path/to/Archivo[wdth,wght].ttf
The font is the variable Archivo TTF from github.com/google/fonts (OFL).
"""
import json
import os
import sys

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT = sys.argv[1]
PAPER, INK, RED = (244, 244, 241), (17, 17, 17), (208, 32, 26)
S = 2  # supersample
W, H = 1200 * S, 630 * S


def font(size, wght, wdth):
    f = ImageFont.truetype(FONT, size * S)
    f.set_variation_by_axes([wght, wdth])
    return f


img = Image.new("RGB", (W, H), PAPER)
d = ImageDraw.Draw(img)

d.multiline_text((56 * S, 40 * S), "Alfredo\nBrocal\nSerrano", font=font(118, 860, 76), fill=INK, spacing=-16 * S)
d.text((58 * S, 438 * S), "Máster en Data Science · UCM", font=font(34, 600, 100), fill=INK)
d.text((58 * S, 484 * S), "Busco prácticas", font=font(34, 800, 100), fill=RED)
d.text((58 * S, 530 * S), "Elche (Alicante) · Madrid · remoto", font=font(28, 500, 100), fill=INK)

rows = json.load(open(os.path.join(ROOT, "data", "co2_fuentes.json")))
keys = ["Carbon", "Petroleo", "Gas", "Cemento", "Quema_Gas_Exceso"]
x0, x1, y0, y1 = 610 * S, 1150 * S, 70 * S, 560 * S
n = len(rows)
ymax = 38000
fills = [INK, RED, INK, RED, INK]
base = [0.0] * n
for ki, k in enumerate(keys):
    top = [base[i] + rows[i][k] for i in range(n)]
    pts = [(x0 + i * (x1 - x0) / (n - 1), y1 - top[i] / ymax * (y1 - y0)) for i in range(n)]
    back = [(x0 + i * (x1 - x0) / (n - 1), y1 - base[i] / ymax * (y1 - y0)) for i in reversed(range(n))]
    if ki in (0, 1):
        d.polygon(pts + back, fill=fills[ki])
    else:
        d.line(pts, fill=fills[ki], width=3 * S)
    base = top
d.line([(x0, y1), (x1, y1)], fill=INK, width=4 * S)
f = font(18, 500, 100)
d.text((x0, y1 + 12 * S), "1900", font=f, fill=INK)
d.text((x1 - 44 * S, y1 + 12 * S), "2021", font=f, fill=INK)
d.text((x0, y1 + 40 * S), "Emisiones globales de CO2 por fuente · Global Carbon Budget 2022", font=font(16, 500, 100), fill=(92, 92, 88))
d.rectangle([0, H - 12 * S, W, H], fill=INK)

img.resize((1200, 630), Image.LANCZOS).save(os.path.join(ROOT, "assets", "og.png"), optimize=True)
print("assets/og.png written")
