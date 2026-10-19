export type ProjectCategory = 
  | 'unreal-games'
  | 'maze-robotics'
  | 'robotics-hardware'
  | 'digital-twins';

export interface ProjectChallenge {
  challenge: string;
  solution: string;
}

export interface ProjectTechnicalSpec {
  label: string;
  value: string;
}

export interface ProjectCaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  featured: boolean;
  status: 'Production / Deployed' | 'Operational Hardware' | 'Verified Simulation' | 'Active R&D';
  completionDate: string;
  summary: string;
  
  // Case Study In-Depth Sections
  problemObjective: string;
  roleResponsibilities: string[];
  techStack: string[];
  architectureApproach: string[];
  challengesAndSolutions: ProjectChallenge[];
  technicalSpecs: ProjectTechnicalSpec[];
  verifiedResults: string[];
  
  // Visuals and Links
  heroImage: string;
  schematicType?: 'state-machine' | 'hardware-topology' | 'simulation-loop' | 'kinematic-chain';
  diagramCaption?: string;
  demoVideoUrl?: string;
  githubUrl?: string;
  docsUrl?: string;
  liveDemoUrl?: string;
}

export interface CategoryInfo {
  id: ProjectCategory;
  label: string;
  shortLabel: string;
  description: string;
  iconName: string;
  specHighlight: string;
  count?: number;
}
