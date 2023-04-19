# Skate UI

## Objective:
- UI component 100% compatible with vanilla HTML.
- All HTML attributes should be functional.
- Style should be easily customizable via css without implementing additional custom attributes.

## Notes
- skateui component is reactive to font-size. this was an intended decision.
- skateui has shallow bevels on most components. If you are not a fan of the looks, set css box-shadow to none.

### Known quirks
- In safari, outline does not follow border radius.
- Chrome on linux use text color for input focus outline.
- skateui use MutationObserver internally. When developing, depending on the os/browser, there can be some minor quirks when:
    - trying to modify css styles directly from developers panel in web browsers.
    - working on live reloads in SPA development.
    
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

    <sui-overlay id="overlay" onclick="this.close()">
        <div style="background-color:antiquewhite;border: solid 4px black;padding:1em;">
            <h1>Hello Skate UI</h1>
        </div>
    </sui-overlay>
    
    <br><br>
    
    <sui-button onclick="overlay.open()">Skate Button</sui-button>

    <br><br>

    <sui-input value='Skate Input'></sui-input>

    <br><br>

    <sui-select>
        <option value="skateui">Skate Selector</option>
    </sui-select>

    <br><br>

    <sui-textarea placeholder="Skate Textarea"></sui-textarea>
</body>
```
<!-- 
```js
import { defineCustomElements } from 'skateui/loader';
defineCustomElements(window);
``` -->