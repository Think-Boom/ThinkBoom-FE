type ThemeVariables = {
  bg_page1: string;
  bg_page2: string;
  bg_page3: string;
  button_1: string;
  button_2: string;
  overlay: string;
  white: string;
  black: string;
  gray: string;
  red: string;
  component_1: string;
  component_2: string;
  input_focus: string;
  input_normal: string;
  input_error: string;
  main_text1: string;
  main_text2: string;
  hover_text1: string;
  hover_text2: string;
  sub_text1: string;
  sub_text2: string;
  border_1: string;
  cute_button_normal: string;
  cute_button_disabled: string;
  toggle_border: string;
  toggle_white_circle: string;
  toggle_dark_circle: string;
  toggle_bg: string;
};

type Theme = 'light' | 'dark';
type VariableKey = keyof ThemeVariables;
type ThemedPalette = Record<VariableKey, string>;

const themeVariableSets: Record<Theme, ThemeVariables> = {
  light: {
    bg_page1: '#FFFFFF',
    bg_page2: '#F5F5F5',
    bg_page3: '#FFFFFF',
    button_1: '#1B1818',
    button_2: '#F5F5F5',
    overlay: '#1B11818',
    component_1: '#1B1818',
    component_2: '#FFFFFF',
    white: '#ffffff',
    black: '#1B1818',
    gray: '#F5F5F5',
    red: '#F41414',
    input_normal: '#F5F5F5',
    input_focus: '#1B1818',
    input_error: '#F41414',
    main_text1: '#1B1818',
    main_text2: '#FFFFFF',
    hover_text1: '#1B1818',
    hover_text2: '#FFFFFF',
    sub_text1: '#F41414',
    sub_text2: '#F5F5F5',
    border_1: '#1B1818',
    cute_button_normal: '#1B1818',
    cute_button_disabled: '#EEEEEE',
    toggle_border: '#1B1B1B',
    toggle_white_circle: '#1B1B1B',
    toggle_dark_circle: '#FFFFFF',
    toggle_bg: '#FFFFFF',
  },
  dark: {
    bg_page1: '#1A1B1F',
    bg_page2: '#45474A',
    bg_page3: '#1A1B1F',
    button_1: '#1B1818',
    button_2: '#F5F5F5',
    overlay: '#1B11818',
    component_1: '#1B1818',
    component_2: '#FFFFFF',
    white: '#fffff',
    black: '#1B1818',
    gray: '#F5F5F5',
    red: '#F41414',
    input_normal: '#45474A',
    input_focus: '#EEEEEE',
    input_error: '#890B0B',
    main_text1: '#EEEEEE',
    main_text2: '#1B1B1B',
    hover_text1: '#1B1818',
    hover_text2: '#FFFFFF',
    sub_text1: '#890B0B',
    sub_text2: '#86878C',
    border_1: '#1B1818',
    cute_button_normal: '#2B2C31',
    cute_button_disabled: '#EEEEEE',
    toggle_border: '#eeeeee',
    toggle_white_circle: '#1B1B1B',
    toggle_dark_circle: '#eeeeee',
    toggle_bg: '#1B1B1B',
  },
};

const buildCssVariables = (variables: ThemeVariables) => {
  const keys = Object.keys(variables) as (keyof ThemeVariables)[];
  return keys.reduce(
    (acc, key) => acc.concat(`--${key.replace(/_/g, '-')}: ${variables[key]};`, '\n'),
    '',
  );
};

export const themes = {
  light: buildCssVariables(themeVariableSets.light),
  dark: buildCssVariables(themeVariableSets.dark),
};

const cssVar = (name: string) => `var(--${name.replace(/_/g, '-')})`;

const variableKeys = Object.keys(themeVariableSets.light) as VariableKey[];

export const themedPalette: Record<VariableKey, string> = variableKeys.reduce((acc, current) => {
  acc[current] = cssVar(current);
  return acc;
}, {} as ThemedPalette);
