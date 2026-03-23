<script setup>
import TitleBlock from '@/components/TitleBlock.vue';

defineProps({
  options: {
    type: Object,
    default: () => ({})
  }
});
</script>

<template>
  <div v-if="options?.description?.length" class="education">
    <TitleBlock
      v-if="options.title"
      :symbol="options.symbol"
      :title="options.title"
      :darken="true"
    />
    <div
      v-for="(it, idx) in options.description"
      :key="idx"
      class="education__entry"
    >
      <div class="education__institution">{{ it.institution }}</div>
      <div class="education__degree">{{ it.degree }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.education {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;
  &__institution {
    font-size: 1rem;
    font-weight: 600;
  }
  &__degree {
    font-size: 0.85rem;
    font-weight: 400;
  }
}
</style>
