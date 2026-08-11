import {
  LitElement,
  html,
  customElement,
  property,
  TemplateResult,
  CSSResult,
  css,
  internalProperty,
} from 'lit-element';
import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { LinakDeskCardConfig } from './types';
import { localize } from './localize/localize';

@customElement('linak-desk-card-editor')
export class LinakDeskCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @internalProperty() private _config!: LinakDeskCardConfig;

  public setConfig(config: LinakDeskCardConfig): void {
    this._config = config;
  }

  protected render(): TemplateResult | void {
    if (!this.hass || !this._config) {
      return html``;
    }

    const schema = [
      {
        name: 'name',
        selector: { text: {} },
      },
      {
        name: 'desk',
        required: true,
        selector: { entity: { domain: 'cover' } },
      },
      {
        name: 'height_sensor',
        required: true,
        selector: { entity: { domain: 'sensor', device_class: 'distance' } },
      },
    ];

    const computeLabel = (schemaItem) => {
      switch (schemaItem.name) {
        case 'name':
          return localize('editor.name') || 'Name';
        case 'desk':
          return localize('editor.desk') || 'Desk Entity';
        case 'height_sensor':
          return localize('editor.height_sensor') || 'Height Sensor';
        default:
          return schemaItem.name;
      }
    };

    return html`
      <div class="card-config">
        <ha-form
          .hass=${this.hass}
          .data=${this._config}
          .schema=${schema}
          .computeLabel=${computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <div class="presets-container">
          <h4>${localize('editor.presets') || 'Presets'}</h4>
          ${(this._config.presets || []).map(
            (p, i) => html`
              <div class="preset">
                <!-- Replaced ha-textfield with ha-input for modern HA -->
                <ha-input
                  .hint=${'Label'}
                  .value=${p.label}
                  .presetValue=${'label'}
                  .presetIndex=${i}
                  @input=${this._presetChanged}
                ></ha-input>
                <ha-input
                  .hint=${'Target (cm)'}
                  .value=${p.target}
                  .presetValue=${'target'}
                  .presetIndex=${i}
                  type="number"
                  @input=${this._presetChanged}
                ></ha-input>
                <ha-icon-button
                  .path=${'M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z'}
                  .presetIndex=${i}
                  @click=${this.removePreset}
                ></ha-icon-button>
              </div>
            `,
          )}
          <div class="add-preset" @click=${this.addPreset}><ha-icon icon="mdi:plus"></ha-icon> Add Preset</div>
        </div>
      </div>
    `;
  }

  private _presetChanged(ev: any): void {
    const target = ev.target;
    const value = target.type === 'number' ? parseInt(target.value) || 0 : target.value;

    const newPresets = [...(this._config.presets || [])];
    newPresets[target.presetIndex] = {
      ...newPresets[target.presetIndex],
      [target.presetValue]: value,
    };

    this._config = {
      ...this._config,
      presets: newPresets,
    };

    this.fireConfigChangeEvent();
  }

  private fireConfigChangeEvent() {
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: this._config } }));
  }

  private _valueChanged(ev: CustomEvent): void {
    if (!this._config || !this.hass) {
      return;
    }

    const newConfig = ev.detail.value;

    this._config = {
      ...this._config,
      ...newConfig,
    };

    this.fireConfigChangeEvent();
  }

  addPreset(): void {
    this._config = {
      ...this._config,
      presets: [...(this._config.presets || []), { label: 'New Preset', target: 62 }],
    };
    this.fireConfigChangeEvent();
  }

  removePreset(ev: any): void {
    const index = ev.currentTarget.presetIndex;
    this._config = {
      ...this._config,
      presets: (this._config.presets || []).filter((_, i) => i !== index),
    };
    this.fireConfigChangeEvent();
  }

  static get styles(): CSSResult {
    return css`
      .presets-container {
        margin-top: 24px;
      }
      h4 {
        margin-bottom: 12px;
        margin-top: 0;
      }
      .preset {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        position: relative; /* Anchor for the absolute positioned icon */
        gap: 16px;
        margin-bottom: 8px;
        padding-right: 48px; /* Leave space on the right for the X button */
      }
      .preset > ha-input {
        flex: 1;
      }
      ha-icon-button {
        color: var(--secondary-text-color);
        /* Mathematically force the X to the middle of the text input area */
        position: absolute;
        right: -8px;
        top: 8px; /* Pushes it down exactly to the vertical center of the text fields */
        --mdc-icon-button-size: 40px;
      }
      .add-preset {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        color: var(--primary-color);
        cursor: pointer;
        font-weight: 500;
        margin-top: 12px;
        padding: 8px 0;
        user-select: none;
        -webkit-user-select: none;
      }
      .add-preset:hover {
        text-decoration: underline;
      }
    `;
  }
}
