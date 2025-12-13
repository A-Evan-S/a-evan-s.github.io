---
title: Justified Fun
date: 2025-12-10
summary: Playing around with fully justified, monospace text
---

## Justification

Justified text stretches or compresses the whitespace between words such that the left and right ends of each line are aligned. It's common in newspapers and other print media.

Monospaced fonts attempt to provide uniformity to text by making each character take up the same width on the page. When using these fonts for most applications we opt for "flush left" alignment, where the left side of each line is aligned, but the right side is left ragged.

<div class="centered-pre-container" style="text-align: center;">
<pre style="width: fit-content; display: inline-block; text-align: left;">
This is some sample text written to     
demonstrate the different justification 
versions.                               
</pre>
</div>

We can approximate justified text by adding additional spaces between words, forcing both sides into aligment. By distributing the spaces as evenly as possible, we get reasonably good results.


<div class="centered-pre-container" style="text-align: center;">
<pre style="width: fit-content; display: inline-block; text-align: left;">
This  is  some  sample  text  written to
demonstrate  the different justification
versions.                               
</pre>
</div>

This method is a fairly common programming exercise [seen here on LeetCode](https://leetcode.com/problems/text-justification/), but produces notably imbalanced spacing: notice in the example above how the space between "demonstrate" and "the" is twice as large as the space between "the" and "different".

We can do better. While many fonts are described as "monospaced", those with Unicode support are rarely consistant in keeping *every* character to a uniform width. If you've ever tried to include emojis in code, you've likely come across this:

```python
print('🙂-aligned')
print('misaligned')
```

While this font non-uniformity causes some subtle annoyance, it also allows us to produce the following evenly-justified, "monospaced" text.

<div class="centered-pre-container" style="text-align: center;">
<pre style="width: fit-content; display: inline-block; text-align: left;">
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

The first line has $6$ gaps and is $5$ full character widths from the end of the line. We can add to each gap one U+2009 character and one U+202F character for a total gap width of $\frac{11}{6}$ characters.

Similarly, the second line has $3$ gaps and is $1$ character width from the end of the line. Adding a single U+2009 character to each gap to create gap widths of $\frac{4}{3}$ fills the line.

## Generalizing

The good news is that we have a lot more whitespace characters to work with, so we have more granularity than just the couple characters in the example above. The bad news is that many of their widths overlap and that different fonts represent the various whitespace characters differently.

I wrote a script to render all the whitespace characters in a variety of fonts to produce the following table:

\[TABLE\]

Note: the ratios here match to $\epsion \le 0.1%$, but it's notable that some fonts are much closer to exact integer ratios. In most situations, the small difference at the subpixel level will still result in the right ends of the lines aligning to the nearest pixel.

Most of these fonts preserve whitespace width ratios *between* these whitespace characters rather similarly (e.g. `THREE-PER-EM SPACE` is almost exactly $\frac{1}{3}$ of the `EM SPACE`). However, they don't all share the same ratio to the width of the uniform width characters and differ in a handful of other cases.


## Solving

Writing an algorithm to select the appropriate whitespace characters to justify text proved more challenging than I first imagined. The first step was to clearly define the objective. When certain whitespace would fully align the text and provide uniform gap width between each word, it's easy to identify as the optimal solution, but how to measure the relative quality of two un-even solutions?

It turns out this is resolved for us. Following the algorithm below, we can see that we never need to consider more than two gap-widths in a given line, and we can optimize simply by making those two gap-widths as close as possible.

Let's work through an example using The most common ratios from the table above:

U+00A0	U+2000	U+2001	U+2002	U+2003	U+2004	U+2005	U+2006	U+2007	U+2008	U+2009	U+200A	U+202F	U+205F	U+3000	U+00A0
1	    5/6	    5/3	    5/6	    5/3	    5/9	    5/12	5/18	1	    1	    1/3	    5/48	1/2	    10/27	5/3	    30/12

We can first reduce our character set by eliminating any characters whose widths are a multiple of another character. That leaves us just with:

U+2006	U+2009	U+200A	U+202F	U+205F
5/18	1/3	    5/48	1/2	    10/27

Getting a common denominator, we see we have:

U+2006	U+2009	U+200A	U+202F	U+205F
120/432	144/432	45/432  216/432 160/432

Say our line in question has $m$ total spaces to distribute into $n$ total gaps, the ideal version of our problem can be defined as:

> Find a way to represent $\frac{432m}{n}$ as the sum of multiples of $120$, $144$, $45$, $216$, and $160$

If $\frac{432m}{n}$ is non-integral, then there will be no solution, and if it is an integer then this turns into the [coin change problem](link?).

Using these numbers, we can see which scenarios will be solvable:

\[TABLE\]

This doesn't look too bad at first, around half of the combinations are solvable. However, we have to account for the frequency of different combinations. Since the number of extra spaces is upper-bounded by typical word length, we see most lines needing 1--5 extra spaces, and a typical line might consist of 10--15 words. This looks pretty bad. As an example, I ran the plaintext copy of Alice's Adventures in Wonderland through this algorithm and, only focusing text which would be justified (excluding poems or the list line of paragraphs) we can weight the above chart by frequency of occurence.

\[TABLE\]

oof. XX.XX%

## Imperfect Solutions

Before sullying our approach with non-uniform gaps, we can try altering the number of words which get placed on a line. By default, we place as many words as can fit on a given line width providing at least one full space for each. However, we can push words onto the next line, widening the gaps in the process. This both reduces the number of gaps, and increases the extra spaces to distribute, both of which move us towards the greener area on our graph.

We could just abuse this to get to a solution in any case, but that would result in silly lines with 3 words and humongous gaps between them. Instead, let's limit ourselves to 

But what about the other cases? We won't be able to find a perfectly even distribution of spaces, but we can still do better than just using U+0020. 

...

## 