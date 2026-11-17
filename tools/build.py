"""Bake the portfolio's SVG charts from the real project CSVs into index.html.

Usage:  python tools/build.py
Reads   src/index.html (template with {{MARKERS}}) and data/raw/*.csv
Writes  index.html

The site itself needs no build: index.html is committed and served as is.
Run this only when the template or the data changes.
"""
import csv
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "data", "raw")
INK, RED, PAPER = "#111111", "#d0201a", "#f4f4f1"


def read(name):
    with open(os.path.join(RAW, name), encoding="utf-8") as f:
        return list(csv.DictReader(f))


def es(n, d=0):
    s = f"{n:,.{d}f}"
    return s.replace(",", "X").replace(".", ",").replace("X", ".")


def en(n, d=0):
    return f"{n:,.{d}f}"


def pct(v, lang):
    s = (es if lang == "es" else en)(abs(v), 1)
    return ("−" if v < 0 else "+") + s + (" %" if lang == "es" else "%")


# ---------------------------------------------------------------- hero
SOURCES = [
    ("Carbon", "Carbón", "Coal", "ink"),
    ("Petroleo", "Petróleo", "Oil", "red"),
    ("Gas", "Gas", "Gas", "hatch-ink"),
    ("Cemento", "Cemento", "Cement", "hatch-red"),
    ("Quema_Gas_Exceso", "Gas quemado", "Flaring", "line"),
]


def hero_chart():
    rows = read("co2_evolucion_global_fuentes.csv")
    years = [int(r["Year"]) for r in rows]
    vals = {k: [float(r[k]) for r in rows] for k, *_ in SOURCES}
    n = len(rows)
    W, H = 820, 500
    L, R, T, B = 0, 200, 22, 40
    pw, ph = W - L - R, H - T - B
    ymax = 40000

    def X(i):
        return L + i * pw / (n - 1)

    def Y(v):
        return T + ph - v / ymax * ph

    out = []
    out.append(
        '<defs>'
        f'<pattern id="h-ink" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="2.6" height="7" fill="{INK}"/></pattern>'
        f'<pattern id="h-red" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><rect width="2.6" height="7" fill="{RED}"/></pattern>'
        '</defs>'
    )
    for g in (10000, 20000, 30000, 40000):
        y = Y(g)
        out.append(f'<line class="grid-l" x1="{L}" x2="{L + pw}" y1="{y:.1f}" y2="{y:.1f}"/>')
        out.append(f'<text class="t-s t-dim" x="{L + 4}" y="{y - 6:.1f}">{g // 1000} Gt</text>')

    base = [0.0] * n
    mids = []
    shapes = []
    for key, les, len_, style in SOURCES:
        top = [base[i] + vals[key][i] for i in range(n)]
        pts = " ".join(f"{X(i):.1f},{Y(top[i]):.1f}" for i in range(n))
        back = " ".join(f"{X(i):.1f},{Y(base[i]):.1f}" for i in reversed(range(n)))
        d = f"M{pts} L{back} Z"
        fill = {"ink": INK, "red": RED, "hatch-ink": "url(#h-ink)", "hatch-red": "url(#h-red)", "line": PAPER}[style]
        stroke = f' stroke="{INK}" stroke-width="1.2"' if style in ("line", "hatch-ink", "hatch-red") else ""
        shapes.append(f'<path d="{d}" fill="{fill}"{stroke}/>')
        mids.append((Y((top[-1] + base[-1]) / 2), les, len_, vals[key][-1], style))
        base = top
    out.append('<g class="wipe" data-wipe>' + "".join(shapes) + "</g>")
    out.append(f'<line class="axis" x1="{L}" x2="{L + pw}" y1="{Y(0):.1f}" y2="{Y(0):.1f}"/>')

    # direct labels on the 2021 slice, spread apart and drawn with leaders
    lab_x = L + pw + 14
    placed = []
    min_gap = 46
    for y, les, len_, v, style in sorted(mids, key=lambda m: m[0]):
        ly = y if not placed else max(y, placed[-1] + min_gap)
        placed.append(ly)
    # push back up if we overflow the bottom
    limit = Y(0) - 6
    for i in range(len(placed) - 1, -1, -1):
        if placed[i] > limit:
            placed[i] = limit
        limit = placed[i] - min_gap
    for (y, les, len_, v, style), ly in zip(sorted(mids, key=lambda m: m[0]), placed):
        out.append(f'<line x1="{L + pw + 2}" x2="{lab_x - 4}" y1="{y:.1f}" y2="{ly - 5:.1f}" stroke="{INK}" stroke-width="1"/>')
        cls = "t-m t-red" if style in ("red", "hatch-red") else "t-m"
        out.append(f'<text class="{cls}" x="{lab_x}" y="{ly:.1f}" data-en="{len_}">{les}</text>')
        out.append(f'<text class="t-s lab-v" x="{lab_x}" y="{ly + 19:.1f}" data-en="{en(v)} Mt">{es(v)} Mt</text>')

    for yr in (1900, 1950, 2000, 2021):
        i = years.index(yr)
        anchor = "end" if yr == 2021 else ("start" if yr == 1900 else "middle")
        out.append(f'<text class="t-s" x="{X(i):.1f}" y="{H - 14}" text-anchor="{anchor}">{yr}</text>')

    out.append(f'<g class="scrub__mark" visibility="hidden"><line class="scrub__line" x1="0" x2="0" y1="{T}" y2="{Y(0):.1f}"/></g>')

    data = {"y": years, "k": [k for k, *_ in SOURCES], "v": [[round(vals[k][i]) for k, *_ in SOURCES] for i in range(n)],
            "t": [round(sum(vals[k][i] for k, *_ in SOURCES)) for i in range(n)],
            "geo": {"L": L, "pw": pw, "W": W}}
    svg = (
        f'<svg class="chart scrub" viewBox="0 0 {W} {H}" preserveAspectRatio="xMinYMid meet" tabindex="0" role="img" '
        f'aria-labelledby="fig1-t" aria-describedby="fig1-d">'
        f'<title id="fig1-t" data-en="Global CO₂ emissions by source, 1900–2021">Emisiones globales de CO₂ por fuente, 1900–2021</title>'
        f'<desc id="fig1-d" data-en="Stacked area chart. Total emissions rise from 1,952 Mt in 1900 to 36,828 Mt in 2021. In 2021: coal 14,980, oil 11,837, gas 7,922, cement 1,673 and flaring 417 Mt. Use the left and right arrow keys to read each year.">'
        f'Áreas apiladas. El total pasa de 1.952 Mt en 1900 a 36.828 Mt en 2021. En 2021: carbón 14.980, petróleo 11.837, gas 7.922, cemento 1.673 y gas quemado en antorcha 417 Mt. Usa las flechas izquierda y derecha para leer cada año.</desc>'
        + "".join(out) + "</svg>"
    )
    return svg, json.dumps(data, separators=(",", ":"))


# ---------------------------------------------------------------- CO2 plate
NAMES = {
    "Venezuela": ("Venezuela", "Venezuela"), "Ukraine": ("Ucrania", "Ukraine"),
    "United Kingdom": ("Reino Unido", "United Kingdom"), "Italy": ("Italia", "Italy"),
    "Spain": ("España", "Spain"), "Germany": ("Alemania", "Germany"), "Netherlands": ("Países Bajos", "Netherlands"),
    "Mexico": ("México", "Mexico"), "Czech Republic": ("Chequia", "Czechia"), "Japan": ("Japón", "Japan"),
    "France": ("Francia", "France"), "USA": ("EE. UU.", "USA"), "Belgium": ("Bélgica", "Belgium"),
    "South Africa": ("Sudáfrica", "South Africa"), "Canada": ("Canadá", "Canada"),
    "China": ("China", "China"), "Russia": ("Rusia", "Russia"), "India": ("India", "India"),
}


def hbars(items, fmt_es, fmt_en, vmax, highlight, label_w=132, value_w=96, row=30, W=520, title=("", ""), desc=("", ""), uid="f", notes=None):
    notes = notes or {}
    H = row * len(items) + 8
    bw = W - label_w - value_w
    out = []
    for i, (key, v) in enumerate(items):
        y = i * row + 4
        les, len_ = NAMES.get(key, (key, key))
        red = key in highlight
        w = abs(v) / vmax * bw
        out.append(f'<text class="t-m{" t-red" if red else ""}" x="0" y="{y + row * 0.62:.1f}" data-en="{len_}">{les}</text>')
        out.append(f'<rect x="{label_w}" y="{y + 5}" width="{w:.1f}" height="{row - 12}" fill="{RED if red else INK}"/>')
        out.append(f'<text class="t-m{" t-red" if red else ""}" x="{label_w + w + 8:.1f}" y="{y + row * 0.62:.1f}" data-en="{fmt_en(v)}">{fmt_es(v)}</text>')
        if key in notes:
            nes, nen = notes[key]
            out.append(f'<text class="t-s t-dim" x="{label_w + w + 8 + 64:.1f}" y="{y + row * 0.62:.1f}" data-en="{nen}">{nes}</text>')
    out.append(f'<line class="axis" x1="{label_w}" x2="{label_w}" y1="0" y2="{H}"/>')
    return (
        f'<svg class="chart wipe" data-wipe viewBox="0 0 {W} {H}" role="img" aria-labelledby="{uid}-t" aria-describedby="{uid}-d">'
        f'<title id="{uid}-t" data-en="{title[1]}">{title[0]}</title><desc id="{uid}-d" data-en="{desc[1]}">{desc[0]}</desc>'
        + "".join(out) + "</svg>"
    )


def co2_change():
    rows = read("co2_paises_mejora_climatica.csv")
    items = [(r["Country"], float(r["Variacion_Porcentual"])) for r in rows]
    desc_es = "Barras horizontales. " + "; ".join(f"{NAMES[k][0]} {pct(v, 'es')}" for k, v in items) + "."
    desc_en = "Horizontal bars. " + "; ".join(f"{NAMES[k][1]} {pct(v, 'en')}" for k, v in items) + "."
    return hbars(items, lambda v: pct(v, "es"), lambda v: pct(v, "en"), 60, {"United Kingdom", "Italy", "Spain"},
                 value_w=96, row=30,
                 title=("Variación de emisiones de CO₂ por país, 2011–2021", "Change in CO₂ emissions by country, 2011–2021"),
                 desc=(desc_es, desc_en), uid="fig2")


def co2_rank():
    rows = read("co2_ranking_historico_top10.csv")
    items = [(r["Country"], float(r["Emisiones_Totales_Historicas"]) / 1000) for r in rows]
    desc_es = "Barras horizontales, gigatoneladas acumuladas 1900–2021. " + "; ".join(f"{NAMES[k][0]} {es(v, 1)}" for k, v in items) + "."
    desc_en = "Horizontal bars, cumulative gigatonnes 1900–2021. " + "; ".join(f"{NAMES[k][1]} {en(v, 1)}" for k, v in items) + "."
    return hbars(items, lambda v: es(v, 1) + " Gt", lambda v: en(v, 1) + " Gt", 420, {"Germany", "United Kingdom"},
                 value_w=104, row=30,
                 title=("Emisiones acumuladas por país, 1900–2021", "Cumulative emissions by country, 1900–2021"),
                 desc=(desc_es, desc_en), uid="fig3")


# ---------------------------------------------------------------- RAG plate
def rag_tone():
    rows = read("rag_sentimiento.csv")
    W, label_w, row = 520, 156, 34
    H = row * len(rows) + 30
    bw = W - label_w - 60
    out = []
    for g in range(1, 6):
        x = label_w + g / 5 * bw
        out.append(f'<line class="grid-l" x1="{x:.1f}" x2="{x:.1f}" y1="0" y2="{H - 26}"/>')
        out.append(f'<text class="t-s t-dim" x="{x:.1f}" y="{H - 8}" text-anchor="middle">{g}</text>')
    for i, r in enumerate(rows):
        v = float(r["Sentimiento (1-5)"])
        y = i * row + 2
        w = v / 5 * bw
        low = v < 3
        out.append(f'<text class="t-m" x="0" y="{y + row * 0.6:.1f}">{r["Documento"]}</text>')
        out.append(f'<rect x="{label_w}" y="{y + 6}" width="{w:.1f}" height="{row - 14}" fill="{RED if low else INK}"/>')
        out.append(f'<text class="t-m{" t-red" if low else ""}" x="{label_w + w + 8:.1f}" y="{y + row * 0.6:.1f}" data-en="{en(v, 1)}">{es(v, 1)}</text>')
    out.append(f'<line class="axis" x1="{label_w}" x2="{label_w}" y1="0" y2="{H - 26}"/>')
    items = [(r["Documento"], float(r["Sentimiento (1-5)"])) for r in rows]
    return (
        f'<svg class="chart wipe" data-wipe viewBox="0 0 {W} {H}" role="img" aria-labelledby="fig5-t" aria-describedby="fig5-d">'
        '<title id="fig5-t" data-en="Tone of each annual report, scored 1 to 5 by the LLM">Tono de cada informe anual, puntuado de 1 a 5 por el LLM</title>'
        f'<desc id="fig5-d" data-en="{"; ".join(f"{d} {en(v, 1)}" for d, v in items)}.">{"; ".join(f"{d} {es(v, 1)}" for d, v in items)}.</desc>'
        + "".join(out) + "</svg>"
    )


# ---------------------------------------------------------------- X plate
def x_classes():
    items = [("Negativo", "Negative", 19569), ("Positivo", "Positive", 17148), ("Neutral", "Neutral", 15140), ("Irrelevante", "Irrelevant", 11782)]
    total = sum(v for *_, v in items)
    W, label_w, row = 520, 118, 40
    H = row * len(items) + 4
    bw = W - label_w - 172
    out = []
    for i, (les, len_, v) in enumerate(items):
        y = i * row + 2
        w = v / 20000 * bw
        p = v / total * 100
        red = i == 0
        out.append(f'<text class="t-m{" t-red" if red else ""}" x="0" y="{y + row * 0.6:.1f}" data-en="{len_}">{les}</text>')
        out.append(f'<rect x="{label_w}" y="{y + 6}" width="{w:.1f}" height="{row - 14}" fill="{RED if red else INK}"/>')
        out.append(f'<text class="t-m{" t-red" if red else ""}" x="{label_w + w + 8:.1f}" y="{y + row * 0.6:.1f}" data-en="{en(v)} · {en(p, 1)}%">{es(v)} · {es(p, 1)} %</text>')
    out.append(f'<line class="axis" x1="{label_w}" x2="{label_w}" y1="0" y2="{H}"/>')
    return (
        f'<svg class="chart wipe" data-wipe viewBox="0 0 {W} {H}" role="img" aria-labelledby="fig6-t" aria-describedby="fig6-d">'
        '<title id="fig6-t" data-en="Sentiment labels in the cleaned dataset">Etiquetas de sentimiento en el dataset limpio</title>'
        f'<desc id="fig6-d" data-en="{"; ".join(f"{b} {en(v)}" for _, b, v in items)}. Total {en(total)}.">{"; ".join(f"{a} {es(v)}" for a, _, v in items)}. Total {es(total)}.</desc>'
        + "".join(out) + "</svg>"
    )


# ---------------------------------------------------------------- Tourism plate
MESES_ES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
MESES_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


def tur_forecast():
    rows = read("turismo_historico_prevision.csv")
    n = len(rows)
    W, H = 520, 330
    L, R, T, B = 52, 8, 26, 34
    pw, ph = W - L - R, H - T - B
    ymin, ymax = 500000, 2500000

    def X(i):
        return L + i * pw / (n - 1)

    def Y(v):
        return T + ph - (v - ymin) / (ymax - ymin) * ph

    out = []
    for g in (1000000, 1500000, 2000000, 2500000):
        y = Y(g)
        out.append(f'<line class="grid-l" x1="{L}" x2="{L + pw}" y1="{y:.1f}" y2="{y:.1f}"/>')
        out.append(f'<text class="t-s t-dim" x="{L - 8}" y="{y + 4:.1f}" text-anchor="end" data-en="{en(g / 1e6, 1)} M">{es(g / 1e6, 1)} M</text>')

    hist = [(i, r) for i, r in enumerate(rows) if r["tipo"] == "historico"]
    prev = [(i, r) for i, r in enumerate(rows) if r["tipo"] == "prevision"]
    last_i, last = hist[-1]
    # forecast band, hatched red, anchored on the last observed month
    top = [(X(last_i), Y(float(last["valor"])))] + [(X(i), Y(float(r["sup"]))) for i, r in prev]
    bot = [(X(i), Y(float(r["inf"]))) for i, r in reversed(prev)] + [(X(last_i), Y(float(last["valor"])))]
    band = " ".join(f"{x:.1f},{y:.1f}" for x, y in top + bot)
    # 80 % interval as a light red band behind the forecast line
    shapes = [f'<polygon points="{band}" fill="{RED}" fill-opacity="0.3"/>']
    hl = " L".join(f"{X(i):.1f},{Y(float(r['valor'])):.1f}" for i, r in hist)
    shapes.append(f'<path d="M{hl}" fill="none" stroke="{INK}" stroke-width="2.4" stroke-linejoin="round"/>')
    pl = " L".join(f"{X(i):.1f},{Y(float(r['valor'])):.1f}" for i, r in [(last_i, last)] + prev)
    shapes.append(f'<path d="M{pl}" fill="none" stroke="{RED}" stroke-width="2.8" stroke-linejoin="round"/>')
    out.append('<g>' + "".join(shapes) + "</g>")
    out.append(f'<line class="axis" x1="{L}" x2="{L + pw}" y1="{Y(ymin):.1f}" y2="{Y(ymin):.1f}"/>')

    # "today" divider and direct labels
    xd = X(last_i)
    out.append(f'<line x1="{xd:.1f}" x2="{xd:.1f}" y1="{T - 4}" y2="{Y(ymin):.1f}" stroke="{INK}" stroke-width="1" stroke-dasharray="3 3"/>')
    out.append(f'<text class="t-m" x="{xd - 8:.1f}" y="{T + 8}" text-anchor="end" data-en="Observed">Observado</text>')
    out.append(f'<text class="t-m t-red" x="{xd + 8:.1f}" y="{T + 8}" data-en="Forecast">Previsión</text>')

    for i, r in enumerate(rows):
        yy, mm = r["fecha"].split("-")
        if mm == "01":
            out.append(f'<text class="t-s" x="{X(i):.1f}" y="{H - 10}" text-anchor="middle">{yy}</text>')
            out.append(f'<line x1="{X(i):.1f}" x2="{X(i):.1f}" y1="{Y(ymin):.1f}" y2="{Y(ymin) + 5:.1f}" stroke="{INK}" stroke-width="1.5"/>')

    def mlabel(f, lang):
        yy, mm = f.split("-")
        return (MESES_ES if lang == "es" else MESES_EN)[int(mm) - 1] + " " + yy

    peak = max(prev, key=lambda p: float(p[1]["valor"]))[1]
    first_p, last_p = prev[0][1], prev[-1][1]
    desc_es = (f"Línea mensual de pernoctaciones hoteleras en la Costa Blanca de {mlabel(rows[0]['fecha'], 'es')} a {mlabel(last['fecha'], 'es')}, "
               f"seguida de la previsión de {mlabel(first_p['fecha'], 'es')} a {mlabel(last_p['fecha'], 'es')} con su intervalo. "
               f"El pico previsto es {mlabel(peak['fecha'], 'es')}: {es(float(peak['valor']))} pernoctaciones "
               f"(entre {es(float(peak['inf']))} y {es(float(peak['sup']))}).")
    desc_en = (f"Monthly hotel overnight stays on the Costa Blanca from {mlabel(rows[0]['fecha'], 'en')} to {mlabel(last['fecha'], 'en')}, "
               f"followed by the forecast from {mlabel(first_p['fecha'], 'en')} to {mlabel(last_p['fecha'], 'en')} with its interval. "
               f"The forecast peak is {mlabel(peak['fecha'], 'en')}: {en(float(peak['valor']))} stays "
               f"(between {en(float(peak['inf']))} and {en(float(peak['sup']))}).")
    return (
        f'<svg class="chart wipe" data-wipe viewBox="0 0 {W} {H}" role="img" aria-labelledby="figt1-t" aria-describedby="figt1-d">'
        '<title id="figt1-t" data-en="Hotel overnight stays and 12-month forecast">Pernoctaciones hoteleras y previsión a 12 meses</title>'
        f'<desc id="figt1-d" data-en="{desc_en}">{desc_es}</desc>'
        + "".join(out) + "</svg>"
    )


MODELOS_EN = {
    "Ingenuo estacional": "Seasonal naive",
    "SARIMAX + Semana Santa": "SARIMAX + Easter",
    "Combinación ETS + SARIMAX": "ETS + SARIMAX blend",
}


def tur_precision():
    rows = read("turismo_precision.csv")
    W, label_w, row, bar_h = 520, 238, 50, 15
    vmax = 6.0
    bw = W - label_w - 58
    H = row * len(rows) + 30
    out = []
    for g in (2, 4, 6):
        x = label_w + g / vmax * bw
        out.append(f'<line class="grid-l" x1="{x:.1f}" x2="{x:.1f}" y1="0" y2="{H - 26}"/>')
        out.append(f'<text class="t-s t-dim" x="{x:.1f}" y="{H - 8}" text-anchor="middle" data-en="{g}%">{g} %</text>')
    for i, r in enumerate(rows):
        y = i * row + 4
        final = r["final"] == "1"
        col = RED if final else INK
        name_en = MODELOS_EN.get(r["modelo"], r["modelo"])
        cls = "t-m t-red" if final else "t-m"
        out.append(f'<text class="{cls}" x="0" y="{y + 15}" data-en="{name_en}">{r["modelo"]}</text>')
        if final:
            out.append(f'<text class="t-s t-red" x="0" y="{y + 33}" data-en="final model">modelo final</text>')
        for k, (key, hatch) in enumerate((("mape_2015_2019", True), ("mape_2023_2026", False))):
            v = float(r[key])
            by = y + k * (bar_h + 3)
            w = v / vmax * bw
            fill = (f"url(#h-{'red' if final else 'ink'}-p)") if hatch else col
            stroke = f' stroke="{col}" stroke-width="1"' if hatch else ""
            out.append(f'<rect x="{label_w}" y="{by}" width="{w:.1f}" height="{bar_h}" fill="{fill}"{stroke}/>')
            out.append(f'<text class="t-s{" t-red" if final else ""}" x="{label_w + w + 6:.1f}" y="{by + bar_h - 3}" data-en="{en(v, 2)}%">{es(v, 2)} %</text>')
    out.append(f'<line class="axis" x1="{label_w}" x2="{label_w}" y1="0" y2="{H - 26}"/>')
    defs = (
        f'<defs><pattern id="h-ink-p" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="2" height="6" fill="{INK}"/></pattern>'
        f'<pattern id="h-red-p" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="2" height="6" fill="{RED}"/></pattern></defs>'
    )
    desc_es = "; ".join(f"{r['modelo']}: {es(float(r['mape_2015_2019']), 2)} % en 2015–2019 y {es(float(r['mape_2023_2026']), 2)} % en 2023–2026" for r in rows) + "."
    desc_en = "; ".join(f"{MODELOS_EN.get(r['modelo'], r['modelo'])}: {en(float(r['mape_2015_2019']), 2)}% in 2015–2019 and {en(float(r['mape_2023_2026']), 2)}% in 2023–2026" for r in rows) + "."
    return (
        f'<svg class="chart wipe" data-wipe viewBox="0 0 {W} {H}" role="img" aria-labelledby="figt2-t" aria-describedby="figt2-d">'
        '<title id="figt2-t" data-en="Mean forecast error (MAPE) by model">Error medio de la previsión (MAPE) por modelo</title>'
        f'<desc id="figt2-d" data-en="{desc_en}">{desc_es}</desc>'
        + defs + "".join(out) + "</svg>"
    )


# ---------------------------------------------------------------- Play plate
def play_split():
    # counts printed by Data_Cleaning_and_Preprocessing.ipynb (Free True / False)
    items = [("Gratuitas", "Free", 1204752), ("De pago", "Paid", 25547)]
    total = sum(v for *_, v in items)
    W, label_w, row = 520, 118, 44
    H = row * len(items) + 4
    bw = W - label_w - 196
    out = []
    for i, (les, len_, v) in enumerate(items):
        y = i * row + 2
        w = max(v / total * bw, 3)
        p = v / total * 100
        red = i == 1
        out.append(f'<text class="t-m{" t-red" if red else ""}" x="0" y="{y + row * 0.6:.1f}" data-en="{len_}">{les}</text>')
        out.append(f'<rect x="{label_w}" y="{y + 7}" width="{w:.1f}" height="{row - 16}" fill="{RED if red else INK}"/>')
        out.append(f'<text class="t-m{" t-red" if red else ""}" x="{label_w + w + 8:.1f}" y="{y + row * 0.6:.1f}" data-en="{en(v)} · {en(p, 1)}%">{es(v)} · {es(p, 1)} %</text>')
    out.append(f'<line class="axis" x1="{label_w}" x2="{label_w}" y1="0" y2="{H}"/>')
    return (
        f'<svg class="chart wipe" data-wipe viewBox="0 0 {W} {H}" role="img" aria-labelledby="fig8-t" aria-describedby="fig8-d">'
        '<title id="fig8-t" data-en="Free and paid apps in the cleaned dataset">Apps gratuitas y de pago en el dataset limpio</title>'
        f'<desc id="fig8-d" data-en="Free {en(items[0][2])}; paid {en(items[1][2])}; total {en(total)}.">Gratuitas {es(items[0][2])}; de pago {es(items[1][2])}; total {es(total)}.</desc>'
        + "".join(out) + "</svg>"
    )


def main():
    hero, hero_data = hero_chart()
    marks = {
        "{{FIG1}}": hero,
        "{{FIG1_DATA}}": hero_data,
        "{{FIG2}}": co2_change(),
        "{{FIG3}}": co2_rank(),
        "{{FIG5}}": rag_tone(),
        "{{FIG6}}": x_classes(),
        "{{FIG8}}": play_split(),
        "{{FIGT1}}": tur_forecast(),
        "{{FIGT2}}": tur_precision(),
    }
    with open(os.path.join(ROOT, "src", "index.html"), encoding="utf-8") as f:
        html = f.read()
    for k, v in marks.items():
        if k not in html:
            raise SystemExit(f"marker {k} missing from src/index.html")
        html = html.replace(k, v)
    with open(os.path.join(ROOT, "index.html"), "w", encoding="utf-8", newline="\n") as f:
        f.write(html)
    print("index.html written,", len(html), "bytes")


if __name__ == "__main__":
    main()
