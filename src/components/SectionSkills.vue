<script setup>
import TitleBlock from '@/components/TitleBlock.vue';
import SkillBlock from '@/components/SkillBlock.vue';
import EssentialSkillBlock from '@/components/EssentialSkillBlock.vue';

defineProps({
  options: {
    type: Object,
    default: () => ({})
  }
});
</script>
<template>
  <div class="skills">
    <TitleBlock
      v-if="options.title"
      :symbol="options.symbol"
      :title="options.title"
      :darken="true"
    />
    <EssentialSkillBlock :options="options.essential_skill" />
    <template v-if="options.sections.length">
      <div
        v-for="section in options.sections"
        :key="section.title"
        class="skills__section"
      >
        <div v-if="section.title" class="skills__section-title">
          {{ section.title }}:
        </div>
        <SkillBlock
          v-for="it in section.items"
          :key="it.id"
          :options="{ ...it }"
        />
      </div>
    </template>
  </div>
</template>
<style lang="scss" scoped>
.skills {
  &__section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    margin-bottom: 8px;
  }
  &__section-title {
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    line-height: 1;
    color: rgb(var(--v-theme-accented-text));
  }
}
</style>
