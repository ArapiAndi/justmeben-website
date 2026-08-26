export type ArticleStatus = 'draft' | 'scheduled' | 'published';

export interface InternalLinkSuggestion {
  anchorText: string;
  suggestedPage: string;
  context: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  readingTime: string;
  status: ArticleStatus;
  scheduledDate?: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeywords: string[];
  secondaryKeywords: string[];
  keyTakeaways?: string[];
  internalLinkSuggestions?: InternalLinkSuggestion[];
  viewsCount: number;
  featured?: boolean;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  articleCount: number;
}

export interface PortfolioItem {
  id: string;
  name: string;
  logoText: string;
  tagline: string;
  description: string;
  sector: string;
  investmentType: string;
  year: string;
  hq: string;
  revenueRange: string;
  employees: string;
  image: string;
  metrics: {
    label: string;
    value: string;
  }[];
  themeColor: string;
}

export interface InvestmentCriterion {
  id: string;
  title: string;
  category: string;
  value: string;
  description: string;
  iconName: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  focus: string;
  bio: string;
  image: string;
  linkedin: string;
}
