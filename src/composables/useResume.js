import { computed } from 'vue';
import { getAssetUrl } from '@/utils/assets';
import ukData from '@/data/resume-ua.json'; // Путь к вашим JSON
import enData from '@/data/resume-en.json';

export function useResume(lang = 'uk') {
  const rawData = lang === 'uk' ? ukData : enData;

  const processedData = computed(() => {
    const data = structuredClone(rawData);

    // 1. Avatars
    data.avatar_light = getAssetUrl(data.avatar_light);
    data.avatar_dark = getAssetUrl(data.avatar_dark);

    // 2. Contacts
    data.contacts.forEach((c) => {
      c.icon = getAssetUrl(c.icon);
    });

    // 3. Projects
    data.projects.description.forEach((p) => {
      p.icon = getAssetUrl(p.icon);
    });

    // 4. Experience
    data.experience.description.forEach((e) => {
      if (e.company_icon) {
        e.company_icon = getAssetUrl(e.company_icon);
      }
    });

    // 5. Skills
    data.skills.sections.forEach((sec) => {
      sec.items.forEach((it) => {
        it.img = getAssetUrl(it.img);
      });
    });
    const mainSkillImg = data.skills.essential_skill.img;
    data.skills.essential_skill.img = getAssetUrl(mainSkillImg);

    return data;
  });

  return { resume: processedData };
}
