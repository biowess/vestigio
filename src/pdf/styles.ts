import { StyleSheet, Font } from '@react-pdf/renderer';

import PlayfairDisplayRegular from '../assets/fonts/PlayfairDisplay-Regular.ttf';
import PlayfairDisplayBold from '../assets/fonts/PlayfairDisplay-Bold.ttf';
import PlayfairDisplayItalic from '../assets/fonts/PlayfairDisplay-Italic.ttf';
import PlayfairDisplayBoldItalic from '../assets/fonts/PlayfairDisplay-BoldItalic.ttf';

import EBGaramondRegular from '../assets/fonts/EBGaramond-Regular.ttf';
import EBGaramondBold from '../assets/fonts/EBGaramond-Bold.ttf';
import EBGaramondItalic from '../assets/fonts/EBGaramond-Italic.ttf';
import EBGaramondBoldItalic from '../assets/fonts/EBGaramond-BoldItalic.ttf';

import InterRegular from '../assets/fonts/Inter-Regular.ttf';
import PinyonScriptRegular from '../assets/fonts/PinyonScript-Regular.ttf';
import MonaspaceNeonFrozenMedium from '../assets/fonts/MonaspaceNeonFrozen-Medium.ttf';

// Register Playfair Display
Font.register({
  family: 'Playfair Display',
  fonts: [
    { src: PlayfairDisplayRegular, fontWeight: 400 },
    { src: PlayfairDisplayBold, fontWeight: 700 },
    { src: PlayfairDisplayItalic, fontWeight: 400, fontStyle: 'italic' },
    { src: PlayfairDisplayBoldItalic, fontWeight: 700, fontStyle: 'italic' },
  ],
});

// Register EB Garamond
Font.register({
  family: 'EB Garamond',
  fonts: [
    { src: EBGaramondRegular, fontWeight: 400 },
    { src: EBGaramondBold, fontWeight: 700 },
    { src: EBGaramondItalic, fontWeight: 400, fontStyle: 'italic' },
    { src: EBGaramondBoldItalic, fontWeight: 700, fontStyle: 'italic' },
  ],
});

// Register Inter
Font.register({
  family: 'Inter',
  fonts: [{ src: InterRegular, fontWeight: 400 }],
});

// Register Pinyon Script
Font.register({
  family: 'Pinyon Script',
  fonts: [{ src: PinyonScriptRegular, fontWeight: 400 }],
});

// Register Monaspace Neon Frozen
Font.register({
  family: 'Monaspace Neon Frozen',
  fonts: [{ src: MonaspaceNeonFrozenMedium, fontWeight: 500 }],
});

export function interpolateParchmentWarmth(warmth: number) {
  const startColor = { r: 255, g: 255, b: 255 };
  const endColor = { r: 253, g: 252, b: 247 };

  const factor = Math.max(0, Math.min(100, warmth)) / 100;

  const r = Math.round(startColor.r + (endColor.r - startColor.r) * factor);
  const g = Math.round(startColor.g + (endColor.g - startColor.g) * factor);
  const b = Math.round(startColor.b + (endColor.b - startColor.b) * factor);

  return `rgb(${r}, ${g}, ${b})`;
}

export const styles = StyleSheet.create({
  page: {
    padding: '60pt 50pt',
    fontFamily: 'EB Garamond',
    fontWeight: 400,
  },

content: {
    flexDirection: 'column',
  },

  title: {
    fontSize: 32,
    fontFamily: 'Playfair Display',
    fontWeight: 500,
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 20,
    color: '#2a2723',
  },
  h1: {
    fontSize: 28,
    fontFamily: 'Playfair Display',
    fontWeight: 500,
    marginBottom: 16,
    marginTop: 24,
    color: '#2a2723',
  },
  h2: {
    fontSize: 22,
    fontFamily: 'Playfair Display',
    fontWeight: 500,
    marginBottom: 12,
    marginTop: 20,
    borderBottom: '0.5pt solid #e8e4d9',
    paddingBottom: 4,
    color: '#2a2723',
  },
  h3: {
    fontSize: 18,
    fontFamily: 'Playfair Display',
    fontWeight: 500,
    marginBottom: 8,
    marginTop: 16,
    color: '#2a2723',
  },
  paragraph: {
    fontSize: 12,
    lineHeight: 1.6,
    marginBottom: 12,
    textAlign: 'justify',
    color: '#2a2723',
    fontWeight: 400,
  },
  blockquote: {
    borderLeft: '2pt solid #c5a059',
    paddingLeft: 12,
    marginLeft: 10,
    marginBottom: 16,
    fontStyle: 'italic',
    color: '#555',
  },
  codeBlock: {
    backgroundColor: '#f5f2e9',
    padding: 10,
    borderRadius: 4,
    marginBottom: 16,
    fontFamily: 'Monaspace Neon Frozen',
    fontSize: 9,
    lineHeight: 1.4,
  },
  inlineCode: {
    backgroundColor: '#f5f2e9',
    padding: '1pt 3pt',
    borderRadius: 2,
    fontFamily: 'Monaspace Neon Frozen',
    fontSize: 10,
  },
  list: {
    marginBottom: 12,
    paddingLeft: 20,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  listBullet: {
    width: 15,
    fontSize: 12,
  },
  listItemContent: {
    flex: 1,
    fontSize: 12,
    lineHeight: 1.6,
  },
  table: {
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e8e4d9',
    borderBottomWidth: 0,
    marginBottom: 16,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: '#e8e4d9',
    borderBottomWidth: 1,
  },
  tableColHeader: {
    width: '25%',
    backgroundColor: '#f5f2e9',
    padding: 6,
  },
  tableCol: {
    width: '25%',
    padding: 6,
  },
  tableCellHeader: {
    fontSize: 10,
    fontFamily: 'Playfair Display',
    fontWeight: 500,
    color: '#2a2723',
  },
  tableCell: {
    fontSize: 10,
    color: '#2a2723',
    fontWeight: 400,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    borderTop: '0.5pt solid #e8e4d9',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    opacity: 0.5,
  },
  footerText: {
    fontSize: 8,
    fontFamily: 'Inter',
    textTransform: 'uppercase',
    fontWeight: 400,
  },
  bold: {
    fontFamily: 'EB Garamond',
    fontWeight: 700,
  },
  italic: {
    fontFamily: 'EB Garamond',
    fontStyle: 'italic',
    fontWeight: 400,
  },
  boldItalic: {
    fontFamily: 'EB Garamond',
    fontStyle: 'italic',
    fontWeight: 700,
  },
});

