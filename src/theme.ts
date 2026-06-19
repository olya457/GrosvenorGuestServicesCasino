import {Platform, StatusBar} from 'react-native';

export const colors = {
  background: '#111936',
  surface: '#253665',
  surfaceSoft: '#304679',
  surfaceStrong: '#1a2548',
  border: 'rgba(255,255,255,0.14)',
  text: '#f7f8ff',
  muted: '#c8d0e6',
  faint: '#93a0c7',
  accent: '#247d62',
  accentSoft: '#2b9a7a',
  danger: '#c95663',
  warning: '#d6a749',
  blue: '#3869d9',
};

export const spacing = {
  screenX: 20,
  radius: 8,
  tabHeight: 74,
  tabBottom: Platform.OS === 'ios' ? 20 : 30,
  androidEdge: Platform.OS === 'android' ? 30 : 0,
  top: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 30 : 58,
};

export const typography = {
  title: 24,
  heading: 18,
  body: 15,
  small: 12,
};
