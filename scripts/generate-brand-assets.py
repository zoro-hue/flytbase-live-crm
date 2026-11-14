import os
import math
from PIL import Image, ImageDraw, ImageFont

os.makedirs("public/brand", exist_ok=True)
os.makedirs("src/components/brand", exist_ok=True)

# -------------------------------------------------------------------------
# 1. GENERATE SVGS
# -------------------------------------------------------------------------

# A. Standalone Icon (Transparent)
# Speech bubble with bold white F and olive sparkle
flytbase_icon_svg = """<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="sparkle-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Speech Bubble Body -->
  <path
    d="M130 52 C72 52 40 84 40 142 V310 C40 368 72 400 130 400 H160 L132 466 C129 473 135 480 143 477 L248 400 H382 C440 400 472 368 472 310 V142 C472 84 440 52 382 52 Z"
    fill="#151719"
  />

  <!-- Bold White 'F' -->
  <path
    d="M168 140 H316 C326 140 334 148 334 158 V180 C334 190 326 198 316 198 H222 V242 H296 C306 242 314 250 314 260 V282 C314 292 306 300 296 300 H222 V348 C222 358 214 366 204 366 H186 C176 366 168 358 168 348 Z"
    fill="#FFFFFF"
  />

  <!-- Olive-Green 4-point Sparkle ✦ in bottom right -->
  <g filter="url(#sparkle-glow)">
    <path
      d="M344 268 C344 290 358 304 380 304 C358 304 344 318 344 340 C344 318 330 304 308 304 C330 304 344 290 344 268 Z"
      fill="#789600"
    />
    <circle cx="344" cy="304" r="3" fill="#D9F99D" />
  </g>
</svg>"""

with open("public/brand/flytbase-icon.svg", "w", encoding="utf-8") as f:
    f.write(flytbase_icon_svg)

# Favicon SVG (exact same scalable standalone symbol)
with open("public/brand/favicon.svg", "w", encoding="utf-8") as f:
    f.write(flytbase_icon_svg)


# B. Icon in Light Squircle (matching top left reference)
flytbase_squircle_light = """<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Warm Off-White Squircle Card -->
  <rect x="16" y="16" width="480" height="480" rx="120" fill="#ECEFE5" stroke="#E2E5DE" stroke-width="4" />

  <!-- Speech Bubble Body -->
  <path
    d="M142 82 C94 82 66 110 66 158 V302 C66 350 94 378 142 378 H168 L144 434 C141 440 147 446 153 443 L244 378 H370 C418 378 446 350 446 302 V158 C446 110 418 82 370 82 Z"
    fill="#151719"
  />

  <!-- Bold White 'F' -->
  <path
    d="M174 156 H304 C312 156 318 162 318 170 V188 C318 196 312 202 304 202 H222 V240 H286 C294 240 300 246 300 254 V272 C300 280 294 286 286 286 H222 V328 C222 336 216 342 208 342 H190 C182 342 174 336 174 328 Z"
    fill="#FFFFFF"
  />

  <!-- Olive Sparkle -->
  <path
    d="M336 256 C336 276 348 288 368 288 C348 288 336 300 336 320 C336 300 324 288 304 288 C324 288 336 276 336 256 Z"
    fill="#789600"
  />
  <circle cx="336" cy="288" r="2.5" fill="#D9F99D" />
</svg>"""

with open("public/brand/flytbase-icon-squircle.svg", "w", encoding="utf-8") as f:
    f.write(flytbase_squircle_light)


# C. Icon in Olive Green Squircle (matching bottom left reference)
flytbase_squircle_olive = """<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Rich Olive Green Squircle Card -->
  <rect x="16" y="16" width="480" height="480" rx="120" fill="#536F00" stroke="#435900" stroke-width="4" />

  <!-- Speech Bubble Body -->
  <path
    d="M142 82 C94 82 66 110 66 158 V302 C66 350 94 378 142 378 H168 L144 434 C141 440 147 446 153 443 L244 378 H370 C418 378 446 350 446 302 V158 C446 110 418 82 370 82 Z"
    fill="#151719"
  />

  <!-- Bold White 'F' -->
  <path
    d="M174 156 H304 C312 156 318 162 318 170 V188 C318 196 312 202 304 202 H222 V240 H286 C294 240 300 246 300 254 V272 C300 280 294 286 286 286 H222 V328 C222 336 216 342 208 342 H190 C182 342 174 336 174 328 Z"
    fill="#FFFFFF"
  />

  <!-- Olive Sparkle -->
  <path
    d="M336 256 C336 276 348 288 368 288 C348 288 336 300 336 320 C336 300 324 288 304 288 C324 288 336 276 336 256 Z"
    fill="#9EC800"
  />
  <circle cx="336" cy="288" r="2.5" fill="#F7FEE7" />
</svg>"""

with open("public/brand/flytbase-icon-olive.svg", "w", encoding="utf-8") as f:
    f.write(flytbase_squircle_olive)


# D. Full Horizontal Logo (Icon + "FlytBase.")
flytbase_logo_svg = """<svg width="420" height="96" viewBox="0 0 420 96" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="logo-sparkle-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="1.5" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Left Icon: Black speech bubble with rounded corners -->
  <g transform="translate(4, 6)">
    <path
      d="M24 6 C12 6 6 12 6 24 V58 C6 70 12 76 24 76 H30 L25 89 C24.5 90.5 25.8 92 27.2 91 L48 76 H74 C86 76 92 70 92 58 V24 C92 12 86 6 74 6 Z"
      fill="#151719"
    />
    <!-- Bold White 'F' -->
    <path
      d="M31 22 H60 C62 22 63.5 23.5 63.5 25.5 V29.5 C63.5 31.5 62 33 60 33 H42 V41 H55 C57 41 58.5 42.5 58.5 44.5 V48.5 C58.5 50.5 57 52 55 52 H42 V60 C42 62 40.5 63.5 38.5 63.5 H34.5 C32.5 63.5 31 62 31 60 Z"
      fill="#FFFFFF"
    />
    <!-- Olive Sparkle -->
    <g filter="url(#logo-sparkle-glow)">
      <path
        d="M66 46 C66 50 68.5 52.5 72.5 52.5 C68.5 52.5 66 55 66 59 C66 55 63.5 52.5 59.5 52.5 C63.5 52.5 66 50 66 46 Z"
        fill="#789600"
      />
      <circle cx="66" cy="52.5" r="0.8" fill="#D9F99D" />
    </g>
  </g>

  <!-- Wordmark 'FlytBase' + Olive Dot '.' -->
  <!-- Rendered with precise SVG letterform paths for universal cross-platform rendering -->
  <g transform="translate(112, 65)">
    <!-- F -->
    <path d="M 0 -44 H 26 V -38 H 7 V -26 H 23 V -20 H 7 V 0 H 0 Z" fill="#151719" />
    <!-- l -->
    <path d="M 32 -44 H 39 V 0 H 32 Z" fill="#151719" />
    <!-- y -->
    <path d="M 44 -32 H 51 L 58 -10 L 65 -32 H 72 L 61 3 C 58 10 54 13 47 13 H 43 V 7 H 46 C 49 7 51 5 52 2 Z" fill="#151719" />
    <!-- t -->
    <path d="M 78 -38 H 85 V -32 H 93 V -26 H 85 V -8 C 85 -4 87 -2 90 -2 H 93 V 4 H 88 C 81 4 78 1 78 -6 V -26 H 74 V -32 H 78 Z" fill="#151719" />
    <!-- B -->
    <path d="M 102 -44 H 122 C 129 -44 134 -41 134 -34 C 134 -29 130 -25 125 -24 C 131 -23 136 -19 136 -11 C 136 -2 129 0 121 0 H 102 Z M 109 -38 V -26 H 121 C 125 -26 127 -28 127 -32 C 127 -36 125 -38 121 -38 Z M 109 -20 V -6 H 122 C 127 -6 129 -8 129 -13 C 129 -18 127 -20 122 -20 Z" fill="#151719" />
    <!-- a -->
    <path d="M 157 -32 V 0 H 151 V -5 C 148 -1 144 1 138 1 C 130 1 125 -4 125 -11 C 125 -19 131 -23 142 -23 H 150 V -25 C 150 -29 146 -31 140 -31 C 135 -31 131 -29 130 -27 L 127 -32 C 130 -35 136 -37 142 -37 C 152 -37 157 -33 157 -26 Z M 150 -18 H 142 C 135 -18 132 -15 132 -11 C 132 -7 135 -5 139 -5 C 145 -5 150 -9 150 -14 Z" fill="#151719" />
    <!-- s -->
    <path d="M 166 -9 L 172 -11 C 173 -6 177 -4 182 -4 C 187 -4 190 -6 190 -9 C 190 -12 187 -14 180 -16 C 172 -18 166 -22 166 -29 C 166 -35 172 -38 180 -38 C 188 -38 194 -34 195 -28 L 189 -26 C 188 -30 185 -32 180 -32 C 176 -32 173 -30 173 -28 C 173 -25 176 -24 182 -22 C 191 -20 197 -16 197 -10 C 197 -3 190 1 181 1 C 173 1 167 -3 166 -9 Z" fill="#151719" />
    <!-- e -->
    <path d="M 215 -14 H 234 C 233 -7 228 1 218 1 C 207 1 201 -7 201 -18 C 201 -29 208 -37 218 -37 C 228 -37 234 -29 234 -17 V -14 Z M 227 -20 C 227 -27 223 -31 218 -31 C 212 -31 208 -27 208 -20 Z" fill="#151719" />
    <!-- Olive Dot '.' -->
    <circle cx="246" cy="-6" r="6" fill="#536F00" />
  </g>
</svg>"""

with open("public/brand/flytbase-logo.svg", "w", encoding="utf-8") as f:
    f.write(flytbase_logo_svg)


# E. Wordmark Only ("FlytBase.")
flytbase_wordmark_svg = """<svg width="280" height="60" viewBox="0 0 280 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(10, 48)">
    <path d="M 0 -44 H 26 V -38 H 7 V -26 H 23 V -20 H 7 V 0 H 0 Z" fill="#151719" />
    <path d="M 32 -44 H 39 V 0 H 32 Z" fill="#151719" />
    <path d="M 44 -32 H 51 L 58 -10 L 65 -32 H 72 L 61 3 C 58 10 54 13 47 13 H 43 V 7 H 46 C 49 7 51 5 52 2 Z" fill="#151719" />
    <path d="M 78 -38 H 85 V -32 H 93 V -26 H 85 V -8 C 85 -4 87 -2 90 -2 H 93 V 4 H 88 C 81 4 78 1 78 -6 V -26 H 74 V -32 H 78 Z" fill="#151719" />
    <path d="M 102 -44 H 122 C 129 -44 134 -41 134 -34 C 134 -29 130 -25 125 -24 C 131 -23 136 -19 136 -11 C 136 -2 129 0 121 0 H 102 Z M 109 -38 V -26 H 121 C 125 -26 127 -28 127 -32 C 127 -36 125 -38 121 -38 Z M 109 -20 V -6 H 122 C 127 -6 129 -8 129 -13 C 129 -18 127 -20 122 -20 Z" fill="#151719" />
    <path d="M 157 -32 V 0 H 151 V -5 C 148 -1 144 1 138 1 C 130 1 125 -4 125 -11 C 125 -19 131 -23 142 -23 H 150 V -25 C 150 -29 146 -31 140 -31 C 135 -31 131 -29 130 -27 L 127 -32 C 130 -35 136 -37 142 -37 C 152 -37 157 -33 157 -26 Z M 150 -18 H 142 C 135 -18 132 -15 132 -11 C 132 -7 135 -5 139 -5 C 145 -5 150 -9 150 -14 Z" fill="#151719" />
    <path d="M 166 -9 L 172 -11 C 173 -6 177 -4 182 -4 C 187 -4 190 -6 190 -9 C 190 -12 187 -14 180 -16 C 172 -18 166 -22 166 -29 C 166 -35 172 -38 180 -38 C 188 -38 194 -34 195 -28 L 189 -26 C 188 -30 185 -32 180 -32 C 176 -32 173 -30 173 -28 C 173 -25 176 -24 182 -22 C 191 -20 197 -16 197 -10 C 197 -3 190 1 181 1 C 173 1 167 -3 166 -9 Z" fill="#151719" />
    <path d="M 215 -14 H 234 C 233 -7 228 1 218 1 C 207 1 201 -7 201 -18 C 201 -29 208 -37 218 -37 C 228 -37 234 -29 234 -17 V -14 Z M 227 -20 C 227 -27 223 -31 218 -31 C 212 -31 208 -27 208 -20 Z" fill="#151719" />
    <circle cx="246" cy="-6" r="6" fill="#536F00" />
  </g>
</svg>"""

with open("public/brand/flytbase-wordmark.svg", "w", encoding="utf-8") as f:
    f.write(flytbase_wordmark_svg)


# -------------------------------------------------------------------------
# 2. GENERATE AI ROBOT MASCOT SVGS (Idle, Thinking, Speaking)
# -------------------------------------------------------------------------

# Mascot Common Defs & Base Structure
def generate_mascot_svg(state="idle"):
    eye_element = ""
    mouth_element = ""
    extra_effects = ""

    if state == "idle":
        # Friendly circular/pill glowing cyan eyes + curved smiling mouth
        eye_element = """
        <!-- Glowing Cyan Round Eyes -->
        <g filter="url(#cyan-glow)">
          <ellipse cx="68" cy="88" rx="10" ry="12" fill="#38BDF8" />
          <ellipse cx="112" cy="88" rx="10" ry="12" fill="#38BDF8" />
          <!-- Eye Specular Highlights -->
          <circle cx="72" cy="84" r="3.5" fill="#FFFFFF" />
          <circle cx="116" cy="84" r="3.5" fill="#FFFFFF" />
        </g>"""
        mouth_element = """
        <!-- Friendly Smile -->
        <path
          d="M78 110 Q90 118 102 110"
          stroke="#38BDF8"
          stroke-width="5"
          stroke-linecap="round"
          fill="none"
          filter="url(#cyan-glow)"
        />"""

    elif state == "thinking":
        # Three pulsing dots • • • in horizontal row, no mouth
        eye_element = """
        <!-- Thinking 3-Dot Animation LEDs -->
        <g filter="url(#cyan-glow)">
          <circle cx="72" cy="94" r="6" fill="#38BDF8">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="90" cy="94" r="6" fill="#38BDF8">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="108" cy="94" r="6" fill="#38BDF8">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0.8s" repeatCount="indefinite" />
          </circle>
        </g>"""
        mouth_element = ""  # No mouth when thinking

    elif state == "speaking":
        # Happy crescent/arc smiling eyes ^ ^ and animated speaking mouth
        eye_element = """
        <!-- Happy Arc Eyes (Speaking Expression) -->
        <g filter="url(#cyan-glow)">
          <path
            d="M58 92 C62 80 74 80 78 92"
            stroke="#38BDF8"
            stroke-width="6"
            stroke-linecap="round"
            fill="none"
          />
          <path
            d="M102 92 C106 80 118 80 122 92"
            stroke="#38BDF8"
            stroke-width="6"
            stroke-linecap="round"
            fill="none"
          />
        </g>"""
        mouth_element = """
        <!-- Expressive Speaking Mouth -->
        <ellipse
          cx="90"
          cy="112"
          rx="9"
          ry="6"
          fill="#38BDF8"
          filter="url(#cyan-glow)"
        >
          <animate attributeName="ry" values="4;8;4" dur="0.4s" repeatCount="indefinite" />
        </ellipse>"""
        extra_effects = """
        <!-- Speaking Sound Energy Wave Particles -->
        <g filter="url(#cyan-glow)" opacity="0.8">
          <circle cx="150" cy="70" r="3" fill="#84CC16" />
          <circle cx="162" cy="62" r="2" fill="#84CC16" />
          <circle cx="156" cy="80" r="1.5" fill="#38BDF8" />
        </g>"""

    svg = f"""<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Metallic Charcoal Head Gradient -->
    <linearGradient id="robot-body-grad" x1="40" y1="36" x2="160" y2="160" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#2E333A" />
      <stop offset="45%" stopColor="#1E2126" />
      <stop offset="100%" stopColor="#111315" />
    </linearGradient>

    <!-- Antenna Chartreuse Beacon Glow -->
    <filter id="beacon-glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <!-- Cyan Eye & LED Glow -->
    <filter id="cyan-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="3.5" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <linearGradient id="ear-grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#24272C" />
      <stop offset="100%" stopColor="#131417" />
    </linearGradient>
  </defs>

  <!-- Floor Shadow -->
  <ellipse cx="90" cy="184" rx="50" ry="7" fill="rgba(0,0,0,0.18)" />

  <!-- Robot Head & Antenna Group -->
  <g>
    <!-- Antenna Stalk -->
    <rect x="87" y="14" width="6" height="26" rx="3" fill="#24272C" stroke="#181A1D" stroke-width="1.5" />

    <!-- Antenna 4-Point Chartreuse Star Beacon -->
    <g filter="url(#beacon-glow)">
      <path
        d="M90 6 L94 16 L104 18 L94 20 L90 30 L86 20 L76 18 L86 16 Z"
        fill="#A3E635"
      />
      <circle cx="90" cy="18" r="3" fill="#FFFFFF" />
    </g>

    <!-- Left Ear Pod Nub -->
    <rect x="18" y="70" width="14" height="42" rx="7" fill="url(#ear-grad)" stroke="#2F333B" stroke-width="2" />

    <!-- Right Ear Pod Nub -->
    <rect x="148" y="70" width="14" height="42" rx="7" fill="url(#ear-grad)" stroke="#2F333B" stroke-width="2" />

    <!-- Main Speech-Bubble Head Body -->
    <path
      d="M58 40 C42 40 32 50 32 68 V118 C32 136 42 146 58 146 H66 L54 168 C52.5 170.8 55.5 174 58.5 172.5 L88 146 H122 C138 146 148 136 148 118 V68 C148 50 138 40 122 40 Z"
      fill="url(#robot-body-grad)"
      stroke="#3A3F47"
      stroke-width="2.5"
    />

    <!-- Inner Screen Bezel -->
    <rect
      x="46"
      y="54"
      width="88"
      height="76"
      rx="24"
      fill="#090B0D"
      stroke="#1C1F24"
      stroke-width="2"
    />

    {eye_element}
    {mouth_element}
    {extra_effects}
  </g>
</svg>"""
    return svg

with open("public/brand/mascot-idle.svg", "w", encoding="utf-8") as f:
    f.write(generate_mascot_svg("idle"))

with open("public/brand/mascot-thinking.svg", "w", encoding="utf-8") as f:
    f.write(generate_mascot_svg("thinking"))

with open("public/brand/mascot-speaking.svg", "w", encoding="utf-8") as f:
    f.write(generate_mascot_svg("speaking"))


# -------------------------------------------------------------------------
# 3. GENERATE PIXEL-PERFECT PNGS & ICONS VIA PIL
# -------------------------------------------------------------------------

def render_flytbase_icon_png(size=512, bg_type="transparent"):
    scale = 4  # 4x super-sampling for ultra smooth anti-aliased edges
    w = size * scale
    h = size * scale

    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    pad = int(w * 0.04)

    if bg_type == "squircle_light":
        # #ECEFE5 background
        r = int(w * 0.24)
        draw.rounded_rectangle([pad, pad, w - pad, h - pad], radius=r, fill=(236, 239, 229, 255))
    elif bg_type == "squircle_olive":
        # #536F00 background
        r = int(w * 0.24)
        draw.rounded_rectangle([pad, pad, w - pad, h - pad], radius=r, fill=(83, 111, 0, 255))

    # Calculate speech bubble bounds
    if bg_type == "transparent":
        bx0 = int(w * 0.08)
        by0 = int(h * 0.10)
        bx1 = int(w * 0.92)
        by1 = int(h * 0.78)
    else:
        bx0 = int(w * 0.14)
        by0 = int(h * 0.16)
        bx1 = int(w * 0.86)
        by1 = int(h * 0.74)

    bubble_r = int((bx1 - bx0) * 0.22)
    # Main rounded rectangle for speech bubble
    draw.rounded_rectangle([bx0, by0, bx1, by1], radius=bubble_r, fill=(21, 23, 25, 255))

    # Speech bubble tail at bottom left
    if bg_type == "transparent":
        p1 = (int(w * 0.28), by1)
        p2 = (int(w * 0.18), int(h * 0.94))
        p3 = (int(w * 0.44), by1)
    else:
        p1 = (int(w * 0.30), by1)
        p2 = (int(w * 0.22), int(h * 0.88))
        p3 = (int(w * 0.45), by1)

    draw.polygon([p1, p2, p3], fill=(21, 23, 25, 255))

    # Draw bold letter 'F'
    f_left = int(bx0 + (bx1 - bx0) * 0.28)
    f_top = int(by0 + (by1 - by0) * 0.24)
    f_w = int((bx1 - bx0) * 0.44)
    f_h = int((by1 - by0) * 0.54)
    bar_thick = int(f_h * 0.22)

    # Vertical bar of F
    draw.rounded_rectangle(
        [f_left, f_top, f_left + bar_thick, f_top + f_h],
        radius=int(bar_thick * 0.25),
        fill=(255, 255, 255, 255)
    )
    # Top horizontal bar of F
    draw.rounded_rectangle(
        [f_left, f_top, f_left + f_w, f_top + bar_thick],
        radius=int(bar_thick * 0.25),
        fill=(255, 255, 255, 255)
    )
    # Middle horizontal bar of F
    mid_y = int(f_top + f_h * 0.42)
    mid_w = int(f_w * 0.76)
    draw.rounded_rectangle(
        [f_left, mid_y, f_left + mid_w, mid_y + bar_thick],
        radius=int(bar_thick * 0.25),
        fill=(255, 255, 255, 255)
    )

    # Draw olive sparkle ✦ in bottom right of bubble
    sp_cx = int(bx0 + (bx1 - bx0) * 0.74)
    sp_cy = int(by0 + (by1 - by0) * 0.70)
    sp_r = int((bx1 - bx0) * 0.14)

    # 4-point diamond star
    star_points = [
        (sp_cx, sp_cy - sp_r),
        (sp_cx + int(sp_r * 0.28), sp_cy - int(sp_r * 0.28)),
        (sp_cx + sp_r, sp_cy),
        (sp_cx + int(sp_r * 0.28), sp_cy + int(sp_r * 0.28)),
        (sp_cx, sp_cy + sp_r),
        (sp_cx - int(sp_r * 0.28), sp_cy + int(sp_r * 0.28)),
        (sp_cx - sp_r, sp_cy),
        (sp_cx - int(sp_r * 0.28), sp_cy - int(sp_r * 0.28)),
    ]
    sparkle_color = (158, 200, 0, 255) if bg_type == "squircle_olive" else (120, 150, 0, 255)
    draw.polygon(star_points, fill=sparkle_color)
    draw.ellipse(
        [sp_cx - int(sp_r * 0.18), sp_cy - int(sp_r * 0.18), sp_cx + int(sp_r * 0.18), sp_cy + int(sp_r * 0.18)],
        fill=(240, 254, 215, 255)
    )

    # Downsample with high quality Lanczos anti-aliasing
    final_img = img.resize((size, size), Image.Resampling.LANCZOS)
    return final_img

# Generate PNG Sizes
img_512 = render_flytbase_icon_png(512, "transparent")
img_512.save("public/brand/icon-512x512.png")

img_180 = render_flytbase_icon_png(180, "squircle_light")
img_180.save("public/brand/apple-touch-icon.png")

img_64 = render_flytbase_icon_png(64, "transparent")
img_64.save("public/brand/favicon-64x64.png")

img_32 = render_flytbase_icon_png(32, "transparent")
img_32.save("public/brand/favicon-32x32.png")

img_16 = render_flytbase_icon_png(16, "transparent")
img_16.save("public/brand/favicon-16x16.png")

# Also save root favicons for direct browser fetch
img_32.save("public/favicon-32x32.png")
img_16.save("public/favicon-16x16.png")
img_180.save("public/apple-touch-icon.png")

# Multi-resolution favicon.ico containing 16, 32, 48, 64
img_48 = render_flytbase_icon_png(48, "transparent")
img_32.save(
    "public/favicon.ico",
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48), (64, 64)],
    append_images=[img_16, img_48, img_64]
)
# Also copy to src/app/favicon.ico
img_32.save(
    "src/app/favicon.ico",
    format="ICO",
    sizes=[(16, 16), (32, 32), (48, 48), (64, 64)],
    append_images=[img_16, img_48, img_64]
)

print("Brand assets successfully generated!")
