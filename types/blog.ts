// Common query interfaces
interface BlogQuery {
  published: boolean;
  featured?: boolean;
  _id?: any; 
}

interface BlogQueryOptions {
  limit?: number;
  excludeId?: string;
  featured?: boolean;
}

// PDF related interfaces
interface BlogPdf {
  title: string;
  url: string;
  downloadCount?: number;
}

// Blog post interface
export interface BlogPost {
  _id?: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  tags: string[];
  date: Date;
  read_time: string;
  published: boolean;
  featured: boolean;
  views: number;
  likes: number;
  pdfs?: BlogPdf[]; // Add PDFs array
  createdAt?: Date;
  updatedAt?: Date;
}

export type { BlogQuery, BlogQueryOptions, BlogPdf };
