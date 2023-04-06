# Skate UI

Skate UI is a UI component for HTML.

Skate UI is designed to be compatible with HTML attributes and CSS customizable.

## Example

```html
<!DOCTYPE html>

<head>
    <script type='module' src="https://cdn.jsdelivr.net/npm/skateui@latest/dist/skateui/skateui.esm.js"></script>
</head>

<body>
    <!-- You can now use skateui components -->
    <sui-nav>Skate UI</sui-nav>
    <sui-overlay id="ovrly" onclick="this.close()">
        <div style="background-color:antiquewhite;border: solid 4px black;padding:1em;">
            <h1>Skate UI</h1>
        </div>
    </sui-overlay>
    <sui-button onclick="ovrly.open()">Skate UI</sui-button>
    <br>
    <sui-input value="Skate UI"></sui-input>
    <br>
    <sui-select>
        <option value="skateui">Skate UI</option>
    </sui-select>
    <br>
    <sui-textarea>Skate UI</sui-textarea>
    <br>
    <sui-tooltip>
        <div slot='tool'
            style="width: 2em;height:2em;background-color:black;color:white;font-size:1.5;font-weight: bold;display: flex;align-items: center;justify-content: center;">
            ?</div>
        <div slot='tip' style="background-color:blue;color:white;padding:1em;">
            <p style="margin:0;">Skate UI</p>
        </div>
    </sui-tooltip>
</body>
```