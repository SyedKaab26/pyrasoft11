export interface ServiceItem {
  id: string;
  title: string;
  tech: string;
  category: 'web' | 'marketing' | 'content' | 'growth';
  icon: string;
  description: string;
  features: string[];
  deliverables: string[];
  metrics: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  colSpanDesktop: string;
  stats: { label: string; value: string }[];
  stack: string[];
  architectureOverview: string;
}

export interface PipelineStage {
  id: string;
  name: string;
  subtext: string;
  status: 'idle' | 'running' | 'success' | 'warning';
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  projectName?: string;
  projectId?: string;
  quote: string;
  avatarUrl: string;
  rating: number;
  tags: string[];
}

export interface ProtocolBrief {
  fullName: string;
  corporateEmail: string;
  projectScope: string;
  budgetTier?: string;
  timeline?: string;
  technicalRequirements: string;
}
