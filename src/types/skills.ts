export interface SkillItem {
  name: string;
  focus: string;
  highlight?: boolean;
}

export interface SkillDiscipline {
  id: string;
  discipline: string;
  shortCode: string;
  description: string;
  skills: SkillItem[];
  concreteTools: string[];
}
