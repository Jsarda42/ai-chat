export type CardProps = {
  title: string;
  img: string;
  description: string;
  url?: string;
  tags?: string[];
  slug?: string;
  onClick?: () => void;
};

export type CardGridProps = {
  projects: CardProps[];
  limit?: number;
};