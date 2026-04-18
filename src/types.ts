export interface Document {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}

export interface Settings {
  theme: 'parchment';
  parchmentWarmth: number;
  fontSize: number;
  reducedMotion: boolean;
  autosave: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  theme: 'parchment',
  parchmentWarmth: 50,
  fontSize: 18,
  reducedMotion: false,
  autosave: true,
};
