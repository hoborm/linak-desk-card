import {
  LitElement,
  html,
  customElement,
  property,
  CSSResult,
  TemplateResult,
  css,
  PropertyValues,
  internalProperty,
} from 'lit-element';
import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import type { LinakDeskCardConfig } from './types';
import { localize } from './localize/localize';
import { HassEntity } from 'home-assistant-js-websocket';
import tableBottomImg from './table_bottom.png';
import tableMiddleImg from './table_middle.png';
import tableTopImg from './table_top.png';
import './editor';

window.customCards = window.customCards || [];
window.customCards.push({
  preview: true,
  type: 'linak-desk-card',
  name: localize('common.name'),
  description: localize('common.description'),
});

const DEFAULT_CONFIG: Partial<LinakDeskCardConfig> = {
  min_height: 62,
  max_height: 127,
  presets: [],
};

@customElement('linak-desk-card')
export class LinakDeskCard extends LitElement {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement('linak-desk-card-editor');
  }

  public static getStubConfig(): Partial<LinakDeskCardConfig> {
    return { ...DEFAULT_CONFIG };
  }

  @property({ attribute: false }) public hass!: HomeAssistant;
  @internalProperty() private config!: LinakDeskCardConfig;

  public setConfig(config: LinakDeskCardConfig): void {
    if (!config.desk) {
      throw new Error('Desk cover entity is required');
    }

    if (!config.height_sensor) {
      throw new Error('Height sensor entity is required');
    }

    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    } as LinakDeskCardConfig;
  }

  get desk(): HassEntity {
    return this.hass.states[this.config.desk];
  }

  get rawHeight(): number {
    return parseFloat(this.hass.states[this.config.height_sensor]?.state) || 0;
  }

  get displayHeight(): string {
    const heightObj = this.hass.states[this.config.height_sensor];
    if (heightObj && (this.hass as any).formatEntityState) {
      return (this.hass as any).formatEntityState(heightObj);
    }
    return `${this.rawHeight} cm`;
  }

  get connected(): boolean {
    return this.desk && !['unavailable', 'unknown'].includes(this.desk.state);
  }

  get moving(): boolean {
    return ['opening', 'closing'].includes(this.desk?.state);
  }

  get alpha(): number {
    const boundedHeight = Math.min(Math.max(this.rawHeight, this.config.min_height), this.config.max_height);
    return (boundedHeight - this.config.min_height) / (this.config.max_height - this.config.min_height);
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) {
      return false;
    }

    if (changedProps.has('config')) {
      return true;
    }

    const newHass = changedProps.get('hass') as HomeAssistant | undefined;
    if (newHass) {
      return (
        newHass.states[this.config.desk] !== this.hass.states[this.config.desk] ||
        newHass.states[this.config.height_sensor]?.state !== this.hass.states[this.config.height_sensor]?.state
      );
    }

    return true;
  }

  protected render(): TemplateResult | void {
    const gradientTop = this.config.gradient_top_color || 'var(--primary-color)';
    const gradientBottom = this.config.gradient_bottom_color || 'var(--dark-primary-color)';

    return html`
      <ha-card .header=${this.config.name}>
        <div class="connection">
          ${localize(this.connected ? 'status.connected' : 'status.disconnected')}
          <div class="indicator ${this.connected ? 'connected' : 'disconnected'}"></div>
        </div>

        <div class="preview" style="--desk-gradient-top: ${gradientTop}; --desk-gradient-bottom: ${gradientBottom};">
          <img src="${tableTopImg}" style="transform: translateY(${this.calculateOffset(90)}px);" />
          <img src="${tableMiddleImg}" style="transform: translateY(${this.calculateOffset(60)}px);" />
          <img src="${tableBottomImg}" />

          <div class="height" style="transform: translateY(${this.calculateOffset(90)}px);">${this.displayHeight}</div>

          <div class="knob">
            <div
              class="knob-button"
              @touchstart=${this.goUp}
              @mousedown=${this.goUp}
              @touchend=${this.stop}
              @mouseup=${this.stop}
            >
              <ha-icon icon="mdi:chevron-up"></ha-icon>
            </div>
            <div
              class="knob-button"
              @touchstart=${this.goDown}
              @mousedown=${this.goDown}
              @touchend=${this.stop}
              @mouseup=${this.stop}
            >
              <ha-icon icon="mdi:chevron-down"></ha-icon>
            </div>
          </div>

          ${this.renderPresets()}
        </div>
      </ha-card>
    `;
  }

  calculateOffset(maxValue: number): number {
    return Math.round(maxValue * (1.0 - this.alpha));
  }

  renderPresets(): TemplateResult {
    return html`
      <div class="presets">
        ${(this.config.presets || []).map(
          (item) => html`
            <paper-button @click=${() => this.handlePreset(item.target)}>
              ${item.label} - ${item.target} cm
            </paper-button>
          `,
        )}
      </div>
    `;
  }

  handlePreset(target: number): void {
    if (target > this.config.max_height || target < this.config.min_height) {
      return;
    }

    const travelDistance = this.config.max_height - this.config.min_height;
    const position = Math.round(((target - this.config.min_height) / travelDistance) * 100);

    this.callService('set_cover_position', { position });
  }

  private goUp(): void {
    this.callService('open_cover');
  }

  private goDown(): void {
    this.callService('close_cover');
  }

  private stop(): void {
    this.callService('stop_cover');
  }

  private callService(service: string, options = {}): void {
    this.hass.callService('cover', service, {
      entity_id: this.config.desk,
      ...options,
    });
  }

  static get styles(): CSSResult {
    return css`
      :host {
        display: flex;
        flex: 1;
        flex-direction: column;
        height: 100%;
      }

      ha-card {
        display: flex;
        flex: 1;
        flex-direction: column;
        height: 100%;
        position: relative;
        padding: 0;
        border-radius: var(--ha-card-border-radius, 12px);
        overflow: hidden;
      }

      .preview {
        display: flex;
        flex: 1;
        position: relative;
        width: 100%;
        min-height: 365px;
        overflow: hidden;
        background: linear-gradient(to bottom, var(--desk-gradient-top), var(--desk-gradient-bottom));
      }

      .preview img {
        position: absolute;
        bottom: 0;
        transition: transform 0.2s linear;
      }

      .preview .knob {
        position: absolute;
        display: flex;
        flex-direction: column;
        left: 20px;
        bottom: 12px;
        width: 50px;
        height: 120px;
        overflow: hidden;
        border-radius: 35px;
        background: #fff;
        box-shadow: 0 0 36px rgba(0, 0, 0, 0.3);
      }

      .preview .knob .knob-button {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
      }

      .preview .knob .knob-button ha-icon {
        color: #030303;
        cursor: pointer;
      }

      .preview .knob .knob-button:active {
        background: rgba(0, 0, 0, 0.06);
      }

      .height {
        position: absolute;
        top: 60px;
        left: 30px;
        color: var(--text-primary-color, #fff);
        font-size: 32px;
        font-weight: bold;
        transition: transform 0.2s linear;
      }

      .presets {
        position: absolute;
        top: 10%;
        right: 5%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 36%;
        min-width: 120px;
        height: 80%;
      }

      .presets > paper-button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        margin-bottom: 5px;
        border-radius: 20px;
        background-color: rgba(255, 255, 255, 0.15);
        color: var(--text-primary-color, #fff);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        font-size: 16px;
        font-weight: 500;
        transition: background-color 0.2s;
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
      }

      .presets > paper-button:hover {
        background-color: rgba(255, 255, 255, 0.25);
      }

      .connection {
        position: absolute;
        top: 10px;
        right: 12px;
        z-index: 10;
        display: flex;
        align-items: center;
        color: var(--text-primary-color, #fff);
      }

      .connection .indicator {
        width: 10px;
        height: 10px;
        margin-left: 10px;
        border-radius: 50%;
      }

      .indicator.connected {
        background-color: #4caf50;
      }

      .indicator.disconnected {
        background-color: #f44336;
      }
    `;
  }
}
