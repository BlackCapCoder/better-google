# Better Google

These are some usability and slight design changes to the Google webpage. Install the `.js` file with tampermonkey, and the `.css` files with stylish.

### vim.js

This gives you a cursor that you can use to select search results. The cursor will initially be focused on the first result, and you can press:

| Key        | Function                                                                   |
| --         | -                                                                          |
| j          | Move cursor down                                                           |
| k          | Move cursor up                                                             |
| l OR enter | Open result under cursor                                                   |
| g          | Move the cursor to the first result                                        |
| G          | Move the cursor to the last result                                         |
| zj         | Scroll so that the result under the cursor is at the bottom of the screen  |
| zk         | Scroll so that the result under the cursor is at the top of the screen     |
| zz         | Scroll so that the result under the cursor is centered on the screen       |
| gi         | Focus search textbox                                                       |
| i          | If the current result has a textbox, focus it - otherwise focus search box |

Additionally you can prefix `j` and `k` with a number to move `N` results up/down. For example, `12j` will move the cursor 12 results down.

If text is selected the cursor will move to the result in which there are selected text. This is so that I can search with `/` and `n`/`p` in Vimium and have my cursor move to the result.

This script is indented to synergize with the Vimium extension, thus why I chose `zk` and `zj` instead of `zt` and `zb`.

![](vim.gif)

### mediarule.css

Somehow Google doesn't have media rules for thin screen widths - this adds that. This is also where I threw the css for `vim.js`


### bookdark.css

In google books, the entire book is inside an iframe and the darkreader extensions doesn't work on iframes, so I invert the colors to get white on black, which I find easier on the eyes and more comfortable to read.
