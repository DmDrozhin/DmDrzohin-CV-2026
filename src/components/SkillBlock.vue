<script setup>
import { computed } from 'vue';

const props = defineProps({
  options: {
    type: Object,
    default: () => ({})
  }
});

const defaults = {
  id: 100,
  type: 1,
  accented: false,
  skill: '',
  img: '',
  img_size: 24
};

const setts = computed(() => ({
  ...defaults,
  ...props.options
}));

const skillSlug = computed(() => {
  return setts.value.skill
    ? setts.value.skill.toLowerCase().replace(/\s+/g, '-')
    : '';
});
</script>

<template>
  <div
    v-if="setts.skill"
    class="skill-item"
    :class="[skillSlug, { accented: setts.accented }]"
  >
    <v-img
      v-if="setts.img"
      class="skill-item__icon"
      :src="setts.img"
      :alt="`${setts.skill} icon`"
      :width="setts.img_size"
      cover
    />
    <span class="skill-item__name">{{ setts.skill }}</span>
  </div>
</template>

<style lang="scss" scoped>
.skill-item {
  position: relative;
  flex-shrink: 0;
  min-height: 28px;
  border-radius: 16px;
  padding: 0 8px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 4px;
  background-color: rgb(var(--v-theme-background));
  outline: 1px solid rgb(var(--v-theme-skill-chip-outline));
  z-index: auto;
  margin: 0;
  &__name {
    flex-shrink: 0;
    line-height: 1;
    font-size: 0.85rem;
  }
  &.accented {
    overflow: visible;
    &::before {
      content: '';
      position: absolute;
      $offset: 8px;
      $size: calc(28px + $offset * 2);
      top: -$offset;
      left: -$offset;
      border-radius: 50%;
      width: $size;
      height: $size;
      background-color: rgb(var(--v-theme-background-letter-3));
      outline: 1px solid rgb(var(--v-theme-skill-chip-outline));
      z-index: -1;
    }
  }
}
</style>
