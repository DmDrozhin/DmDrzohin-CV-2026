import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { useTheme } from 'vuetify';
import { useHeader, useSections, useSkills } from '@/composables/useResume';

export const useMainStore = defineStore('main', () => {
  const theme = useTheme();

  const resumeData = reactive({
    header: null,
    sectionsDynamic: null,
    sectionsStatic: null
  });

  const currentLang = ref('ua');
  const currentTheme = ref('light');
  const isLoading = ref(false);

  const avatar = computed(() => {
    return currentTheme.value === 'light'
      ? resumeData.header?.avatar?.avatar_light
      : resumeData.header?.avatar?.avatar_dark;
  });

  const loadResumeData = async () => {
    isLoading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (!resumeData.header) {
      const { header } = useHeader();
      resumeData.header = header.value;
    }
    if (!resumeData.sectionsStatic) {
      const { sectionsStatic: skillsData } = useSkills();
      resumeData.sectionsStatic = skillsData.value;
    }

    const { sectionsDynamic: sectionsData } = useSections(currentLang.value);
    resumeData.sectionsDynamic = sectionsData.value;

    isLoading.value = false;
  };

  const updateLang = async (lang) => {
    if (!['ua', 'en'].includes(lang)) {
      return;
    }
    currentLang.value = lang;
    await loadResumeData();
  };

  const updateTheme = (themeName) => {
    if (!['light', 'dark'].includes(themeName)) {
      return;
    }
    currentTheme.value = themeName;
    theme.change(themeName);
  };

  return {
    avatar,
    resumeData,
    currentLang,
    currentTheme,
    isLoading,
    updateTheme,
    updateLang,
    loadResumeData
  };
});
