import { notFound } from 'next/navigation';
import ArticlePage, { articleMetadata } from '@/components/site/ArticlePage';
import { getPostIn, postsIn } from '@/lib/blog';

type Params = { params: { id: string } };

export function generateStaticParams() {
  return postsIn('case-studies').map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: Params) {
  return articleMetadata(getPostIn('case-studies', params.id));
}

export default function Page({ params }: Params) {
  const post = getPostIn('case-studies', params.id);
  if (!post) notFound();
  return <ArticlePage post={post} />;
}
