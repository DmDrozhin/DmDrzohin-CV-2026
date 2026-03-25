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
  <div class="projects">
    <TitleBlock
      v-if="options.title"
      :symbol="options.symbol"
      :title="options.title"
      :darken="false"
    />
    <template v-if="options.description.length">
      <div
        v-for="(entry, id) in options.description"
        :key="id"
        class="projects__entry"
      >
        <div v-if="entry" class="projects__wrapper">
          <v-btn
            class="projects__button"
            variant="text"
            slim
            density="compact"
            :href="entry.link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <v-img
              v-if="entry.icon"
              class="projects__logo"
              :src="entry.icon"
              :width="entry.icon_size"
              alt="Company logo"
            />
            <span class="projects__button-txt">
              {{ entry.title }}
            </span>
          </v-btn>
        </div>
        <ul v-if="entry.achievements.length">
          <li v-for="(it, idx) in entry.achievements" :key="idx">
            {{ it }}
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.projects {
  width: 100%;
  &__entry {
    margin-top: 2px;
  }
  &__wrapper {
    gap: 8px;
    padding-left: 14px;
  }
  &__button {
    height: auto;
    min-width: 0 !important;
    max-width: fit-content;
    font-size: 1rem;
    font-weight: 600;
  }
  &__button-txt {
    text-wrap: balance;
    flex-shrink: 1;
  }
  &__logo {
    margin-right: 8px;
  }
  &__company {
    color: rgb(var(--v-theme-background-divider));
  }
  &__period {
    color: rgb(var(--v-theme-accented-text));
    font-size: 0.85rem;
  }
}
</style>
