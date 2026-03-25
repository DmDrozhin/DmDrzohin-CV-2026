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
          <div
            class="experience__wrapper"
            :class="{ 'xs-wrap': entry.id === 'nch' }"
          >
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
                class="experience__button-icon"
                :src="entry.company_icon"
                :width="entry.company_icon_size"
                alt="Company logo"
              />
              <span class="experience__button-txt">{{ entry.company }}</span>
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
  &__entry {
    margin-top: 2px;
  }
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
    gap: 2px 8px;
    &.outer {
      padding-left: 24px;
      @include media-down(xs) {
        flex-wrap: wrap;
      }
    }
    &.block {
      display: block;
    }
    &.xs-wrap {
      flex-wrap: wrap;
    }
  }
  &__button {
    height: auto;
    font-size: 0.85rem;
  }
  &__button-icon {
    margin-right: 4px;
  }
  &__button-txt {
    text-wrap: balance;
  }
  &__company {
    color: rgb(var(--v-theme-background-divider));
  }
  &__period {
    white-space: nowrap;
    color: rgb(var(--v-theme-accented-text));
    font-size: 0.85rem;
  }
}
</style>
