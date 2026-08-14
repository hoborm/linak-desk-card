export interface LinakDeskCardPreset {
  label: string;
  target: number;
}

export interface LinakDeskCardConfig {
  type?: string;
  name?: string;
  desk: string;
  height_sensor: string;
  min_height?: number;
  max_height?: number;
  presets?: LinakDeskCardPreset[];
  gradient_top_color?: string;
  gradient_bottom_color?: string;
  text_color?: string;
}
