import type { PageContext } from 'vike/types';
import { fetchMegabyteBySlug } from '@/lib/cms-helpers';

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContext) {
  const slug = pageContext.routeParams.slug;
  
  if (!slug) {
    throw new Error('Invalid megabyte slug');
  }

  const megabyte = await fetchMegabyteBySlug(slug);

  if (!megabyte) {
    throw new Error(`Megabyte not found: ${slug}`);
  }

  return {
    megabyte,
  };
}
