---
title: Test Post for Formatting
date: 2025-12-07
summary: A test post to test various formatting pieces
---

This is a post (also) With some text in it.

Which tests what `markdown` does with codeblocks:

``` python
def foo(x):
    return 2 * x
```

and with math $f(x) = 2 \cdot x$ inline and

$$ f(x) = \sum_{n=0}^\infty \frac{f^{(n)}(a)}{n!} (x-a)^n $$

$$ M = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix} $$

blocks. You also need to be able to share your \$0.02 about \$\$\$.

We also need to test larger lines of text so here we go: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lastly, we'll need some links, both to [other pages on this site](/posts/), and to [other websites](https://www.wikipedia.org/), as well as just raw links like [https://www.wikipedia.org/](https://www.wikipedia.org/). Also [links to headers](#headers)

We should also test basic markdown things like *italics* **bolding**

Tables:

| Column 1 | Column 2 | Column 3 |
| -------- | -------- | -------- |
| John     | Doe      | Male     |
| Mary     | Smith    | Female   |


# Headers

## Of Various

### Different

#### Sizes

> Blockquotes
>> And nested quotes?
>>> With nested quotes?

> are a little absurd...

Unordered

* Lists
    * with
    * sub
* lists

As well as

1. Ordered
2. Lists

<!-- comments -->

horiziontal lines

How about H~2~O or 12^th^

Regular numbered footnotes[^1], as well as fancy named ones.[^named-footnote]

---

Just html by itself: <button>Click me</button>

and images:

![An image of some mushrooms growing on a tree](mushrooms.jpg "Cool mushrooms!"){: style="max-width: 400px"}

[^1]: maybe this one
[^named-footnote]: less confident here