// lib/colors.ts
export const sriLankaColors = {
  teaGreen: '#0D7340',       // 茶畑グリーン（プライマリーカラー）
  spiceOrange: '#F18F01',    // スパイスオレンジ（セカンダリーカラー）
  lionGold: '#FFC40C',       // ライオンゴールド（アクセントカラー）
  oceanBlue: '#1A9DAB',      // インド洋ブルー
  cinnamonBrown: '#8B4513',  // シナモンブラウン
  lotusLight: '#F8BBD0',     // ロータスピンク（薄め）
  textDark: '#333333',       // テキスト用ダーク
  textLight: '#FFFFFF',      // テキスト用ライト
  bgLight: '#F5F5F5',        // 背景色（薄いベージュ）
  cardBg: '#FFFFFF',         // カードの背景色
};

// Tailwind用のカラー設定
export const tailwindColors = {
  primary: {
    DEFAULT: '#0D7340',
    light: '#2E9D6A',
  },
  secondary: {
    DEFAULT: '#F18F01',
    light: '#FFAB3D',
  },
  accent: {
    DEFAULT: '#FFC40C',
    light: '#FFD650',
  },
  ocean: {
    DEFAULT: '#1A9DAB',
    light: '#3FC1D0',
  },
  cinnamon: {
    DEFAULT: '#8B4513',
    light: '#B67646',
  },
  lotus: {
    DEFAULT: '#F8BBD0',
    light: '#FBD8E4',
  },
  gray: {
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
};

export type ColorName = 
  | 'teaGreen' 
  | 'spiceOrange' 
  | 'lionGold' 
  | 'oceanBlue' 
  | 'cinnamonBrown' 
  | 'lotusLight';

// useColor型フックのための返り値型
export interface ColorValue {
  main: string;
  light: string;
  dark: string;
  text: string;
  contrastText: string;
}

export const getColorValues = (colorName: ColorName): ColorValue => {
  const colors: Record<ColorName, ColorValue> = {
    teaGreen: {
      main: sriLankaColors.teaGreen,
      light: '#2E9D6A',
      dark: '#0A592F',
      text: sriLankaColors.teaGreen,
      contrastText: sriLankaColors.textLight,
    },
    spiceOrange: {
      main: sriLankaColors.spiceOrange,
      light: '#FFAB3D',
      dark: '#D17900',
      text: sriLankaColors.spiceOrange,
      contrastText: sriLankaColors.textLight,
    },
    lionGold: {
      main: sriLankaColors.lionGold,
      light: '#FFD650',
      dark: '#DDA60A',
      text: sriLankaColors.lionGold,
      contrastText: sriLankaColors.textDark,
    },
    oceanBlue: {
      main: sriLankaColors.oceanBlue,
      light: '#3FC1D0',
      dark: '#147A84',
      text: sriLankaColors.oceanBlue,
      contrastText: sriLankaColors.textLight,
    },
    cinnamonBrown: {
      main: sriLankaColors.cinnamonBrown,
      light: '#B67646',
      dark: '#6E370F',
      text: sriLankaColors.cinnamonBrown,
      contrastText: sriLankaColors.textLight,
    },
    lotusLight: {
      main: sriLankaColors.lotusLight,
      light: '#FBD8E4',
      dark: '#F59EBC',
      text: '#D4679A',
      contrastText: sriLankaColors.textDark,
    },
  };
  
  return colors[colorName];
};