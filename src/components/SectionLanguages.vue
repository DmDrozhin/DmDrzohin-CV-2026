<script setup>
import TitleBlock from '@/components/TitleBlock.vue';

defineProps({
  options: {
    type: Object,
    default: () => ({}),
    required: false
  }
});
</script>
<template>
  <div v-if="options?.description.length" class="langs">
    <TitleBlock
      v-if="options.title"
      :symbol="options.symbol"
      :title="options.title"
      :darken="true"
    />
    <div
      v-for="lang in options.description"
      :key="lang.language"
      class="language"
      :class="options.customClass || ''"
    >
      <div v-if="lang.language" class="language__name">{{ lang.language }}</div>
      <div v-if="lang.level" class="language__level">▪️ {{ lang.level }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.langs {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.language {
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 4px;
  min-height: 28px;
  line-height: 1;
  font-size: 0.85rem;
  border-radius: 50px;
  padding: 0 8px;
  background-color: rgb(var(--v-theme-background));
  outline: 1px solid rgb(var(--v-theme-skill-chip-outline));
  margin: 0 auto;
  &__name {
    white-space: nowrap;
  }
}
</style>
