<script setup>
import { computed } from 'vue';
const props = defineProps({
  options: {
    type: Object,
    default: () => ({})
  }
});

const defaults = {
  title: '',
  skill: 'Main skill',
  api: '',
  append: '',
  img: '',
  img_size: 34
};

const setts = computed(() => ({
  ...defaults,
  ...props.options
}));
</script>

<template>
  <div v-if="setts.title" class="section-title">{{ setts.title }}:</div>
  <div v-if="setts.skill" class="main-skill accented">
    <v-img
      v-if="setts.img"
      class="main-skill__icon"
      :src="setts.img"
      :alt="`${setts.skill} icon`"
      :style="{ width: setts.img_size + 'px' }"
    />
    <div class="main-skill__name name">
      <div v-if="setts.skill" class="name__skill">{{ setts.skill }}</div>
      <div v-if="setts.api" class="name__apis">{{ setts.api }}</div>
      <div v-if="setts.append" class="name__appending">{{ setts.append }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.section-title {
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  color: rgb(var(--v-theme-accented-text));
}
.main-skill {
  position: relative;
  min-height: 28px;
  padding: 0 8px 0 36px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: rgb(var(--v-theme-background));
  outline: 1px solid rgb(var(--v-theme-skill-chip-outline));
  margin-bottom: 0.5rem;
  &__icon {
    position: absolute;
    max-height: unset !important;
    left: 0;
    top: 0;
  }
  &__name {
    width: 100%;
  }
  .name {
    width: 100%;
    display: flex;
    gap: 4px;
    line-height: 0.8;
    color: rgb(var(--v-theme-background-divider));
    &__skill, &__appending {
      align-self: center;
      font-size: 1.2rem;
    }
    &__apis {
      max-width: min-content;
      gap: 2px;
      font-size: 0.85rem;
    }
  }
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
    z-index: -1;
    background-color: rgb(var(--v-theme-background-letter-3));
    outline: 1px solid rgb(var(--v-theme-skill-chip-outline));
  }
}
</style>
