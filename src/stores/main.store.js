import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useTheme } from 'vuetify';

export const useMainStore = defineStore('main', () => {
  const theme = useTheme();
  const currentLang = ref('ua');
  const currentTheme = ref('light');

  const updateTheme = (themeName) => {
    if (!['light', 'dark'].includes(themeName)) {
      // eslint-disable-next-line no-console
      console.warn('Unexpected theme name:', themeName);
      return;
    }
    currentTheme.value = themeName;
    // and changing theme in Vuetify
    theme.change(themeName);
  };

  const updateLang = (lang) => {
    if (!['ua', 'en'].includes(lang)) {
      // eslint-disable-next-line no-console
      console.error('Unexpected lang name:', lang);
      return;
    }
    currentLang.value = lang;
  };

  return {
    currentLang,
    currentTheme,
    updateTheme,
    updateLang
  };
});
