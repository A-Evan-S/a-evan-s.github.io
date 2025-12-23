---
title: Making My Own Font
date: 2025-12-19
summary: Making a font from scratch
---

<style>
@font-face {
  font-family: 'sans_sands_sans_01';
  src: url("/assets/fonts/San's_Sands_Sans_01.woff") format('woff');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'sans_sands_sans_02';
  src: url("/assets/fonts/San's_Sands_Sans_02.woff") format('woff');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'sans_sands_sans_03';
  src: url("/assets/fonts/San's_Sands_Sans_03.woff") format('woff');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'sans_sands_sans_04';
  src: url("/assets/fonts/San's_Sands_Sans_04.woff") format('woff');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'sans_sands_sans';
  src: url("/assets/fonts/San's_Sands_Sans.woff") format('woff');
  font-weight: normal;
  font-style: normal;
}
</style>

<div style='text-align: center; margin-bottom: -25px;'>
<p style='font-family: "sans_sands_sans"; font-size:2em'>
    This is my font.<br>
    There are many like it,<br>
    but this one is mine.
</p>
</div>

## Why

I'm a big fan of being mediocre at things. So many interesting hobbies and activities are ruined by being good enough to worry if you're good enough. For example, a while back I tought myself some basic photo editing in GIMP. Just enough to make little projects if I ever need, but not enough to ever be confused for someone who knows what they're doing. It is absolutely wonderful.

In creating this website, I started to pay more attention to how other websites are designed, and one aspect I could not wrap my brain around was fonts. Thousands of fonts to choose from, each with vocal proponents and detractors. I've also recently seen the creation of "variable fonts", the amount of options they contain genuinely striking fear into my soul.

So, I decided to make my own font.

To be clear, I went in with no ambitions to make a font good enough for use on this website or elsewhere. I'm not _that_ naive. My goal instead was to go from "zero" to "bad" at font design, and in the process hopefully understand enough to have some opinions on fonts going forward.

I googled "font design software" and found [FontForge](https://fontforge.org/), which was free, open source, and had a tutorial[^tutorial]. Perfect.

## Design Goals

Despite starting this  Either way, I wanted to set out goals for my font and came up with the following list:

* Easy to read: pretty low bar to pass, but if you can't read the font I don't really know what we're doing here
* Easy to make: I don't know what I'm doing, so this was kind of a necessity
* Offends some people: if I'm not annoying anyone with my decisions, we're not being bold enough

As for the style and inspiration, I like hiking, so my main thought for what I'd like to create was "would this look good on a trailhead or park sign". This mostly just means it should look good at a large size, be simple with minimal flourishes, and have a mix of professional and natural themes. In my mind's eye, I was envisioning something that could be easily carved into wood. I would go on to accomplish none of these goals.

As for the name, taking after outdoor recreation where I live, I decided to name the font after the beaches of the bay area: <strong>San's Sands Sans</strong>.

## Getting Started

Right off the bat we're presented with a bunch of choices, none of which I know anything about. I'm to enter values for "Ascent" and "Descent". No idea what those mean, but this image helped clear things up:

<figure style="margin: 40px auto">
  <img src="/assets/images/Typography_Line_Terms.svg" alt="A diagram showing common typography terms such as baseline, ascender height, and descender height" style="max-height: 200px; width: 80%; margin-bottom: 15px">
  <figcaption>
    Image credit: <a href="https://commons.wikimedia.org/wiki/File:Typography_Line_Terms.svg" target="_blank">Max Naylor, Public domain, via Wikimedia Commons</a>
  </figcaption>
</figure>

Looks like how high or low each character is allowed to go, relative to the baseline. It had default values of 800 and 200, and I'm not about to question that.

With that out of the way, we're left with a blank slate of different glyphs. Specifically, the `ISO 8859-1` characters. This seems like a reasonable enough set to start with, though at this point I figured I might bail on the later characters.


![Fontforge's default view of all the characters in the encoding](/assets/images/font_1.png){: style="max-height: 350px"}

Onto making characters! I thought I had a rough Idea of what I wanted for a capital 'A': 3 stright lines drawn with a circular tip to create rounded ends but sharp intersections.

![A very poor attempt to freehand draw the letter 'A'](/assets/images/font_2.png){: style="max-height: 400px"}

Nailed it.

While I have done some basic vector drawing with bezier curves before, I had no idea how to use these tools to make consistent widths or angles.

After probably an hour of playing around with the tools, I got a reasonable-ish 'A':

![A corrected version of the letter 'A'](/assets/images/font_3.png){: style="max-height: 400px"}

Shortly after this I found the "Expand" tool to do what I had wanted without having to manually measure each width myself. I decided from here to do a test run making an incredibly rough draft of all the lowercase letters, mostly so that I would be able to see future drafts of each in at least some context while I worked. To do this, I just used the hand-draw tool to sketch some lines and expand the stroke to a uniform width.

Here's a sample of what that first version looked like:

<div style='text-align: center'>
<p style='font-family: "sans_sands_sans_01"; font-size:1.5em'>
    the quick red fox jumps over the lazy brown dog
</p>
</div>

## Uniformity

While I'm sure there are lots of things wrong with this first pass, I was actually pleasantly surprised. That is legible text that wouldn't immediately make me think anything was broken or wrong. It might make me question any person who would choose to use it, but in an "oh, you're pretty quirky, huh?" way, not in an "I question your sanity" way.

Immediately, only two things stood out to me:

* the size of characters jumps around wildly
* straight lines are not straight

While I didn't use them in my first draft, I did find that Fontforge has guideline tools that carry between each glyph. This should make getting some uniformity in sizing fairly straightforward.

Straight lines also weren't too difficult of a challenge, but did require me to start manipulating points directly and figure out what each did. I also started looking for shortcuts to reuse pieces of each letter, both for uniformity and convenience.

After a few hours of tweaking sizes and lines, I got to draft #2 (still only lowercase letters):

<div style='text-align: center'>
<p style='font-family: "sans_sands_sans_02"; font-size:1.5em'>
    the quick red fox jumps over the lazy brown dog
</p>
</div>


## Wait, it's bad?

I stumbled upon something maybe obvious to people who know what they're doing, but in trying to aim for uniformity it made almost everything noticably worse. My first version, though deeply flawed, looked like it had some meaning to the sizes and spacing, even though any meaning would just have been a result of "that's how it came out when I freehanded it with a mouse". The new version, with all its matching pieces, seems to make the awkward pieces stand out.

Relatedly, I found lots of things that my brain tell me should look natural and even look terrible in practice. For example, using a circle to create a lowercase 'e' ends up looking like it has a massive overbite:

![The letter 'e' made from a circle (it looks bad)](/assets/images/font_4.png){: style="max-height: 400px"}

As for what I wanted to change from here, a few things stood out while working and upon reflection afterwards:

* Spacing -- I had just been using the "Auto Width" tool to get the spacing close enough to accurate for testing, but some places the spacing looks very obviously weird
* Tails -- I don't know the real term, but in standardizing things I removed the tails from the 't', 'l', and 'u' characters. I'm not sure about the 'u', but for the others I think it looks a little more natural with them included.
* Widths -- I didn't use any guide for the widths, but most turned out okay. However, a think a few are too narrow/wide.
* 'q' and 'g' shape -- I copied the 'a' character for both the 'q' and 'g', and I'm rethinking that decision. It's not bad, but I wanted to see what they would look like with different shapes.
* Descenders -- These were way trickier than I imagined. Making them uniform looked terrible, but doing them each independantly had mixed results. I also think I might want to adjust the ratios of the various pieces.

A couple more hours tweaking and we get the following:

<div style='text-align: center'>
<p style='font-family: "sans_sands_sans_03"; font-size:1.5em'>
    the quick red fox jumps over the lazy brown dog
</p>
</div>

## More Characters

It looks like a font! There are still a few changes from this point that I'd make to the lowercase letters (I liked the change to 'g' and decided to make similar changes to the 'q' and 'a') and the spacing could use a bit more fine tuning, but we're a lot closer than before.

There's still a massive challenge though, as, while I'm not setting my sights _too_ high to call this completed, I do want to implement all the uppercase letters and digits, as well as common punctuation. Similar to how I approached the lowercase letters, I thought I'd start with just a super fast pass through the uppercase letters to get a feel for things. I ended up with this:

<div style='text-align: center'>
<p style='font-family: "sans_sands_sans_04"; font-size:1.5em'>
    THE QUICK RED FOX JUMPS OVER THE LAZY BROWN DOG
</p>
</div>

Similar to my first pass at the lowercase letters, spacing and width need some work, and I wasn't happy with most of the curved letters. I was, however, happy to have a draft done so that I can look at everything together. I was on a roll, so I figured I'd finish off first drafts for the digits, punctuation, and symbols as well.

<div style='text-align: center'>
<p style='font-family: "sans_sands_sans_04"; font-size:1.5em'>
    0123456789<br>
    !"#\$%&'()*+,-./<br>
    :;<=>?@[]\^`{}|~<br>
</p>
</div>

I put some time into the symbols and punctuation, so I was mostly happy there, but the numbers needed a lot of work.

## Resizing

At this point, with a rough set of uppercase letters, numerals, and symbols I realized that I fucked up pretty hard at the outset. Using the default values for ascent and descent were fine (though I did end up increasing the descent size), but I had chosen an xHeight way too low. With an ascent of 800 (capHeight of 750) I had chosen a midline of 470. This was somewhat apparent when comparing the height of uppercase letters and lowercase ones, but was really apparent as I tried to make some of the symbols balanced:

<div style='text-align: center'>
<p style='font-family: "sans_sands_sans_04"; font-size:1.5em'>
    &lt;Not too bad&gt; <br> &lt;oops&gt;
</p>
</div>

I wasn't totally oblivious to this earlier, but hadn't realized that most uppercase letters with middle features (e.g. the bar across the 'A' or the split between the two sections of the 'B') don't typically match the xheight. I also took this opportunity to swap to an em-size of 1024 to match the ttf format.

| Measure | Original | Final |
| -------- | -------- | -------- |
| Ascent     | 800      | 800     |
| Descent     | 200    | 224   |
| xheight     | 470    | 520   |
| capHeight     | 750    | 750   |

## Final Touches & Testing

While the remaining edits accounted for only small changes, they took lots of trial and error and more time than you would think. Most of that is likely due to my inefficiencies in working with Fontforge, but I'd like to think some was from honing a sharper eye to details I would have previously overlooked.


<div style='text-align: center'>
<p style='font-family: "sans_sands_sans"; font-size:1.5em'>
    ABCDEFGHIJKLMNOPQRSTUVWXYZ<br>
    abcdefghijklmnopqrstuvwxyz<br>
    0123456789<br>
</p>
</div>

A lot of the last changes were actually breaking the standardization I'd held to up to this point. I tried to reuse pieces of letters as much as possible, but some things looked better slightly off, like the curved top of the 'P' and 'R' being different, or the period being a bit larger than the comma.

At the end of the day, while I'll likely never have a use for the end result, I think I accomplished my goals. If you want to try out San's Sands Sans, you can do so below, and if, for god knows what reason, you actually want to use it, you can [download it here](/assets/fonts/San's_Sands_Sans.ttf).

<div id="font-test-tool">
    <div id="tester-options">
        <div class="option-group">
            <label for="test-tool-size">Font Size:</label>
            <input type="number" id="test-tool-size" value="20" />
        </div>
        <button id="lorem-ipsum">Lorem Ipsum</button>
        <button id="pangrams">Pangrams</button>
        <button id="nums-symbols">Numbers & Symbols</button>
        <button id="clear-text">Clear</button>
    </div>
    <textarea id="testing-text" placeholder="Enter text to test the font..."></textarea>
</div>

<script>
  const sizeInput = document.getElementById('test-tool-size');
  const testingText = document.getElementById('testing-text');
  const sampleText0 = document.getElementById('clear-text');
  const sampleText1 = document.getElementById('lorem-ipsum');
  const sampleText2 = document.getElementById('pangrams');
  const sampleText3 = document.getElementById('nums-symbols');

  sizeInput.addEventListener('change', function() {
    testingText.style.fontSize = sizeInput.value + "px";
  });

  sampleText0.addEventListener('click', function() {
    testingText.value = "";
  });

  sampleText1.addEventListener('click', function() {
    testingText.value = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  });

  sampleText2.addEventListener('click', function() {
    testingText.value = "Jim quickly realized that the beautiful gowns are expensive.\nFive quacking zephyrs jolt my wax bed.\nThe wizard quickly jinxed the gnomes before they vaporized.\nThe quick onyx goblin jumps over the lazy dwarf.";
  });

  sampleText3.addEventListener('click', function() { // TODO: make more fun sample text
    testingText.value = "\"The project, costing $1,250,000.75 (USD), requires 50+ team members; its deadline (Dec. 31st, 2025) is critical! Use @ to tag users, #hashtags for topics, & symbols like < > for ranges (e.g., ages 18–25).\"";
  });
</script>

<style>
  input[type=number]::-webkit-inner-spin-button {
      opacity: 1
  }

  #font-test-tool {
    padding: 20px 20px 10px 20px;
    border: 1px solid #ccc;
    border-radius: 6px;
    background-color: #fafafa;
    max-width: 100%;
  }

  #tester-options {
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

  #tester-options input,
  #tester-options button {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    background-color: white;
  }

  #tester-options button {
    background-color: #f0f0f0;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  
  #clear-text {
    margin-left: auto;  /* pushes button to the right if there's room */
  }

  #tester-options button:hover {
    background-color: #e3e3e3;
  }

  #test-tool-size {
    width: 40px;
  }

  #testing-text {
      font-family: sans_sands_sans;
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 3px;
      field-sizing: content;
      resize: none;
      min-height: 150px;
      font-size: 20px;
      line-height: 1.5;
      background-color: white;
      margin-bottom: 10px;
      padding: 10px;
  }
</style>

## Reflections

I had heard previously about how much work making a font is, but I don't think I really knew what that meant. I suppose in part it's that it takes a lot of time. That seems true enough; this simplest of simple attempts probably took ~15 hours, so I can imagine for the kind of work a professional would do the sheer time investment could balloon.

However, that's not really the take-away I came out with. What really struck me as a unique challenge was trying to balance so many details while maintaining uniformity throughout. Even just the standard uppercase and lowercase letters are _just_ numerous enough to make it impossible to keep all in your head at one time. I imagine that's one of the skills that would be necessary for success when designing fonts: not just that it takes so much time and effort, but that on hour 143 when you're tweaking the same glyph for the umpteenth time you still need to maintain a singular vision for the work as a whole.

[^tutorial]: I used [this tutorial](https://fontforge.org/docs/tutorial.html) from fontforge themselves. If you are in a similar spot of trying making a font for the first time, [this separate tutorial](http://designwithfontforge.com/) is substantially better and I wish I had used it.