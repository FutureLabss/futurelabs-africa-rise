import { blogPosts, type BlogPost } from '@/data/blogPosts';

export type { BlogPost };

/** Posts in editorial order (the order of the data file). */
export const posts = blogPosts;

export const getPost = (id: string) => blogPosts.find((p) => p.id === id);

export function readTime(post: BlogPost) {
  const words = post.content.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}

/** Categories in first-appearance order, for the blog filter. */
export const categories = Array.from(new Set(blogPosts.map((p) => p.category)));

export const postCta = (post: BlogPost) => post.cta ?? { label: 'Get in touch', href: '/contact' };
