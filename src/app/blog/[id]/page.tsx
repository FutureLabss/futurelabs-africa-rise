import { notFound } from 'next/navigation';
import ArticlePage, { articleMetadata } from '@/components/site/ArticlePage';
import { getPostIn, postsIn } from '@/lib/blog';

type Params = { params: { id: string } };

export function generateStaticParams() {
  return postsIn('blog').map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: Params) {
  return articleMetadata(getPostIn('blog', params.id));
}

export default function Page({ params }: Params) {
  const post = getPostIn('blog', params.id);
  if (!post) notFound();
  return <ArticlePage post={post} />;
}
