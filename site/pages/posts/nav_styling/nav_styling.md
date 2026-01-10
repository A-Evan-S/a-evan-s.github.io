---
title: Nav Styling I Didn't Use
date: 2026-01-10
summary: A cool animated style for showing selected nav elements that I didn't end up using
---

<link rel="stylesheet" href="nav_styling.css">

In an effort to learn a bit more about css and try some different approaches to styling this website, I put together the below animated nav styling. My goal was to clearly indicate the selected page and what page is being selected with minimal visual change and without any changes to the text itself.

I didn't end up using this, but figured I'd post it to feel less like I wasted my time.

<div class="nav-demo-container">
    <div class="nav-demo">
        <div class="nav-container-vert">
            <ul>
                <li><a href="#home" class="active">Home</a></li>
                <li><a href="#posts">Posts</a></li>
                <li><a href="#about">About</a></li>
            </ul>
        </div>
    </div>
</div>

I also put together a horizontal version.

<div class="nav-demo-container">
    <div class="nav-demo">
        <div class="nav-container-horiz">
            <ul>
                <li><a href="#home" class="active">Home</a></li>
                <li><a href="#posts">Posts</a></li>
                <li><a href="#about">About</a></li>
            </ul>
        </div>
    </div>
</div>

I really like the look and feel, and I think it does a good job showing both the current page and the page the cursor is hovering over with minimal clutter. It doesn't require any javascript, and is relatively drop-in compatible with other styling.

As for why I didn't actually end up using it, there were two main problems:

1. Without javascript, it was necessary to hardcode the relative positions of the triangle. This isn't immediately an issue, as those could be calculated during the build process. It is annoying, however, and also gets further complicated if the elements aren't the same size (as is the case with the sub items under the "Posts" link).
2. No obvious way to handle not having an active selection. If viewing a page not present in the nav list, there's not an obvious solution of how the triangle should behave. For example, if using the horizontal layout and viewing an individual post, should the "Posts" item be selected? If it were, it would break the pattern that clicking the currently selected element shouldn't have any effect. There are potential solutions here like having the triangle animate in from the side or just appear on hover, but that didn't match my original goals.

Overall, I was glad to have learned more about animating motion with css, and do think it would make a neat visual for a site that only has a few fixed pages.

You can take a look at the styling used below:

```css
nav {
    position: relative;
}

nav a {
    display: block;
    text-decoration: none;
    width: 100%;
    line-height: 40px;
}

nav ul {
    list-style: none;
    padding-left: 30px;
}

nav li {
    display: flex;
    align-items: center;
}

nav::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--color-text);
}

nav::after {
    content: '';
    position: absolute;
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-left: 10px solid var(--color-text);
    transition: top 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

nav:has(li:nth-child(1):hover)::after {
    top: 12px;
}

nav:has(li:nth-child(2):hover)::after {
    top: 52px;
}

nav:has(li:nth-child(3):hover)::after {
    top: 92px;
}

nav:has(li:nth-child(1) a.active):not(:has(li:hover))::after {
    top: 12px;
}

nav:has(li:nth-child(2) a.active):not(:has(li:hover))::after {
    top: 52px;
}

nav:has(li:nth-child(3) a.active):not(:has(li:hover))::after {
    top: 92px;
}
```

And for the horizontal version:

```css
nav {
    position: relative;
    width: fit-content;
}

nav a {
    display: block;
    text-decoration: none;
    width: 100%;
    line-height: 40px;
}

nav ul {
    display: flex;
    list-style: none;
    flex-direction: row;
    justify-content: center;
    padding-bottom: 10px;
}

nav li {
    display: flex;
    text-align: center;
    width: 100px;
}

nav::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: var(--color-text);
}

nav::after {
    content: '';
    position: absolute;
    bottom: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 10px solid var(--color-text);
    transition: left 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

nav:has(li:nth-child(1):hover)::after {
    top: auto;
    left: 42px;
}

nav:has(li:nth-child(2):hover)::after {
    top: auto;
    left: 142px;
}

nav:has(li:nth-child(3):hover)::after {
    top: auto;
    left: 242px;
}

nav:has(li:nth-child(1) a.active):not(:has(li:hover))::after {
    top: auto;
    left: 42px;
}

nav:has(li:nth-child(2) a.active):not(:has(li:hover))::after {
    top: auto;
    left: 142px;
}

nav:has(li:nth-child(3) a.active):not(:has(li:hover))::after {
    top: auto;
    left: 242px;
}
```