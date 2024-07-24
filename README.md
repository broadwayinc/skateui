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

    <button onclick='overlay.open()'>Click me</button>
    <sui-overlay id="overlay" onclick="this.close()">
        <div style="background-color:antiquewhite;border: solid 4px black;padding:1em;">
            <h1>Hello Skate UI</h1>
        </div>
    </sui-overlay>
    
    <br><br>
    
    <sui-textarea placeholder="Skate Textarea"></sui-textarea>
</body>