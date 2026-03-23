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
  <div class="experience">
    <TitleBlock
      v-if="options.title"
      :symbol="options.symbol"
      :title="options.title"
      :darken="false"
    />
    <template v-if="options.description.length">
      <div
        v-for="entry in options.description"
        :key="entry.id"
        class="experience__entry"
      >
        <div
          v-if="entry"
          class="experience__wrapper outer"
          :class="{ block: entry.id === 'nch' }"
        >
          <div
            v-if="entry.position"
            class="experience__position"
            :class="{ reduced: entry.id === 'nch' }"
          >
            {{ entry.position }}
          </div>
          <div class="experience__wrapper">
            <v-btn
              class="experience__button"
              variant="text"
              slim
              density="compact"
              :href="entry.link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <v-img
                v-if="entry.company_icon"
                class="experience__logo"
                :src="entry.company_icon"
                :width="entry.company_icon_size"
                alt="Company logo"
              />
              {{ entry.company }}
            </v-btn>
            <div v-if="entry.period" class="experience__period">
              {{ entry.period }}
            </div>
          </div>
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
.experience {
  width: 100%;
  &__position {
    font-size: 1rem;
    font-weight: 600;
    &.reduced {
      font-size: 0.85rem;
    }
  }
  &__wrapper {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    &.outer {
      padding-left: 24px;
    }
    &.block {
      display: block;
    }
  }
  &__button {
    font-size: 0.85rem;
  }
  &__logo {
    margin-right: 4px;
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
