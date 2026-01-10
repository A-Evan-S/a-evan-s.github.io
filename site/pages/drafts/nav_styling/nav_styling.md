---
title: Nav Styling I Didn't Use
date: 2026-01-09
summary: A cool styling technique for navigation that I didn't end up using
---

<link rel="stylesheet" href="nav_styling.css">

In an effort to learn a bit more about css and style this website, I put together a cool animated nav styling.

<div class="nav-demo-container">
<div class="nav-demo">
    <div class="nav-container-vert">
        <ul>
            <li><a href="#home" class="active">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
        </ul>
    </div>
    </div>
</div>


And a horizontal version

<div class="nav-demo-container">
<div class="nav-demo">
    <div class="nav-container-horiz">
        <ul>
        <li><a href="#home" class="active">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        </ul>
    </div>
    </div>
</div>

I really like the look and feel, but ran into a few problems. I wanted to implement it entirely in css, rather than js, and this seemed to require hardcoding the positions of each element. This isn't a problem in uses like those above, but wouldn't work with elements with various widths and heights. That wouldn't work on this site with the sub-elements for the posts with different heights.

