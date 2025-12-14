export interface ChartData {
  name: string;
  value: number;
}

export interface AnalysisResult {
  score: number;
  summary: string;
  roadmap: string[];
  breakdown: ChartData[];
  techStack: string[];
  repositoryName: string;
}

export enum ViewState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}