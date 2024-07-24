# Skate UI

## Objective:
  - Provide components that are commonly desired in web development, yet not so easy to implement.
  - UI component 100% compatible with vanilla HTML.
  - Style should be easily customizable via css without implementing additional custom attributes.

## Known issues:
  - skateui use getComputedStyle and mutationobserver internally.
    when developing, depending on the os/browser, there can be some minor quirks when:
      - trying to modify css styles directly from developers panel in web browsers.
      - working on live reloads.
    
    but when refreshed, the quirks will go away.

## Components:

- sui-nav: Navbar that hides when scrolling down, and shows when scrolling up.
- sui-flextext: Text that auto scales.
- sui-tooltip: Tooltip that shows when hovering over an element.
- sui-overlay: Fully customizable overlay that shows when clicked.
- sui-textarea: Textarea that auto resizes.

## Example

```html
<!DOCTYPE html>

<head>
    <script type='module' src="https://cdn.jsdelivr.net/npm/skateui@latest/dist/skateui/skateui.esm.js"></script>
</head>

<body style="margin:0;">
    <!-- You can now use skateui components -->
    <sui-nav style='padding: .5em;background-color:blue;color:white'>
        <h2>Skate Navbar</h2>
    </sui-nav>

    <br><br>

    <sui-flextext>Hello my name is Baksa</sui-flextext>
    
    <br><br>

    <sui-tooltip>
      <div slot="tool"
        style="font-size: 1.2em; font-weight: bold; background-color: red;color:white;padding: .25em;cursor: pointer;">
        Hover me to say HI</div>
      <div slot="tip" style="background-color: black;color:white;padding:.5em;">
        Hello
      </div>
    </sui-tooltip>
    
    <br><br>

    <button onclick='overlay.open()'>Click me</button>
    <sui-overlay id="overlay" onclick="this.close()">
        <div style="background-color:antiquewhite;border: solid 4px black;padding:1em;">
            <h1>Hello Skate UI</h1>
        </div>
    </sui-overlay>
    
    <br><br>
    
    <sui-textarea placeholder="Skate Textarea"></sui-textarea>
</body>