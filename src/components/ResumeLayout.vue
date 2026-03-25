<script setup>
import { computed, onMounted, ref } from 'vue';
import { mdiAccountTie } from '@mdi/js';

import { useDisplay } from 'vuetify';
const { smAndDown, xs } = useDisplay();

import { useMainStore } from '@/stores/main.store.js';
const store = useMainStore();

import PagePreloader from '@/components/PagePreloader.vue';
import SwitchersBlock from '@/components/SwitchersBlock.vue';
import SliderSwiper from '@/components/SliderSwiper.vue';

// Resume Sections
import SectionSummary from '@/components/SectionSummary.vue';
import SectionExperience from '@/components/SectionExperience.vue';
import SectionProjects from '@/components/SectionProjects.vue';
import SectionSkills from '@/components/SectionSkills.vue';
import SectionEducation from '@/components/SectionEducation.vue';
import SectionLanguages from '@/components/SectionLanguages.vue';

const isLoading = computed(() => store.isLoading);

const staticSection = computed(() => store.resumeData?.sectionsStatic || {});
const dynamicSection = computed(() => store.resumeData?.sectionsDynamic || {});
const header = computed(() => store.resumeData?.header || {});
const bgImages = computed(
  () => header.value?.backgrounds?.map((b) => b.img) || []
);

const activeSlide = ref(0);
const isCurrentSlideDark = computed(() => {
  const currentBg = header.value?.backgrounds?.[activeSlide.value];
  return currentBg?.dark || false;
});
const drawer = ref(true);

onMounted(() => {
  store.loadResumeData();
});
</script>

<template>
  <div class="my-resume">
    <PagePreloader v-if="isLoading" />

    <header v-if="Object.keys(header).length" class="my-resume__header">
      <div ref="resumeHeader" class="user__wrapper">
        <div
          class="user__adaptive-row"
          :class="{ 'light-text': isCurrentSlideDark }"
        >
          <div class="user__titles">
            <template v-if="bgImages.length">
              <SliderSwiper
                class="user__swiper"
                :options="{
                  arr: bgImages,
                  isDark: isCurrentSlideDark
                }"
                @change-slide="($event) => (activeSlide = $event)"
              />
            </template>
            <SwitchersBlock class="user__switcher" />
            <div
              v-if="dynamicSection.person?.name"
              class="user__description person"
            >
              <div class="person__name">
                {{ dynamicSection.person.name }}
              </div>
              <div class="person__title">
                {{ dynamicSection.person.vacancy }}
              </div>
              <div class="person__location">
                {{ dynamicSection.person.location }}
              </div>
            </div>
          </div>
          <div class="user__photo-wrapper">
            <v-img
              v-if="store.avatar"
              :src="store.avatar"
              class="user__photo"
              height="150"
              width="150"
              alt="candidate photo"
            />
            <v-icon v-else size="150" color="#969595" :icon="mdiAccountTie" />
          </div>
        </div>
        <div v-if="header?.contacts?.length" class="user__meta-data">
          <v-btn
            v-for="contact in header.contacts"
            :key="contact.item"
            :href="contact.link"
            target="_blank"
            rel="noopener"
            tag="a"
            variant="text"
            size="small"
            aria-label="open user contact button"
            class="user__button meta-item"
          >
            <v-img
              :src="contact.icon"
              :height="contact.size"
              :width="contact.size"
              alt="contacts icon"
            />
            <span class="user__button-txt">{{ contact.item }}</span>
          </v-btn>
          <v-tooltip
            :text="drawer ? 'Close skills' : 'Open skills'"
            location="top"
            max-height="24"
          >
            <!-- 🚨 Activate sidebar button 🚨 -->
            <template #activator="{ props }">
              <v-btn
                v-if="smAndDown"
                v-bind="props"
                class="sidebar-activator"
                icon
                :size="xs ? 'large' : 'x-small'"
                :class="{ small: xs }"
                aria-label="activate sidebar animated button"
                @click="drawer = !drawer"
              >
                <v-img
                  :width="xs ? 48 : 32"
                  class="sidebar-activator__icon"
                  :class="{ open: drawer }"
                  :src="header?.activator?.img"
                  alt="activate sidebar button icon"
                />
              </v-btn>
            </template>
          </v-tooltip>
        </div>
        <div class="user__gradient"></div>
      </div>
      <v-btn
        v-if="!drawer"
        class="my-resume__button open-sidebar-btn small"
        variant="flat"
        color="#77A608"
        size="x-small"
        position="sticky"
        aria-label="open skills right side button"
        @click="drawer = !drawer"
        ><span class="open-sidebar-btn__text">SKILLS</span>
      </v-btn>
    </header>
    <v-container class="my-resume__container">
      <!-- MAIN -->
      <v-main v-if="Object.keys(dynamicSection).length" class="my-resume__main">
        <v-container class="my-resume__main-wrapper">
          <SectionSummary
            v-if="dynamicSection.summary"
            :options="dynamicSection.summary"
          />
          <SectionProjects
            v-if="dynamicSection.projects"
            :options="dynamicSection.projects"
          />
          <SectionExperience
            v-if="dynamicSection.experience"
            :options="dynamicSection.experience"
          />
        </v-container>
      </v-main>
      <!-- SIDEBAR -->
      <v-navigation-drawer
        v-if="
          Object.keys(staticSection).length &&
          Object.keys(dynamicSection).length
        "
        v-model="drawer"
        class="my-resume__sidebar"
        location="right"
        :permanent="!smAndDown"
        :mobile="smAndDown"
        color="grey-lighten-4"
        absolute
        width="224"
      >
        <SectionSkills
          v-if="staticSection.skills"
          :options="staticSection.skills"
        />
        <SectionEducation
          v-if="dynamicSection.education"
          :options="dynamicSection.education"
        />
        <SectionLanguages
          v-if="dynamicSection.languages"
          :options="dynamicSection.languages"
        />
      </v-navigation-drawer>
    </v-container>
  </div>
</template>
<style lang="scss" scoped>
@use 'vuetify/settings' as *;
@use 'sass:color';
.my-resume {
  width: 100%;
  max-width: 794px;
  min-width: 320px;
  height: fit-content;
  min-height: 1123px;
  position: relative;
  margin: 24px auto;
  overflow: hidden;
  background-color: rgba(var(--v-theme-background-page));
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.15);
  @include media-down(sm-down) {
    margin: 0 auto;
    box-shadow: none;
    min-height: 100vh;
  }
  &__header {
    overflow: visible !important;
  }
  &__container {
    position: relative;
    padding: 0 !important;
  }
  &__sidebar {
    border-radius: 24px 0 0 0;
    margin-top: 8px;
    height: calc(100% - 8px) !important;
    @include media-down(xs) {
      height: fit-content !important;
    }
  }
  &__main-wrapper {
    min-height: 940px;
    position: relative;
    padding: 16px;
  }
  .open-sidebar-btn {
    position: fixed;
    left: auto;
    right: -34px;
    top: 50vh;
    transform: rotate(-90deg);
    transform-origin: center;
    border-radius: 6px 6px 0 0;
    padding: 0 2px 0 8px;
    z-index: 10;
    display: none;
    @include media-down(xs) {
      display: inline-block;
    }
    &__text {
      line-height: 1;
      letter-spacing: 0.5rem;
    }
  }
}
.user {
  &__wrapper {
    width: 100%;
  }
  &__adaptive-row {
    min-height: 160px;
    position: relative;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas: 'titles photo';
    transition: all 0.3s ease-in;
    background-color: rgb(var(--v-theme-background-header));
    &.light-text {
      background-color: rgb(var(--v-theme-background-meta));
    }
    &.light-text * {
      color: $light;
    }
    @include media-down(xxs) {
      grid-template-columns: 1fr;
      grid-template-areas:
        'photo'
        'titles';
      justify-items: center;
      padding: 40px 12px 0;
    }
  }
  &__titles {
    grid-area: titles;
    position: relative;
    padding: 24px 32px;
    text-align: center;
    @include media-down(xxs) {
      position: static;
    }
  }
  &__swiper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    height: -webkit-fill-available;
    z-index: 1;
  }
  &__description {
    position: relative;
    pointer-events: none;
    z-index: 10;
    transform: translateZ(0);
    text-align: left;
    @include media-down(xxs) {
      text-align: center;
    }
    .person {
      &__name,
      &__title,
      &__location {
        width: fit-content;
        pointer-events: auto;
        @include media-down(xxs) {
          margin: 0 auto;
        }
      }
      &__name {
        font-size: 2rem;
        letter-spacing: 2.7px;
        margin-bottom: 8px;
      }
      &__title {
        font-size: 1.4rem;
      }
    }
  }

  &__photo-wrapper {
    align-content: end;
  }
  &__photo {
    grid-area: photo;
    border-radius: 16px 0 0 0 !important;
    margin-top: auto;
    position: relative;
    pointer-events: none;
    z-index: 1;
    @include media-down(xs) {
      margin-inline: auto;
    }
  }
  &__switcher {
    position: absolute;
    top: 4px;
    right: 8px;
    z-index: 10;
    &.light-text * {
      color: $light;
    }
  }
  &__meta-data {
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    background-color: rgb(var(--v-theme-background-meta));
    @include media-down(sm-down) {
      padding-right: 80px;
    }
    @include media-down(xs) {
      flex-direction: column;
      row-gap: 8px;
      padding: 12px 80px;
    }
    @media screen and (max-width: 380px) {
      padding: 12px 12px 56px 12px;
    }
  }
  &__button.meta-item {
    flex: 1 0 auto;
    border-radius: 0 !important;
    padding: 0 8px !important;
    @include media-down(xs) {
      width: 100%;
      max-width: 200px;
      flex-shrink: 1;
    }
  }
  &__button.meta-item:hover::before {
    content: '';
    position: absolute;
    top: -1px;
    height: 1px;
    width: 100%;
    background-color: $green-md;
  }
  &__button-txt {
    font-size: 0.75rem;
    font-weight: 500;
    max-width: 150px;
    color: $white;
    line-height: 1;
    @include Txt-ellipsis;
  }
  &__gradient {
    position: relative;
    grid-area: gradient;
    width: 100%;
    height: 50px;
    background: linear-gradient(
      90deg,
      rgb(var(--v-theme-background-gradient-start)) 0%,
      rgb(var(--v-theme-background-gradient-middle)) 50%,
      rgb(var(--v-theme-background-gradient-end)) 100%
    );
  }
  &__gradient::before {
    content: '';
    position: absolute;
    top: 0;
    right: 28%;
    width: 100px;
    height: 50px;
    background: radial-gradient(
      circle at 50% 0,
      rgba(var(--v-theme-background-header), 0.5) calc(25px - 1px),
      transparent 25px
    );
    pointer-events: none;
    @include media-down(sm-down) {
      display: none;
    }
  }
}
.sidebar-activator {
  flex-shrink: 0;
  position: absolute;
  margin: 0 8px;
  right: 16px;
  z-index: 2;
  transition: all 0.3s ease-in;
  background: transparent;
  @include media-down(xs) {
    top: unset !important;
    bottom: 1rem;
    margin: 0;
  }
  // 🥎 Animated dot
  &::before {
    content: '•';
    position: absolute;
    top: 8px;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
    color: $green-md;
    z-index: 100;
    animation: circular-move 8s linear infinite;
    @include media-down(xs) {
      top: 19px;
    }
  }
  &__icon {
    transition: transform 0.3s linear;
    border-radius: 50%;
    outline: 6px solid rgb(var(--v-theme-background-skills-button));
    &.open {
      transform: rotate(-180deg);
    }
  }
  @keyframes circular-move {
    0% {
      transform: rotate(0deg) translateX(32px) rotate(0deg);
    }
    100% {
      transform: rotate(360deg) translateX(32px) rotate(-360deg);
    }
  }
}
</style>

<style lang="scss">
.my-resume {
  .v-toolbar {
    &__content {
      overflow: visible;
    }
  }
  .v-navigation-drawer {
    &__content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 12px;
      border-radius: inherit;
      @include Scrollbar;
    }
  }
}
.user {
  &__meta-data {
    .v-btn {
      --v-hover-opacity: 0.85;
      &__overlay {
        background: rgba(#000, 0.15) !important;
      }
      &__content {
        gap: 8px;
      }
    }
  }
}
.v-overlay-container {
  .v-overlay {
    &__content {
      max-height: fit-content !important;
      padding: 2px 8px !important;
      outline: 1px solid $green-md;
      font-size: 0.8rem !important;
    }
  }
}
</style>
