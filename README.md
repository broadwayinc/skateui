# Skate UI

## Objective:
  - Provide components that are commonly desired in web development, yet not so easy to implement.
  - UI component 100% compatible with vanilla HTML.
  - Style should be easily customizable via css without implementing additional custom attributes.

## Components:

- sui-nav: Navbar that hides when scrolling down, and shows when scrolling up.
  
  Attributes:
    - auto-hide: Number(Higher number means it will hide slower), default is 3.

- sui-flextext: Text that auto scales.
  
  Attributes:
    - min-size: number (Minimum font size allowed to scale down to)
    - max-size: number (Maximum font size allowed to scale up to)
  
- sui-tooltip: Tooltip that shows when hovering over an element.
  
  Slots:
    - tool: Element that will be hovered over.
    - tip: Element that will be shown as a tooltip.
  
- sui-overlay: Fully customizable overlay that shows when clicked.
  
  Attributes:
    - position: "top" | "bottom" | "left" | "right" | "center"(default)
    - transition-time: CSS time value, default is 0.25s
  
  Methods:
    - open(): Opens the overlay.
    - close(): Closes the overlay.
   
- sui-textarea: Textarea that auto resizes.

  Note:
    - Remove box-shadow to remove outline.
    - Use :focus-within to style when focused.

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