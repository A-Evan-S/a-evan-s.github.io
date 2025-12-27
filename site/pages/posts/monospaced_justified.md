---
title: Monospaced Justification
date: 2025-12-26
summary: Playing around with whitespace characters to produce justified text in monospace fonts
---

## Justification

Justified text stretches or compresses the whitespace between words such that the left and right ends of each line are aligned. It's common in newspapers, books, and other print media. I assume this has something to do with printing presses or something, but I didn't look it up.

<div style="width: 80%; margin: 0 auto; display: flex; flex-wrap: wrap;">
  <div style="padding: 10px; flex: 1; min-width: 200px;">
    <h4 style="text-align: center; margin-top: 0;">Left Aligned</h4>
    <p style="text-align: start; font-size: 0.7em;">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </p>
  </div>

  <div style="padding: 10px; flex: 1; min-width: 200px;">
    <h4 style="text-align: center; margin-top: 0;">Justified</h4>
    <p style="text-align: justify; font-size: 0.7em;">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </p>
  </div>
</div>



Monospaced fonts attempt to provide uniformity to text by making each character take up the same width on the page. When using these fonts for most applications we opt for "flush left" alignment, where the left side of each line is aligned, but the right side remains ragged.

<div class="centered-pre-container" style="text-align: center; overflow-x: auto;">
<pre style="display: inline-block; text-align: left;">
This is some sample text written to     
demonstrate the different justification 
versions.                               
</pre>
</div>

We can approximate justified text by adding additional spaces between words, forcing both sides into alignment. By distributing the spaces as evenly as possible, we get reasonably good results.

<div class="centered-pre-container" style="text-align: center; overflow-x: auto;">
<pre style="display: inline-block; text-align: left;">
This  is  some  sample  text  written to
demonstrate  the different justification
versions.                               
</pre>
</div>

This method is a fairly common programming exercise[^leetcode], but produces notably imbalanced spacing: notice in the example above how the space between "demonstrate" and "the" is twice as large as the space between "the" and "different".

We can do better. While many fonts are described as "monospaced", those with Unicode support are rarely consistent in keeping *every* character to a uniform width. If you've ever tried to include emojis in code, you've likely come across this.

```python
print('🙂-aligned')
print('misaligned')
```

While this font non-uniformity is often the source of some subtle annoyance, it also allows us to produce the following evenly-justified, "monospaced" text.

<div class="centered-pre-container" style="text-align: center; overflow-x: auto;">
<pre style="display: inline-block; text-align: left;">
This   is   some   sample   text   written   to
demonstrate  the  different  justification
versions.                               
</pre>
</div>

## How does this work?

Rather than limit ourselves to the standard `' '` space character, the above makes use of:

* U+0020: `' '` - 1 character width
* U+2009: `' '` - 1/3 of a character width
* U+202F: `' '` - 1/2 of a character width

The first line has 6 gaps and is 5 full character widths from the end of the line. We can add to each gap one U+2009 character and one U+202F character for a total gap width of $\frac{11}{6}$ characters.

Similarly, the second line has 3 gaps and is 1 character width from the end of the line. Adding a single U+2009 character to each gap to create gap widths of $\frac{4}{3}$ fills the line.

## Generalizing

The good news is that we have a lot more whitespace characters to work with, so we have more granularity than just the characters in the example above. The bad news is that many of their widths overlap and that different fonts represent the various whitespace characters differently.

I wrote a script to render[^render] all the whitespace characters in a variety of fonts to produce the following table, expressing each character's width as a ratio to the width of a regular space (U+0020).

<table>
    <thead>
        <tr>
            <th></th>
            <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+00A0</th>
            <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+2000</th>
            <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+2001</th>
            <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+2002</th>
            <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+2003</th>
            <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+2004</th>
            <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+2005</th>
            <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+2006</th>
            <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+2007</th>
            <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+2008</th>
            <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+2009</th>
            <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+200A</th>
            <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+202F</th>
            <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+205F</th>
            <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+3000</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Courier New</td>
            <td>$1$</td>
            <td>$\frac{5}{6}$</td>
            <td>$\frac{5}{3}$</td>
            <td>$\frac{5}{6}$</td>
            <td>$\frac{5}{3}$</td>
            <td>$\frac{5}{9}$</td>
            <td>$\frac{5}{12}$</td>
            <td>$\frac{5}{18}$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$\frac{1}{3}$</td>
            <td>$\frac{5}{48}$</td>
            <td>$\frac{1}{2}$</td>
            <td>$\frac{10}{27}$</td>
            <td>$\frac{5}{3}$</td>
        </tr>
        <tr>
            <td>Consolas</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$\frac{171}{94}$</td>
        </tr>
        <tr>
            <td>Monaco</td>
            <td>$1$</td>
            <td>$\frac{5}{6}$</td>
            <td>$\frac{5}{3}$</td>
            <td>$\frac{5}{6}$</td>
            <td>$\frac{5}{3}$</td>
            <td>$\frac{5}{9}$</td>
            <td>$\frac{5}{12}$</td>
            <td>$\frac{5}{18}$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$\frac{1}{3}$</td>
            <td>$\frac{5}{48}$</td>
            <td>$\frac{1}{2}$</td>
            <td>$\frac{10}{27}$</td>
            <td>$\frac{5}{3}$</td>
        </tr>
        <tr>
            <td>Menlo</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$\frac{98}{59}$</td>
        </tr>
        <tr>
            <td>Fira Mono</td>
            <td>$1$</td>
            <td>$\frac{5}{6}$</td>
            <td>$\frac{5}{3}$</td>
            <td>$\frac{5}{6}$</td>
            <td>$\frac{5}{3}$</td>
            <td>$\frac{5}{9}$</td>
            <td>$\frac{5}{12}$</td>
            <td>$\frac{5}{18}$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$\frac{1}{3}$</td>
            <td>$\frac{5}{48}$</td>
            <td>$\frac{1}{2}$</td>
            <td>$\frac{10}{27}$</td>
            <td>$\frac{5}{3}$</td>
        </tr>
        <tr>
            <td>Source Code Pro</td>
            <td>$1$</td>
            <td>$\frac{5}{6}$</td>
            <td>$\frac{5}{3}$</td>
            <td>$\frac{5}{6}$</td>
            <td>$\frac{5}{3}$</td>
            <td>$\frac{5}{9}$</td>
            <td>$\frac{5}{12}$</td>
            <td>$\frac{5}{18}$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$\frac{1}{3}$</td>
            <td>$\frac{5}{48}$</td>
            <td>$1$</td>
            <td>$\frac{10}{27}$</td>
            <td>$\frac{5}{3}$</td>
        </tr>
        <tr>
            <td>Roboto Mono</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$\frac{1}{2}$</td>
            <td>$\frac{10}{27}$</td>
            <td>$\frac{5}{3}$</td>
        </tr>
        <tr>
            <td>JetBrains Mono</td>
            <td>$1$</td>
            <td>$\frac{5}{6}$</td>
            <td>$1$</td>
            <td>$\frac{5}{6}$</td>
            <td>$\frac{5}{3}$</td>
            <td>$\frac{5}{9}$</td>
            <td>$\frac{5}{12}$</td>
            <td>$\frac{5}{18}$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$\frac{1}{3}$</td>
            <td>$\frac{5}{48}$</td>
            <td>$\frac{1}{2}$</td>
            <td>$\frac{10}{27}$</td>
            <td>$\frac{5}{3}$</td>
        </tr>
        <tr>
            <td>IBM Plex Mono</td>
            <td>$1$</td>
            <td>$\frac{5}{6}$</td>
            <td>$\frac{5}{3}$</td>
            <td>$\frac{5}{6}$</td>
            <td>$\frac{5}{3}$</td>
            <td>$\frac{5}{9}$</td>
            <td>$\frac{5}{12}$</td>
            <td>$\frac{5}{18}$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$\frac{1}{3}$</td>
            <td>$\frac{5}{48}$</td>
            <td>$\frac{1}{2}$</td>
            <td>$\frac{10}{27}$</td>
            <td>$\frac{5}{3}$</td>
        </tr>
        <tr>
            <td>Cascadia Mono</td>
            <td>$1$</td>
            <td>$\frac{64}{75}$</td>
            <td>$\frac{128}{75}$</td>
            <td>$\frac{64}{75}$</td>
            <td>$\frac{128}{75}$</td>
            <td>$\frac{33}{58}$</td>
            <td>$\frac{32}{75}$</td>
            <td>$\frac{27}{95}$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$\frac{14}{41}$</td>
            <td>$\frac{8}{75}$</td>
            <td>$\frac{1}{2}$</td>
            <td>$\frac{11}{29}$</td>
            <td>$\frac{128}{75}$</td>
        </tr>
        <tr>
            <td>SF Mono</td>
            <td>$1$</td>
            <td>$\frac{55}{68}$</td>
            <td>$\frac{55}{34}$</td>
            <td>$\frac{55}{68}$</td>
            <td>$\frac{55}{34}$</td>
            <td>$\frac{48}{89}$</td>
            <td>$\frac{36}{89}$</td>
            <td>$\frac{24}{89}$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$\frac{11}{34}$</td>
            <td>$\frac{9}{89}$</td>
            <td>$\frac{1}{2}$</td>
            <td>$\frac{32}{89}$</td>
            <td>$\frac{55}{34}$</td>
        </tr>
        <tr>
            <td>Inconsolata</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$\frac{2}{1}$</td>
            <td>$1$</td>
            <td>$\frac{2}{1}$</td>
            <td>$\frac{2}{3}$</td>
            <td>$\frac{1}{2}$</td>
            <td>$\frac{1}{3}$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$\frac{1}{2}$</td>
            <td>$\frac{4}{9}$</td>
            <td>$\frac{2}{1}$</td>
        </tr>
        <tr>
            <td>DejaVu Sans Mono</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$\frac{98}{59}$</td>
        </tr>
        <tr>
            <td>Ubuntu Mono</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$\frac{2}{1}$</td>
            <td>$1$</td>
            <td>$\frac{2}{1}$</td>
            <td>$\frac{2}{3}$</td>
            <td>$\frac{1}{2}$</td>
            <td>$\frac{1}{3}$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$\frac{2}{5}$</td>
            <td>$\frac{1}{8}$</td>
            <td>$\frac{1}{2}$</td>
            <td>$\frac{4}{9}$</td>
            <td>$\frac{2}{1}$</td>
        </tr>
        <tr>
            <td>Droid Sans Mono</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$\frac{1}{2}$</td>
            <td>$\frac{10}{27}$</td>
            <td>$\frac{5}{3}$</td>
        </tr>
        <tr>
            <td>Liberation Mono</td>
            <td>$1$</td>
            <td>$\frac{5}{6}$</td>
            <td>$\frac{5}{3}$</td>
            <td>$\frac{5}{6}$</td>
            <td>$\frac{5}{3}$</td>
            <td>$\frac{5}{9}$</td>
            <td>$\frac{5}{12}$</td>
            <td>$\frac{5}{18}$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$\frac{1}{3}$</td>
            <td>$\frac{5}{48}$</td>
            <td>$\frac{1}{2}$</td>
            <td>$\frac{10}{27}$</td>
            <td>$\frac{5}{3}$</td>
        </tr>
        <tr>
            <td>Noto Sans Mono</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$\frac{5}{3}$</td>
        </tr>
        <tr>
            <td>PT Mono</td>
            <td>$1$</td>
            <td>$\frac{5}{6}$</td>
            <td>$\frac{5}{3}$</td>
            <td>$\frac{5}{6}$</td>
            <td>$\frac{5}{3}$</td>
            <td>$\frac{5}{9}$</td>
            <td>$\frac{5}{12}$</td>
            <td>$\frac{5}{18}$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$\frac{1}{3}$</td>
            <td>$\frac{5}{48}$</td>
            <td>$\frac{1}{2}$</td>
            <td>$\frac{10}{27}$</td>
            <td>$\frac{5}{3}$</td>
        </tr>
        <tr>
            <td>Anonymous Pro</td>
            <td>$1$</td>
            <td>$\frac{87}{95}$</td>
            <td>$\frac{174}{95}$</td>
            <td>$\frac{87}{95}$</td>
            <td>$\frac{174}{95}$</td>
            <td>$\frac{58}{95}$</td>
            <td>$\frac{38}{83}$</td>
            <td>$\frac{29}{95}$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$\frac{26}{71}$</td>
            <td>$\frac{11}{96}$</td>
            <td>$\frac{1}{2}$</td>
            <td>$\frac{35}{86}$</td>
            <td>$\frac{174}{95}$</td>
        </tr>
        <tr>
            <td>Hack</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$\frac{98}{59}$</td>
        </tr>
        <tr>
            <td>Space Mono</td>
            <td>$1$</td>
            <td>$\frac{67}{82}$</td>
            <td>$\frac{67}{41}$</td>
            <td>$\frac{67}{82}$</td>
            <td>$\frac{67}{41}$</td>
            <td>$\frac{49}{90}$</td>
            <td>$\frac{29}{71}$</td>
            <td></td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$\frac{17}{52}$</td>
            <td>$\frac{5}{49}$</td>
            <td>$\frac{1}{2}$</td>
            <td></td>
            <td>$\frac{67}{41}$</td>
        </tr>
        <tr>
            <td>Overpass Mono</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$\frac{125}{77}$</td>
        </tr>
        <tr>
            <td>Victor Mono</td>
            <td>$1$</td>
            <td>$\frac{5}{6}$</td>
            <td>$\frac{5}{3}$</td>
            <td>$\frac{5}{6}$</td>
            <td>$\frac{5}{3}$</td>
            <td>$\frac{5}{9}$</td>
            <td>$\frac{5}{12}$</td>
            <td>$\frac{5}{18}$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$\frac{1}{3}$</td>
            <td>$\frac{5}{48}$</td>
            <td>$\frac{1}{2}$</td>
            <td>$\frac{10}{27}$</td>
            <td>$\frac{5}{3}$</td>
        </tr>
        <tr>
            <td>CommitMono</td>
            <td>$1$</td>
            <td>$\frac{5}{6}$</td>
            <td>$\frac{5}{3}$</td>
            <td>$\frac{5}{6}$</td>
            <td>$\frac{5}{3}$</td>
            <td>$\frac{5}{9}$</td>
            <td>$\frac{5}{12}$</td>
            <td>$\frac{5}{18}$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$\frac{1}{3}$</td>
            <td>$\frac{5}{48}$</td>
            <td>$\frac{1}{2}$</td>
            <td>$\frac{10}{27}$</td>
            <td>$\frac{5}{3}$</td>
        </tr>
        <tr>
            <td>Lucida Console</td>
            <td>$1$</td>
            <td>$\frac{39}{47}$</td>
            <td>$\frac{78}{47}$</td>
            <td>$\frac{39}{47}$</td>
            <td>$\frac{78}{47}$</td>
            <td>$\frac{26}{47}$</td>
            <td>$\frac{39}{94}$</td>
            <td>$\frac{13}{47}$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td></td>
            <td></td>
            <td>$\frac{1}{2}$</td>
            <td>$\frac{31}{84}$</td>
            <td>$\frac{78}{47}$</td>
        </tr>
        <tr>
            <td>Lucida Sans Typewriter</td>
            <td>$1$</td>
            <td>$\frac{39}{47}$</td>
            <td>$\frac{78}{47}$</td>
            <td>$\frac{39}{47}$</td>
            <td>$\frac{78}{47}$</td>
            <td>$\frac{26}{47}$</td>
            <td>$\frac{39}{94}$</td>
            <td>$\frac{13}{47}$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td></td>
            <td></td>
            <td>$\frac{1}{2}$</td>
            <td>$\frac{31}{84}$</td>
            <td>$\frac{78}{47}$</td>
        </tr>
        <tr>
            <td>Andale Mono</td>
            <td>$1$</td>
            <td>$\frac{5}{6}$</td>
            <td>$\frac{5}{3}$</td>
            <td>$\frac{5}{6}$</td>
            <td>$\frac{5}{3}$</td>
            <td>$\frac{5}{9}$</td>
            <td>$\frac{5}{12}$</td>
            <td>$\frac{5}{18}$</td>
            <td>$1$</td>
            <td>$1$</td>
            <td>$\frac{1}{3}$</td>
            <td>$\frac{5}{48}$</td>
            <td>$\frac{1}{2}$</td>
            <td>$\frac{10}{27}$</td>
            <td>$\frac{5}{3}$</td>
        </tr>
    </tbody>
</table>

While the ratios here match to $\epsilon \le 0.1\%$, it's notable that some fonts are much closer to exact integer ratios than others. In most situations, the small difference at the subpixel level will still result in the right ends of the lines aligning to the nearest pixel.

Notably, most of these fonts are fairly consistent in preserving the width ratios *between* some of these whitespace characters (e.g. `THREE-PER-EM SPACE` is almost exactly $\frac{1}{3}$ of the `EM SPACE`). However, they are don't all have the same ratio of these whitespace characters to the standard space character. 


## Solving

To see how we can find the appropriate combination of whitespace characters to justify a given line of text, let's work through an example using the most common ratios from the table above:

<table>
    <tr>
        <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+00A0</th>
        <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+2000</th>
        <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+2001</th>
        <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+2002</th>
        <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+2003</th>
        <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+2004</th>
        <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+2005</th>
        <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+2006</th>
        <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+2007</th>
        <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+2008</th>
        <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+2009</th>
        <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+200A</th>
        <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+202F</th>
        <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+205F</th>
        <th style="writing-mode:vertical-rl; padding: 6px 5px;">U+3000</th>
    </tr>
    <tr>
        <td>$1$</td>
        <td>$\frac{5}{6}$</td>
        <td>$\frac{5}{3}$</td>
        <td>$\frac{5}{6}$</td>
        <td>$\frac{5}{3}$</td>
        <td>$\frac{5}{9}$</td>
        <td>$\frac{5}{12}$</td>
        <td>$\frac{5}{18}$</td>
        <td>$1$</td>
        <td>$1$</td>
        <td>$\frac{1}{3}$</td>
        <td>$\frac{5}{48}$</td>
        <td>$\frac{1}{2}$</td>
        <td>$\frac{10}{27}$</td>
        <td>$\frac{5}{3}$</td>
    </tr>
</table>

We can first reduce our character set by eliminating any characters whose widths are a multiple of another character. That leaves us just with:

<table>
    <tr>
        <th>U+2006</th>
        <th>U+2009</th>
        <th>U+200A</th>
        <th>U+202F</th>
        <th>U+205F</th>
    </tr>
    <tr>
        <td style="text-align: center">$\frac{5}{18}$</td>
        <td style="text-align: center">$\frac{1}{3}$</td>
        <td style="text-align: center">$\frac{5}{48}$</td>
        <td style="text-align: center">$\frac{1}{2}$</td>
        <td style="text-align: center">$\frac{10}{27}$</td>
    </tr>
</table>

Getting a common denominator, we see we have:

<table>
    <tr>
        <th>U+2006</th>
        <th>U+2009</th>
        <th>U+200A</th>
        <th>U+202F</th>
        <th>U+205F</th>
    </tr>
    <tr>
        <td style="text-align: center">$\frac{120}{432}$</td>
        <td style="text-align: center">$\frac{144}{432}$</td>
        <td style="text-align: center">$\frac{45}{432}$</td>
        <td style="text-align: center">$\frac{216}{432}$</td>
        <td style="text-align: center">$\frac{160}{432}$</td>
    </tr>
</table>

If our line has $m$ total spaces to distribute into $n$ total gaps, the ideal version of our problem can be defined as:

> Find a way to represent $\frac{432m}{n}$ as an integer linear combination of $120$, $144$, $45$, $216$, and $160$

If $\frac{432m}{n}$ is non-integral, then there will be no solution. If it is an integer, this turns into a variation of the [change making problem](https://en.wikipedia.org/wiki/Change-making_problem) where we're just interested in feasibility without any optimization.

Using the above numbers, we can see which scenarios will be solvable:

![Graph of working values](\assets\images\unweighted.png "what does this do again?"){: width="500"}

This doesn't look too bad at first; a good amount of the cases are solvable. However, we have to account for the frequency of different combinations. Since the number of extra spaces is upper-bounded by typical word length, we see most lines needing 0–5 extra spaces, and a typical line might consist of 10–20 words. I ran the plaintext copy of Alice's Adventures in Wonderland[^alice] through this algorithm and, only focusing on text which would be justified (excluding the last line of each paragraph), we can weight the above chart by frequency of occurence.

![Graph of working values, weighted](\assets\images\weighted.png "what does this do again?"){: width="500"}

Around 46.6% of the lines can be justified with these space characters. For reference 17.8% of lines were justified without any additional whitespace characters. Not terrible, but lots of room for improvement.

## Imperfect Solutions

### Word Shifting

Before sullying our approach with non-uniform gaps, we can try altering the number of words which get placed on a line. By default, we place as many words as can fit on a given line width, providing at least one full space between each. However, we can opt to push words onto the next line, widening the gaps of the current line in the process. This both reduces the number of gaps and increases the extra spaces to distribute, which allows us to move a line to a new (hopefully solvable area) on our graph.

Taking the original example again, we can move "written" and "to" to the second line, and "justification" to the third, which enables us to justify the text evenly using only regular space characters.

<div class="centered-pre-container" style="text-align: center; overflow-x: auto;">
<pre style="display: inline-block; text-align: left;">
This     is     some     sample     text
written  to  demonstrate  the  different
justification versions.
</pre>
</div>

Trying this on our Alice in Wonderland text, we're effectively able to shift the frequencies of different values on the graph to move as many as possible to solvable positions.

![Graph of working values, removed words](\assets\images\word_removals.png "what does this do again?"){: width="600"}

This shifting of words between lines gets us to 100% justification with an allowance of 3 moved words:

| Word Shifts | Percent Justified |
| ----------- | ----------------- |
| 0           | 46.6%             |
| 1           | 75.4%             |
| 2           | 99.0%             |
| 3           | 100%              |

As for the actual results, even at 3 moved words, most paragraphs look reasonable, but there are some eye-sores.

<div class="centered-pre-container" style="text-align: center; overflow-x: auto;">
<pre style="display: inline-block; text-align: left;">
She      ate      a      little      bit,      and      said      anxiously      to      herself,      “Which      way?      Which
way?”,   holding   her   hand   on   the   top   of   her   head   to   feel   which   way   it   was
growing,   and   she   was   quite   surprised   to   find   that   she   remained   the   same
size:      to      be      sure,      this      generally      happens      when      one      eats      cake,      but      Alice
had            got            so            much            into            the            way            of            expecting            nothing
but     out-of-the-way     things     to     happen,     that     it     seemed     quite     dull     and
stupid for life to go on in the common way.
</div>
</pre>

Here, "but out-of-the-way" was pushed to the next line, creating some glaringly large gaps, especially with all the short words in the sentence.

### Non-uniform Gaps

Instead of adjusting the splitting of words into lines, we can go back to an approach more similar to the original solution of always reaching full justification but accepting varied gap sizes. However, with the addition of the various whitespace characters, we can get a more uniform spacing than was possible with regular spaces alone.

First we need to define what we're optimizing for. Two definitions for an objective function come to mind:

1. Minimize the difference between the largest gap width and the smallest
2. Minimize the variance of the gap widths

In each example I've tried, these two objectives converge to the same solution, but I haven't been able to prove that generally. I opted to solve for minimizing the variance.

In either case, the first step is identifying all the reachable gap widths for a given set of whitespace characters. This can be solved again using the change making algorithm, this time finding the total feasible space. For example, using the numbers above (where a single space is 432 units), we can make gaps of size:

$$0, 45, 90, 120, 135, 144, 160, 165, 180, 189, 205, 210, 216, 225, 234, 240, 250, 255 ...$$

For the algorithm itself, we'll use a solution that greedily searches feasible gaps closest to the ideal ratio, pruning cases that would put the overall variance above the best found thus far. Here's the implementation I used:

```python
def solve(text, line_length, unit_size, whitespaces):
    words = text.split()
    whitespace_needed = (line_length - sum(map(len, words))) * unit_size
    num_gaps = len(words) - 1
    feasible_gaps = feasible(whitespace_needed, whitespaces)
    ideal_gap_size = whitespace_needed / num_gaps
    feasible_sorted = sorted(
        feasible_gaps.keys(),
        key=lambda gap: abs(gap - ideal_gap_size)
    )

    best_variance = float('inf')

    def find_gaps(length, num_gaps, idx, acc_variance):
        nonlocal best_variance
        if acc_variance >= best_variance:
            return None
        if length == 0:
            best_variance = min(best_variance, acc_variance)
            return []
        if num_gaps == 0 or idx >= len(feasible_sorted):
            return None

        gap_size = feasible_sorted[idx]
        if gap_size > length:
            return find_gaps(length, num_gaps, idx + 1, acc_variance)

        new_variance = acc_variance + (ideal_gap_size - gap_size) ** 2
        use_gap = find_gaps(length - gap_size, num_gaps - 1, idx, new_variance)
        skip_gap = find_gaps(length, num_gaps, idx + 1, acc_variance)

        if use_gap is None:
            return skip_gap
        if skip_gap is None:
            return [gap_size] + use_gap
        return skip_gap  # min due to pruning

    gap_widths = find_gaps(whitespace_needed, num_gaps, 0, 0)
    gaps = [feasible_gaps[w] for w in gap_widths]
    result = ''.join(word + gap for word, gap in zip(words, gaps)) + words[-1]

    return result, best_variance
```

Using this approach, we get the following result on the previously attempted paragraph:

<div class="centered-pre-container" style="text-align: center; overflow-x: auto;">
<pre style="display: inline-block; text-align: left;">
She         ate         a         little         bit,         and         said         anxiously         to         herself,         “Which         way?         Which
way?”,      holding      her      hand      on      the      top      of      her      head      to      feel      which   way   it   was
growing,      and      she      was      quite      surprised      to      find      that      she      remained      the      same
size:         to         be         sure,         this         generally         happens         when         one         eats         cake,         but         Alice
had     got     so     much     into     the     way     of     expecting     nothing     but        out-of-the-way
things        to        happen,        that        it        seemed        quite        dull        and        stupid        for        life        to        go
on in the common way.
</div>
</pre>

It might not be as true to the aim of having uniform gap widths, but just looking visually I couldn't tell which lines were uneven (out of the 6 justified lines, half are non-uniform in their spacing[^answer]).

While this algorithm worked fine for fonts with simple whitespace size ratios, it blows up for fonts like Cascadia Mono or Lucida Console with their more complex ratios as seen in the earlier table. I first tried to cap the feasible gaps to the 100 closest to the ideal gap size,  $\frac{\text{number of spaces}}{\text{number of gaps}}$. This is highly likely to get us the optimal solution, and did reduce the search space, but still failed on certain inputs with certain fonts. I did find an alternative approach, though I haven't been able to prove to myself that it's guaranteed to produce the same result in general. In all the cases I found running the above solution, the resulting lines only ever used two different gap-sizes. Adding this as a constraint drastically reduces the search space, and is what is implemented in the tool below.

## Try It Out

If you want to try out any of these monospaced justification techniques on your own text, you can give it a try with this tool. I don't properly know javascript, so this was my attempt to translate from the python I used to originally test this idea. If you notice any issues, let me know.

<div id="monospace-justifier">
    <div id="justifier-options">
        <div class="option-group">
            <label for="justifier-font-select">Font:</label>
            <select name="justifier-font" id="justifier-font-select" style="font-family: 'Fira Mono';">
                <option value="Courier New" style="font-family: 'Courier New';">Courier New</option>
                <option value="Consolas" style="font-family: 'Consolas';">Consolas</option>
                <option value="Monaco" style="font-family: 'Monaco';">Monaco</option>
                <option value="Menlo" style="font-family: 'Menlo';">Menlo</option>
                <option value="Fira Mono" style="font-family: 'Fira Mono';">Fira Mono</option>
                <option value="Source Code Pro" style="font-family: 'Source Code Pro';">Source Code Pro</option>
                <option value="Roboto Mono" style="font-family: 'Roboto Mono';">Roboto Mono</option>
                <option value="JetBrains Mono" style="font-family: 'JetBrains Mono';">JetBrains Mono</option>
                <option value="IBM Plex Mono" style="font-family: 'IBM Plex Mono';">IBM Plex Mono</option>
                <option value="Cascadia Mono" style="font-family: 'Cascadia Mono';">Cascadia Mono</option>
                <option value="SF Mono" style="font-family: 'SF Mono';">SF Mono</option>
                <option value="Inconsolata" style="font-family: 'Inconsolata';">Inconsolata</option>
                <option value="DejaVu Sans Mono" style="font-family: 'DejaVu Sans Mono';">DejaVu Sans Mono</option>
                <option value="Ubuntu Mono" style="font-family: 'Ubuntu Mono';">Ubuntu Mono</option>
                <option value="Droid Sans Mono" style="font-family: 'Droid Sans Mono';">Droid Sans Mono</option>
                <option value="Liberation Mono" style="font-family: 'Liberation Mono';">Liberation Mono</option>
                <option value="Noto Sans Mono" style="font-family: 'Noto Sans Mono';">Noto Sans Mono</option>
                <option value="PT Mono" style="font-family: 'PT Mono';">PT Mono</option>
                <option value="Anonymous Pro" style="font-family: 'Anonymous Pro';">Anonymous Pro</option>
                <option value="Hack" style="font-family: 'Hack';">Hack</option>
                <option value="Space Mono" style="font-family: 'Space Mono';">Space Mono</option>
                <option value="Overpass Mono" style="font-family: 'Overpass Mono';">Overpass Mono</option>
                <option value="Victor Mono" style="font-family: 'Victor Mono';">Victor Mono</option>
                <option value="CommitMono" style="font-family: 'CommitMono';">CommitMono</option>
                <option value="Lucida Console" style="font-family: 'Lucida Console';">Lucida Console</option>
                <option value="Lucida Sans Typewriter" style="font-family: 'Lucida Sans Typewriter';">Lucida Sans Typewriter</option>
                <option value="Andale Mono" style="font-family: 'Andale Mono';">Andale Mono</option>
            </select>
        </div>
        <div class="option-group">
            <label for="justifier-num-cols">Columns:</label>
            <input type="number" id="justifier-num-cols" value="40" />
        </div>
        <div class="option-group">
            <label for="justifier-mode-select">Mode:</label>
            <select name="justifier-mode" id="justifier-mode-select">
                <option value="Spaces Only">Spaces Only</option>
                <option value="Word Shifting">Word Shifting</option>
                <option value="Non-uniform Gaps">Non-uniform Gaps</option>
            </select>
        </div>
        <button id="justify-button">Justify</button>
    </div>
    <textarea id="text-to-justify" placeholder="Enter text to justify..."  style="font-family: 'Courier New';"></textarea>
    <textarea id="justified-text" readonly wrap="off"  style="font-family: 'Courier New';"></textarea>
</div>

<script src="/assets/js/justifier_tool.js"></script>

<style>
#monospace-justifier {
  padding: 20px 20px 10px 20px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fafafa;
  max-width: 100%;
}

#justifier-options {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  flex-wrap: wrap;
  align-items: center;
}

.option-group {
  display: flex;
  align-items: center;
  gap: 5px;
}

.option-group label {
  font-size: 14px;
  color: #555;
}

#justifier-options select,
#justifier-options input,
#justifier-options button {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  background-color: white;
}

#justifier-options button {
  background-color: #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-left: auto;  /* pushes button to the right if there's room */
}

#justifier-options button:hover {
  background-color: #e3e3e3;
}

#justifier-num-cols {
  width: 60px;
}

#text-to-justify,
#justified-text {
    font-family: "Fira Mono", "Jetbrains Mono NL", Monaco, "Lucida Console", "Courier New", monospace;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 3px;
    field-sizing: content;
    resize: none;
    min-height: 5lh;
    font-size: 13px;
    line-height: 1.4;
    background-color: white;
    margin-bottom: 10px;
    padding: 10px;
}

#text-to-justify {
    max-height: 15lh;
}

#justified-text {
  background-color: #fafafa;
}
</style>

[^leetcode]:[https://leetcode.com/problems/text-justification/](https://leetcode.com/problems/text-justification/)
[^render]: I didn't think of a better way to do this, but after learning a bit more about fonts I suspect I could have inspected the fonts more directly to get the exact widths rather than measuring.
[^alice]: [https://www.gutenberg.org/cache/epub/11/pg11.txt](https://www.gutenberg.org/cache/epub/11/pg11.txt)
[^answer]: The 2nd, 5th, and 6th lines are slightly uneven