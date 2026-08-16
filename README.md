# LinakDesk Card originally created by [@IhorSyerkov](https://github.com/IhorSyerkov) reworked **for** official IKEA IDASEN Desk HA integration

[![hacs][hacs-image]][hacs-url]

> [Home Assistant][home-assistant] Lovelace Card for controlling desks based on linak bluetooth controller.

![linak-desk-card_preview](/assets/linak-desk-card-preview.png)

Designed to work with <https://github.com/j5lien/esphome-idasen-desk-controller>

## HACS

This card is available in [HACS](https://hacs.xyz/) (Home Assistant Community Store).
Just search for `Linak Desk Card` in plugins tab.

## Config

```yaml
type: 'custom:linak-desk-card'
name: ''
desk: cover.desk
height_sensor: sensor.desk_height
hide_preset_height: true
presets:
  - label: Walking
    target: 114
  - label: Stand
    target: 110
  - label: Kneeling
    target: 80
  - label: Sit
    target: 63
```

| Name                  | Type    | Requirement | Description                                                            | Default              |
| --------------------- | ------- | ----------- | ---------------------------------------------------------------------- | -------------------- |
| type                  | string  | Required    | custom:linak-desk-card                                                 |                      |
| name                  | string  | Optional    | Card name                                                              | ''                   |
| desk                  | string  | Required    | Home Assistant entity ID (cover) for the desk                          | none                 |
| height_sensor         | string  | Required    | Home Assistant entity ID (sensor) for the current desk height          | none                 |
| min_height            | number  | Optional    | Minimum desk height in cm                                              | 62                   |
| max_height            | number  | Optional    | Maximum desk height in cm                                              | 127                  |
| presets               | array   | Optional    | Predefined presets ([{ label: string, target: number }])               | []                   |
| gradient_top_color    | string  | Optional    | Top gradient color (hex, rgb, etc.)                                    | --primary-color      |
| gradient_bottom_color | string  | Optional    | Bottom gradient color (hex, rgb, etc.)                                 | --dark-primary-color |
| text_color            | string  | Optional    | Text color for height, presets, and connection status (hex, rgb, etc.) | --text-primary-color |
| hide_preset_height    | boolean | Optional    | Hide the height value on preset buttons (show only label)              | false                |

### `preset` object

| Name     |   Type   | Description           |
| -------- | :------: | --------------------- |
| `label`  | `string` | Preset label.         |
| `target` | `number` | Absolute height in cm |

### New features since fork:

- **Custom color palette**

  - `gradient_top_color`: customize the top gradient color.
  - `gradient_bottom_color`: customize the bottom gradient color.
  - `text_color`: customize text color for height, presets, and connection status.
  - All three options are optional; if unset, the card falls back to theme colors:
    - `--primary-color` (top gradient)
    - `--dark-primary-color` (bottom gradient)
    - `--text-primary-color` (text)

- **Reset colors button**

  - Added a “Reset colors” button in the card editor.
  - Clears `gradient_top_color`, `gradient_bottom_color`, and `text_color` from the config.
  - Card reverts to default theme-based colors.

- **Hide preset height values**

  - New boolean option: `hide_preset_height`.
  - When `true`, preset buttons show only the label (e.g. “Sit”).
  - When `false` (default), buttons show “Label - 72 cm”.

- **Formatted height display**
  - Height value now uses Home Assistant’s entity formatting when available.
  - Uses `hass.formatEntityState(height_sensor)` to respect unit and number formatting.
  - Falls back to `"{rawHeight} cm"` if formatting is not available.

### Bug fixes

- **TypeScript / build warnings**

  - Fixed `setConfig` type in the editor to accept `LovelaceCardConfig` and cast to `LinakDeskCardConfig`, resolving interface mismatch warnings.
  - Added `declare global` block for `window.customCards` to remove “property does not exist on type Window” warnings.
  - Ensured `getConfigElement()` returns `as LovelaceCardEditor` to satisfy the `LovelaceCardEditor` interface.
  - Made `getStubConfig()` return `LovelaceCardConfig` explicitly.

- **Optional config handling**

  - All uses of `min_height` and `max_height` now safely fall back to defaults using `?? DEFAULT_CONFIG.min_height!` / `?? DEFAULT_CONFIG.max_height!`.
  - This removes “object is possibly undefined” warnings and prevents runtime issues when these fields are not set.

- **Removed unused outline/feet color logic**
  - Dropped `outline_color`, `feet_color`, and related CSS filter classes (`desk-outline`, `desk-feet`) that had no effect with PNG images.
  - Simplified rendering and styles to only use the supported color options.

## Supported languages

This card supports translations. Please, help to add more translations and improve existing ones. Here's a list of supported languages:

- English
- Українська (Ukrainian)

## Supported models

- Ikea IDÅSEN

## References

- Inspired by <https://github.com/macbury/SmartHouse/tree/master/home-assistant/www/custom-lovelace/linak-desk>
- Original card built by @IhorSyerkov at <https://github.com/IhorSyerkov/linak-desk-card>

## License

MIT ©

[home-assistant]: https://www.home-assistant.io/
[hacs]: https://hacs.xyz
[hacs-url]: https://github.com/hacs/integration
[hacs-image]: https://img.shields.io/badge/hacs-default-orange.svg?style=flat-square
