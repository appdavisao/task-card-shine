
export interface Task {
  id: string;
  day: number;
  title: string;
  description?: string;
  time?: string;
  difficulty?: string;
  platform?: string;
  type?: string;
  completed: boolean;
}

export interface ContentCard {
  title: string;
  format: string;
  cta_text?: string;
  examples?: {
    [key: string]: {
      tipo_1: string;
      tipo_2: string;
      tipo_3: string;
    };
  };
  platforms?: string[];
  intentions?: string[];
  main_content?: string;
  observations?: string;
  practical_steps?: string[];
  how_to_structure?: {
    step_1: string;
    step_2: string;
    step_3: string;
  };
  video_structure?: {
    hook: string;
    apresentacao?: string;
    desafio?: string;
    revelacao?: string;
    educacao?: string;
    tipo_1?: string;
    tipo_2?: string;
    tipo_3?: string;
    cta?: string;
  };
  viral_tips?: string[];
  engagement_benefits?: string[];
  psychological_triggers?: string[];
  viral_potential?: string;
  reference_link?: string;
  roteiro_number?: number;
  strategic_analysis?: string;
}

export interface DailyContent {
  id: string;
  day: number;
  content_type: string;
  title: string;
  content_card?: ContentCard;
}
