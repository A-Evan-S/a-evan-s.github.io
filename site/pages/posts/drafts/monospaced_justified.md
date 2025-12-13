---
title: Monospaced Justification
date: 2025-12-10
summary: Playing around with fully justified, monospace text
---

## Justification

Justified text stretches or compresses the whitespace between words such that the left and right ends of each line are aligned. It's common in newspapers and other print media. I assume this has something to do with printing presses or something, but I didn't look it up.

Monospaced fonts attempt to provide uniformity to text by making each character take up the same width on the page. When using these fonts for most applications we opt for "flush left" alignment, where the left side of each line is aligned, but the right side remains ragged.



<div class="centered-pre-container" style="text-align: center; overflow-x: auto;">
<pre style="display: inline-block; text-align: left;">
This is some sample text written to     
demonstrate the different justification 
versions.                               
</pre>
</div>

We can approximate justified text by adding additional spaces between words, forcing both sides into aligment. By distributing the spaces as evenly as possible, we get reasonably good results.

<div class="centered-pre-container" style="text-align: center; overflow-x: auto;">
<pre style="display: inline-block; text-align: left;">
This  is  some  sample  text  written to
demonstrate  the different justification
versions.                               
</pre>
</div>

This method is a fairly common programming exercise ([seen here on LeetCode](https://leetcode.com/problems/text-justification/)), but produces notably imbalanced spacing: notice in the example above how the space between "demonstrate" and "the" is twice as large as the space between "the" and "different".

We can do better. While many fonts are described as "monospaced", those with Unicode support are rarely consistant in keeping *every* character to a uniform width. If you've ever tried to include emojis in code, you've likely come across this.

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

* `' '` - U+0020 - 1 character
* `' '` - U+2009 - 1/3 of a character
* `' '` - U+202F - 1/2 of a character

The first line has 6 gaps and is 5 full character widths from the end of the line. We can add to each gap one U+2009 character and one U+202F character for a total gap width of $\frac{11}{6}$ characters.

Similarly, the second line has 3 gaps and is 1 character width from the end of the line. Adding a single U+2009 character to each gap to create gap widths of $\frac{4}{3}$ fills the line.

## Generalizing

The good news is that we have a lot more whitespace characters to work with, so we have more granularity than just the couple characters in the example above. The bad news is that many of their widths overlap and that different fonts represent the various whitespace characters differently.

I wrote a script to render all the whitespace characters in a variety of fonts to produce the following table:

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

Note: the ratios here match to $\epsilon \le 0.1\%$, but it's notable that some fonts are much closer to exact integer ratios. In most situations, the small difference at the subpixel level will still result in the right ends of the lines aligning to the nearest pixel.

Most of these fonts preserve whitespace width ratios *between* these whitespace characters rather similarly (e.g. `THREE-PER-EM SPACE` is almost exactly $\frac{1}{3}$ of the `EM SPACE`). However, they don't all share the same ratio to the width of the uniform width characters and differ in a handful of other cases.


## Solving

To see how we can find the appropriate combination of whitespace characters for a given line of text, let's work through an example using the most common ratios from the table above:

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


Say our line in question has $m$ total spaces to distribute into $n$ total gaps, the ideal version of our problem can be defined as:

> Find a way to represent $\frac{432m}{n}$ as the sum of multiples of $120$, $144$, $45$, $216$, and $160$

If $\frac{432m}{n}$ is non-integral, then there will be no solution. If it is an integer, this turns into a variation of the [change making problem](https://en.wikipedia.org/wiki/Change-making_problem) where we're just interested in feasibility without any optimization.

Using the above numbers, we can see which scenarios will be solvable:

![Graph of working values](\assets\images\unweighted.png "what does this do again?"){: width="500"}

This doesn't look too bad at first; a good amount of the cases are solvable. However, we have to account for the frequency of different combinations. Since the number of extra spaces is upper-bounded by typical word length, we see most lines needing 0–5 extra spaces, and a typical line might consist of 10–20 words. I ran the plaintext copy of Alice's Adventures in Wonderland[^1] through this algorithm and, only focusing on text which would be justified (excluding the last line of each paragraphs), we can weight the above chart by frequency of occurence.

![Graph of working values, weighted](\assets\images\weighted.png "what does this do again?"){: width="500"}

Around 46.6% of the lines can be justified with these space characters. For reference 17.8% of lines were justified without any additional whitespace chracters. Not terrible, but lots of room for improvement.

## Imperfect Solutions

### Word Shifting

Before sullying our approach with non-uniform gaps, we can try altering the number of words which get placed on a line. By default, we place as many words as can fit on a given line width providing at least one full space for each. However, we can push words onto the next line, widening the gaps in the process. This both reduces the number of gaps and increases the extra spaces to distribute, which allows us to move us towards the solvable areas on our graph.

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

Instead of adjusting the splitting of words into lines, we can go back to an approach more similar to the leetcode style solution of always reaching full justification but accepting varied gap sizes. However, with the addition of the various whitespace characters, we can get a more uniform spacing than was possible with regular spaces alone.

First we need to define what we're optimizing for...


[^1]: [https://www.gutenberg.org/cache/epub/11/pg11.txt](https://www.gutenberg.org/cache/epub/11/pg11.txt)