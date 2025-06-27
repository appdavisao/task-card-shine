
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
    saude?: string;
    financas?: string;
    marketing?: string;
    relacionamentos?: string;
  };
  platforms?: string[];
  intentions?: string[];
  main_content?: string;
  observations?: string;
  practical_steps?: string[];
}

export interface DailyContent {
  id: string;
  day: number;
  content_type: string;
  title: string;
  content_card?: ContentCard;
}
