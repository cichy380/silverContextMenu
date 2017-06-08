# Silver Context Menu

It is very simply [jQuery](https://jquery.com/) plugin based on example from ["jQuery in Action, Third Edition" book](http://manning.com/books/jquery-in-action-third-edition).

* Demo: [http://example.silversite.pl/silver-context-menu/](http://example.silversite.pl/silver-context-menu/)

## Quick start

Put the script at the [bottom](https://developer.yahoo.com/performance/rules.html#js_bottom) of your markup right after jQuery:

```html
<script src="jquery.js"></script>
<script src="jquery.silver.contextMenu.js"></script>
```

### Usage

Create your context menu HTML and put it at any place on your HTML code. Do not forget set hidden this element by CSS. Example:

```html
<ul id="contextmenu" style="display: none; ">
    <li><a href="#1">First option</a></li>
    <li><a href="#2">Second option</a></li>
    <li><a href="#3">Third option</a></li>
</ul>
```

Call the [plugin](https://learn.jquery.com/plugins/) function on the area element which you want to using context menu with one required option - selector of your menu. And it is ready.

```javascript
$('.element-needs-contextmenu').silverContextMenu({
    menuSelector: '#contextmenu'
});
```

## License

Code released under the MIT license.
