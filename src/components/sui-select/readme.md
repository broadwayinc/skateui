# sui-select



<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type                | Default                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ---------- | ---------- | ----------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `disabled` | `disabled` |             | `boolean`           | `undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `el`       | --         |             | `HTMLSelectElement` | `(() => {     const select = document.createElement('select');     select.setAttribute('tabindex', '0');     this.initEl(select);     select.addEventListener('change', () => {       if (select.value !== this.value) {         this.value = select.value \|\| '';       }     });      for (const [key, value] of Object.entries({       // set important styles       // these value should not be editable       'background': 'transparent',       'box-sizing': 'border-box',       'border': 'none',       'display': 'block',       'font-size': 'inherit',       'line-height': 'inherit',       '-webkit-appearance': 'none',       '-moz-appearance': 'none',       'appearance': 'none',       'cursor': this.multiple ? 'default' : 'pointer'     })) {       select.style.setProperty(key, value, 'important');     }      return select;   })()` |
| `multiple` | `multiple` |             | `boolean`           | `undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `required` | `required` |             | `boolean`           | `undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `value`    | `value`    |             | `string`            | `undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |


## Methods

### `setValueDefault() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
