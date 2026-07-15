export enum FunnelStage {
  ARRIVEE = 1,
  FILM = 2,
  DECLIC = 3,
  EXPERIENCE_IA = 4,
  DECOUVERTE = 5,
  PROJECTION = 6,
  ACTION = 7,
}

export interface Stage1Content {
  headline: string;
  subline: string;
}

export interface FooterLink {
  label: string;
  href: string;
}
