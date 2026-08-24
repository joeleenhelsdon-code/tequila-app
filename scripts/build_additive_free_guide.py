from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


OUTPUT = Path(__file__).resolve().parents[1] / "public" / "guides" / "tequilafi-additive-free-tequila-guide.pdf"

BRANDS = [
    "3 Amigos", "Aguasol", "Alma del Jaguar", "Amatiteña", "ArteNOM Selección de 1123",
    "ArteNOM Selección de 1146", "ArteNOM Selección de 1414", "ArteNOM Selección de 1579",
    "Arette", "Atanasio", "Azuñia", "Carrera Tequila", "Casa Real", "Cascahuín", "Cazcanes",
    "Chamucos", "Cierto", "Cimarron", "Codigo 1530", "Corrido", "Cuernito", "De-Nada Tequila",
    "Don Fulano", "Don Lorenzo", "Don Vicente", "El Bandido Yankee", "El Gran Legado de Vida",
    "El Mexicano", "El Rey", "El Tequileño", "El Tesoro de Don Felipe", "Elvelo", "Espero Blanco",
    "Fortaleza", "Fuenteseca", "G4", "González 1939", "Gran Dovejo", "Hijole!", "Inspiro",
    "Insólito", "La Pulga", "Lagrimas Del Valle", "Lalo", "Lapis", "Loco", "Los Abuelos",
    "Los Dos", "Mala Vida", "Mijenta", "Montagave", "Nueveuno", "Paladar", "Partida", "Pasote",
    "PM Spirits Tequila", "Primo 1861", "Purasangre", "Santo Fino", "Siembra Valles",
    "Siempre Tequila", "Siete Leguas", "Suave Tequila", "t1 Tequila Uno", "Tanteo Blanco", "Tapatio",
    "Tau", "TCapri Tequila", "Tears of Llorona", "Tequila General Gorostieta", "Tequila Ocho",
    "Terralta", "Tepozan", "Tres Agaves", "Tres Cuatro Cinco", "Viva Mexico", "Volans",
    "Volcan de Mi Tierra", "Wild Common", "Yeyo",
]


def centered(c, text, y, font, size, color):
    c.setFont(font, size)
    c.setFillColor(color)
    c.drawString((A4[0] - stringWidth(text, font, size)) / 2, y, text)


def build():
    pdfmetrics.registerFont(TTFont("TequilaFiSans", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
    pdfmetrics.registerFont(TTFont("TequilaFiSans-Bold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    navy = HexColor("#0B1F3A")
    gold = HexColor("#D4AF37")
    cream = HexColor("#F7F2E8")
    muted = HexColor("#59687A")
    line = HexColor("#DED4BF")
    white = HexColor("#FFFFFF")

    c = canvas.Canvas(str(OUTPUT), pagesize=A4)
    width, height = A4
    c.setTitle("TequilaFi Additive-Free Tequila Guide")
    c.setAuthor("TequilaFi")
    c.setSubject("Independent reference list of additive-free tequila brands")

    c.setFillColor(cream)
    c.rect(0, 0, width, height, fill=1, stroke=0)
    c.setFillColor(navy)
    c.rect(0, height - 150, width, 150, fill=1, stroke=0)
    c.setFillColor(gold)
    c.rect(0, height - 156, width, 6, fill=1, stroke=0)

    centered(c, "TEQUILAFI", height - 58, "TequilaFiSans-Bold", 25, white)
    centered(c, "ADDITIVE-FREE TEQUILA GUIDE", height - 91, "TequilaFiSans-Bold", 15, gold)
    centered(c, "Independent reference • 2026 beta edition", height - 117, "TequilaFiSans", 9, white)

    c.setFillColor(navy)
    c.setFont("TequilaFiSans-Bold", 15)
    c.drawString(46, height - 196, "Verified additive-free tequila brands")
    c.setFont("TequilaFiSans", 9)
    c.setFillColor(muted)
    intro = (
        "The brands below appeared in the Tequila Matchmaker on-site verification program. "
        "Verification status can change, so confirm current production information before purchasing."
    )
    words = intro.split()
    lines, current = [], ""
    for word in words:
        trial = f"{current} {word}".strip()
        if stringWidth(trial, "TequilaFiSans", 9) <= width - 92:
            current = trial
        else:
            lines.append(current)
            current = word
    lines.append(current)
    y = height - 220
    for line_text in lines:
        c.drawString(46, y, line_text)
        y -= 13

    y -= 9
    c.setStrokeColor(line)
    c.line(46, y, width - 46, y)
    y -= 25

    columns = 3
    rows = (len(BRANDS) + columns - 1) // columns
    col_width = (width - 92) / columns
    row_height = 17.1
    for index, brand in enumerate(BRANDS):
        col = index // rows
        row = index % rows
        x = 46 + col * col_width
        brand_y = y - row * row_height
        c.setFillColor(gold)
        c.circle(x + 2.5, brand_y + 2.2, 1.7, fill=1, stroke=0)
        c.setFillColor(navy)
        size = 8.35
        while stringWidth(brand, "TequilaFiSans", size) > col_width - 15 and size > 6.8:
            size -= 0.15
        c.setFont("TequilaFiSans", size)
        c.drawString(x + 9, brand_y, brand)

    footer_y = 54
    c.setStrokeColor(line)
    c.line(46, footer_y + 24, width - 46, footer_y + 24)
    centered(c, f"{len(BRANDS)} brands • Curated for TequilaFi", footer_y, "TequilaFiSans-Bold", 8.5, navy)
    centered(c, "Source: Tequila Matchmaker on-site verification program • Not a guarantee of current status", footer_y - 15, "TequilaFiSans", 7.2, muted)
    centered(c, "For adults of legal drinking age. Enjoy responsibly.", footer_y - 29, "TequilaFiSans", 7.2, muted)

    c.save()
    print(OUTPUT)


if __name__ == "__main__":
    build()
