import { computed } from 'vue';
import { getAssetUrl } from '@/utils/assets';
import ukData from '@/data/resume-ua.json';
import enData from '@/data/resume-en.json';
import contacts from '@/data/contacts.json';
import skills from '@/data/skills.json';

// Get Contacts data
export function useHeader() {
  const processedData = computed(() => {
    const data = structuredClone(contacts);
    data.avatar.avatar_light = getAssetUrl(data.avatar.avatar_light);
    data.avatar.avatar_dark = getAssetUrl(data.avatar.avatar_dark);

    data.backgrounds.forEach((b) => {
      if (b.img) {
        b.img = getAssetUrl(b.img);
      }
    });

    data.contacts.forEach((c) => {
      if (c.icon) {
        c.icon = getAssetUrl(c.icon);
      }
    });

    data.activator.img = getAssetUrl(data.activator.img);

    return data;
  });

  return { header: processedData };
}

// Get Projects and Experience Sections data
export function useSections(lang = 'ua') {
  const rawData = lang === 'en' ? enData : ukData;

  const processedData = computed(() => {
    const data = structuredClone(rawData);

    // 3. Projects
    data.projects.description.forEach((p) => {
      if (p.icon) {
        p.icon = getAssetUrl(p.icon);
      }
    });

    // 4. Experience
    data.experience.description.forEach((e) => {
      if (e.company_icon) {
        e.company_icon = getAssetUrl(e.company_icon);
      }
    });

    return data;
  });

  return { sectionsDynamic: processedData };
}

// Get Skills Section data
export function useSkills() {
  const processedData = computed(() => {
    const data = structuredClone(skills);
    data.skills.sections.forEach((sec) => {
      sec.items.forEach((s) => {
        if (s.img) {
          s.img = getAssetUrl(s.img);
        }
      });
    });
    const mainSkillImg = data.skills.essential_skill.img;
    if (mainSkillImg) {
      data.skills.essential_skill.img = getAssetUrl(mainSkillImg);
    }

    return data;
  });

  return { sectionsStatic: processedData };
}
