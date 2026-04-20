---
title: Custom Keyboard Layout
date: 2026-04-19
summary: Sharing my customized keyboard layout
---

# Goals

* Fewer unused keys
* Comfortable access to most common shortcuts
* vim keybind support (easy escape key access)
* niri navigation tools
* reduce unused keys
* expand numpad for better data entry
* useful f-row shortcuts
* remain usable for people other than me (qwerty, multiple options for modifier keys)

# Key Keys

## Replacing Caps-Lock

I do actually use caps-lock with moderate frequency. Mostly for data input or similar where all-caps is expected, less so for yelling on the internet. Still, the idea of reserving the prime real-estate of its typical position for these obscure use-cases is absurd. I chose to replace this with a Mod-Tap Ctrl-Esc button. Ctrl for easy keyboard shortcuts (much more comfortable than reaching down with the pinkey to either of the typcial Ctrl locations) and Esc for vim-style input and for controlling focus. While vim-style editing was my initial reasoning for adding the Esc key here, it's remarkably useful beyond that. I've found numerous instances of interfaces where exiting a certain focus requires either using the mouse or pressing Esc (for example, using Ctrl-f on chrome brings up a search with the keyboard, but Esc is required to exit search).

I did keep caps-lock readily available as Shift+Shift. Hard to do accidentally, but easy to remember when needed.

## Function Key Row

I opted to dedicate the top row to common shortcuts and controls, moving the F-keys to a secondary layer. I always liked the idea of having easy access to controls, but my experience has always been similar to when TV remotes have dedicated buttons to specific smart-applications or services: cool if you use those a lot, but wasted if they're not tuned exactly to your needs.

Customizing these helped focus on what I actually use most frequently, but I also tried to keep them generic enough to not be specific to my hardware or software. Hopefully the icons are self-explanatory for most, but here's the list:

* Lock
* Mute
* Volume down
* Volume up
* Swap audio output (headphones/speakers)
* Mute/Unmute microphone
* Hide/Unhide camera
* Media back
* Media play/pause
* Media forward
* Backlight toggle
* Full screen toggle
* Print-screen

## Extra Symbols

There are a handful of symbols that I appreciate having quick access to beyond those typically present on a keyboard. I've used the degree symbol (°) enough that I don't have to look up that it's `U+00B0` (or `Alt+0176` on windows). Having direct access to that and a few other common symbols without having to look them up is a nice perk that doesn't really cost anything except some slightly more cluttered keycaps. I probably only needed a few of these, but opted to add:

* center dot `·`
* ellipsis `…`
* superscript 2 and 3 `²` and `³`
* arrows `←→↑↓`
* degree symbol `°`
* en and em dashes `–` `—`
* open and closing double and single quotes: `“”` and `‘’`

## Split Space Bar

This was one of the key features I was looking for when trying to find a keyboard. I type spaces almost exclusively with my right thumb, and wanted to enable using my left thumb for a common modifier. Since the caps-lock was already functioning as my main Ctrl-key, I opted to let my left thumb act as a `super` modifier. I use niri, and have all my window/workspace navigation keybinds using super, along with a few other shortcuts for things like albert.

I tried this for a bit, and very much liked it, but opted to change the left key to a Mod-Tap Super-Space as I found myself still wanting to type a space with my left thumb on occasion, usually if my right hand was using the mouse.

## Bottom Row

I actually kept most of the bottom row fairly standard. I don't use the bottom right mod keys very often, so left them to a fairly standard set of `Super`, `Alt`, and `Ctrl`. I left the left `Alt` key the same for `Alt-Tab` navigation, but the other three keys are a bit more interesting.

### Layer

This is mostly for togglign the F-key rows between their media/shortcut uses and standard F-keys, but I opted not to call it `fn` since I also use that layer to have access to some less common keys like Insert, or Scroll-lock (in case I have an application that has a need for those specifically).

### Compose

While I'm unfortunately monolingual, I have actually found myself getting a ton of use out of the compose key. I appreciate being able to easily spell names with their proper diacritics, and as I've recently been learning a bit about old-english, having quick access to þ, ð, or æ has saved a lot of annoying copy-and-pasting when looking up words or phrases.

### Magic

This one's a bit of fun, and I might swap this out for something else later, but it currently launches [Hexecute](https://github.com/ThatOtherAndrew/Hexecute). I also have it set as Mod-Tap for use `Ctrl`. This is mostly so anyone else using the keyboard not used to the `Ctrl` key being in the caps-lock location can still use it.

# Numpad

