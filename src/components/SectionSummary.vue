<!-- eslint-disable vue/no-v-html -->
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
  <TitleBlock
    v-if="options.title"
    :symbol="options.symbol"
    :title="options.title"
    :darken="false"
  />
  <ul v-if="options.description?.length" class="summary">
    <li
      v-for="(entry, idx) in options.description"
      :key="idx"
      class="summary__entry"
    >
      {{ entry }}
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.summary {
  width: 100%;
  list-style: none;
  &__entry {
    position: relative;
  }
  &__entry::before {
    content: '✪';
    color: $green-md;
    font-size: 1rem;
    position: absolute;
    top: -0.12rem;
    left: -1rem;
  }
}
</style>
