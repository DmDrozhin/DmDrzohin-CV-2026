<script setup>
import { computed } from 'vue';
import { useMainStore } from '@/stores/main.store.js';

const store = useMainStore();

const langModel = computed({
  get: () => store.currentLang,
  set: (val) => val && store.updateLang(val)
});

const themeModel = computed({
  get: () => store.currentTheme,
  set: (val) => val && store.updateTheme(val)
});
</script>
<template>
  <div class="switcher-block">
    <v-btn-toggle
      v-model="langModel"
      mandatory
      class="switcher-block__toggle"
      density="compact"
      variant="text"
      selected-class="text-primary"
    >
      <v-btn value="ua" size="x-small" slim>UA</v-btn>
      <v-btn value="en" size="x-small" slim>EN</v-btn>
    </v-btn-toggle>

    <div class="divider mx-2">|</div>

    <v-btn-toggle
      v-model="themeModel"
      mandatory
      class="switcher-block__toggle"
      density="compact"
      variant="text"
      selected-class="text-primary"
    >
      <v-btn value="light" size="x-small" slim>Light</v-btn>
      <v-btn value="dark" size="x-small" slim>Dark</v-btn>
    </v-btn-toggle>
  </div>
</template>
<style lang="scss" scoped>
.switcher-block {
  display: flex;
  gap: 8px;
  &__toggle {
    max-height: 20px;
    overflow-x: hidden;
  }
  &__toggle.theme::before {
    content: '|';
    margin: 0 8px;
    line-height: 1;
    color: rgba(var(--v-theme-background-divider));
  }
}
</style>
