grey = 'rgb(240, 240, 240)'
dark_grey = 'rgb(204, 204, 204)'
full_accent = 'hsl(204, 98%, 60%)'
light_accent = 'hsl(204, 58%, 77%)'
med_accent = 'hsl(204, 94%, 72%)'
text_color = '#333333'


def gen_squares_four_neighbors_img():
  s = '<svg id="svg2" viewBox="0 0 340 340" xmlns="http://www.w3.org/2000/svg">'
  for r in range(5):
    for c in range(5):
      x = 10 + c * 65
      y = 10 + r * 65
      fill_color = grey
      if (r, c) in [(1, 2), (2, 1), (2, 3), (3, 2)]:
        fill_color = med_accent
      if r == 2 and c == 2:
        fill_color = full_accent
      s += f'<rect x="{x}" y="{y}" width="60" height="60" rx="10" ry="10" style="fill: {fill_color}; stroke: {dark_grey}; stroke-width: 2;"></rect>'
  s += '</svg>'
  with open('grid_four_neighbors.svg', 'w') as f:
    f.write(s)

def gen_squares_eight_directions_img():
  s = '<svg id="svg2" viewBox="0 0 340 340" xmlns="http://www.w3.org/2000/svg">'
  for r in range(5):
    for c in range(5):
      x = 10 + c * 65
      y = 10 + r * 65
      fill_color = grey
      if r == 2 and c == 2:
        fill_color = full_accent
      s += f'<rect x="{x}" y="{y}" width="60" height="60" rx="10" ry="10" style="fill: {fill_color}; stroke: {dark_grey}; stroke-width: 2;"></rect>'
  for theta in range(0, 361, 45):
    s += f'<g transform="rotate({theta}, 170, 170)">'
    s += f'<line x1="170" x2="170" y1="60" y2="170" stroke="{text_color}" stroke-width="10" stroke-linecap="round"/>'
    s += f'<line x1="170" x2="155" y1="60" y2="80" stroke="{text_color}" stroke-width="10" stroke-linecap="round"/>'
    s += f'<line x1="170" x2="185" y1="60" y2="80" stroke="{text_color}" stroke-width="10" stroke-linecap="round"/>'
    s += '</g>'
  s += '</svg>'
  with open('grid_eight_directions.svg', 'w') as f:
    f.write(s)

def gen_hex_img():
  s = '<svg id="svg2" viewBox="0 0 390 360" xmlns="http://www.w3.org/2000/svg">'
  for r in range(5):
    for c in [[1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3, 4], [0, 1, 2, 3], [1, 2, 3]][r]:
      x = 40 + c * 75
      y = 15 + r * 65
      if r % 2:
        x += 37.5
      fill_color = grey
      if (1 <= r <= 3 and 1 <= c <= 2) or (r == 2 and c == 3):
        fill_color = med_accent
      if r == 2 and c == 2:
        fill_color = full_accent
      s += f'''<path stroke="{dark_grey}" fill="{fill_color}" stroke-width="2" d="
      M {x} {y}
      a 10 10 0 0 1 10 0
      l 24.641016151378 14.226497308104
      a 10 10 0 0 1 5 8.6602540378444
      l 0 28.452994616207
      a 10 10 0 0 1 -5 8.6602540378444
      l -24.641016151378 14.226497308104
      a 10 10 0 0 1 -10 0
      l -24.641016151378 -14.226497308104
      a 10 10 0 0 1 -5 -8.6602540378444
      l 0 -28.452994616207
      a 10 10 0 0 1 5 -8.6602540378444
      Z
      "></path>'''
  s += '</svg>'
  with open('hex_six_neighbors.svg', 'w') as f:
    f.write(s)

def gen_hex_six_directions_img():
  s = '<svg id="svg2" viewBox="0 0 390 360" xmlns="http://www.w3.org/2000/svg">'
  for r in range(5):
    for c in [[1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3, 4], [0, 1, 2, 3], [1, 2, 3]][r]:
      x = 40 + c * 75
      y = 15 + r * 65
      if r % 2:
        x += 37.5
      fill_color = grey
      if r == 2 and c == 2:
        fill_color = full_accent
      s += f'''<path stroke="{dark_grey}" fill="{fill_color}" stroke-width="2" d="
      M {x} {y}
      a 10 10 0 0 1 10 0
      l 24.641016151378 14.226497308104
      a 10 10 0 0 1 5 8.6602540378444
      l 0 28.452994616207
      a 10 10 0 0 1 -5 8.6602540378444
      l -24.641016151378 14.226497308104
      a 10 10 0 0 1 -10 0
      l -24.641016151378 -14.226497308104
      a 10 10 0 0 1 -5 -8.6602540378444
      l 0 -28.452994616207
      a 10 10 0 0 1 5 -8.6602540378444
      Z
      "></path>'''
  for theta in range(30, 391, 60):
    s += f'<g transform="rotate({theta}, 195, 180)">'
    s += f'<line x1="195" x2="195" y1="70" y2="180" stroke="{text_color}" stroke-width="10" stroke-linecap="round"/>'
    s += f'<line x1="195" x2="180" y1="70" y2="90" stroke="{text_color}" stroke-width="10" stroke-linecap="round"/>'
    s += f'<line x1="195" x2="210" y1="70" y2="90" stroke="{text_color}" stroke-width="10" stroke-linecap="round"/>'
    s += '</g>'
  s += '</svg>'
  with open('hex_six_directions.svg', 'w') as f:
    f.write(s)

def gen_hex_alt(version):
  versions = [
    (
      [(1, 1), (1, 2), (2, 1), (2, 3), (3, 1), (3, 2), (0, 1), (0, 2), (0, 3), (1, 0), (1, 3), (2, 0), (2, 4), (3, 0), (3, 3), (4, 1), (4, 2), (4, 3)],
      []
    ),
    (
      [(1, 1), (1, 2), (2, 1), (2, 3), (3, 1), (3, 2), (0, 2), (1, 0), (1, 3), (3, 0), (3, 3), (4, 2)],
      []
    ),
    (
      [(1, 1), (1, 2), (2, 1), (2, 3), (3, 1), (3, 2)], 
      [(0, 2), (1, 0), (1, 3), (3, 0), (3, 3), (4, 2)]
    ),
    (
      [(1, 1), (1, 2), (2, 1), (2, 3), (3, 1), (3, 2)], 
      [(0, 1), (0, 3), (2, 0), (2, 4), (4, 1), (4, 3)]
    ),
    (
      [(1, 1), (2, 3), (3, 1)], 
      [(1, 2), (2, 1), (3, 2)]
    ),
    (
      [(1, 1), (1, 2), (2, 1), (2, 3), (3, 1), (3, 2)],
      [(0, 1), (0, 2), (0, 3), (1, 0), (1, 3), (2, 0), (2, 4), (3, 0), (3, 3), (4, 1), (4, 2), (4, 3)]
    ),
  ]
  s = '<svg id="svg2" viewBox="0 0 390 360" xmlns="http://www.w3.org/2000/svg">'
  for r in range(5):
    for c in [[1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3, 4], [0, 1, 2, 3], [1, 2, 3]][r]:
      x = 40 + c * 75
      y = 15 + r * 65
      if r % 2:
        x += 37.5
      fill_color = grey
      if (r, c) in versions[version][0]:
        fill_color = med_accent
      if (r, c) in versions[version][1]:
        fill_color = light_accent
      if r == 2 and c == 2:
        fill_color = full_accent
      s += f'''<path stroke="{dark_grey}" fill="{fill_color}" stroke-width="2" d="
      M {x} {y}
      a 10 10 0 0 1 10 0
      l 24.641016151378 14.226497308104
      a 10 10 0 0 1 5 8.6602540378444
      l 0 28.452994616207
      a 10 10 0 0 1 -5 8.6602540378444
      l -24.641016151378 14.226497308104
      a 10 10 0 0 1 -10 0
      l -24.641016151378 -14.226497308104
      a 10 10 0 0 1 -5 -8.6602540378444
      l 0 -28.452994616207
      a 10 10 0 0 1 5 -8.6602540378444
      Z
      "></path>'''
  s += '</svg>'
  with open(f'hex_neighbors_alt_{version+1}.svg', 'w') as f:
    f.write(s)

gen_squares_four_neighbors_img()
gen_squares_eight_directions_img()
gen_hex_six_directions_img()
gen_hex_img()
for i in range(6):
  gen_hex_alt(i)