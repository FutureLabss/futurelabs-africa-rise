import { blogPosts, type BlogPost } from '@/data/blogPosts';

export type { BlogPost };

/** Posts in editorial order (the order of the data file). */
export const posts = blogPosts;

export const getPost = (id: string) => blogPosts.find((p) => p.id === id);

export function readTime(post: BlogPost) {
  const words = post.content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

/**
 * Where a post lives. Research briefings and case studies share the data file with the
 * blog but have their own sections; their old /blog/<id> URLs redirect (next.config.js).
 */
export type Section = 'blog' | 'research' | 'case-studies';
export const sectionOf = (post: BlogPost): Section =>
  post.category === 'Research' ? 'research' : post.category === 'Case study' ? 'case-studies' : 'blog';
export const postPath = (post: BlogPost) => `/${sectionOf(post)}/${post.id}`;
export const postsIn = (section: Section) => blogPosts.filter((p) => sectionOf(p) === section);
export const getPostIn = (section: Section, id: string) => postsIn(section).find((p) => p.id === id);

/** Blog-only categories in first-appearance order, for the blog filter. */
export const categories = Array.from(new Set(postsIn('blog').map((p) => p.category)));

export const postCta = (post: BlogPost) => post.cta ?? { label: 'Get in touch', href: '/contact' };
