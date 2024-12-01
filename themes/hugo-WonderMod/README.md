## WonderMod (PaperMod fork - theme for Hugo)

<p align="center">
  <img src="https://raw.githubusercontent.com/wonderfall/hugo-WonderMod/master/.github/assets/web-capture.jpeg" title="WonderMod" alt="WonderMod image">
</p>

### What is this?
WonderMod is a fork of a theme for [Hugo](https://gohugo.io/) called [PaperMod](https://github.com/adityatelange/hugo-PaperMod) (made by adityatelange), which is based on [Paper](https://github.com/nanxiaobei/hugo-paper/). Since PaperMod isn't interested in a few changes such as **removing inline JavaScript**, which I personally require to harden my websites, I decided to maintain my own fork (I didn't want to keep overwriting a bunch of files as a fork workflow is much cleaner). Don't expect a ton of changes, and unless you know me, you probably don't want to use WonderMod.

When implementing new features, I try to do as much as I can with pure CSS code instead of adding new JavaScript code. I'd like to keep the JavaScript part minimal and that's why WonderMod should be totally usable when disabling JavaScript. WonderMod is also designed with strong CSP headers in mind: no inline JavaScript or style, no calls to third-parties.

**This fork is regularly synced with upstream changes from [PaperMod](https://github.com/adityatelange/hugo-PaperMod).** A merging workflow was chosen since rebasing WonderMod's changes every time could be less efficient. As such, commit history is a bit messy, but upstream changes will be merged on a best effort basis.

### Main changes
Current "main" changes are as follows:
- Remove inline JavaScript
- Improved YouTube shortcode
- Built-in Chroma instead of client-side syntax highlighting with HLJS
- Responsive Table of Contents with side display support
- Responsive "hamburger" menu for mobile
- Simple reading progress bar
- Refactored RSS template (proper Atom feed)
- Bunch of CSS and other changes

### Credits
Additional credits:
- [PaperModX](https://github.com/reorx/hugo-PaperModX/) by reorx

### Configure
Most of the installation process and settings are shared with the original PaperMod, so check out [their documentation](https://github.com/adityatelange/hugo-PaperMod/wiki/Installation). One noticeable difference though is that in order to enable syntax highlighting, you have to add this to your `config.yml` :

```
markup:
    highlight:
        style: dracula
        noClasses: false
        guessSyntax: true
```

See [Hugo documentation](https://gohugo.io/getting-started/configuration-markup#highlight) for more options.
*Note: for some reason, the `guessSyntax` doesn't actually work but is required. Please make your code fences explicit for the time being.*
