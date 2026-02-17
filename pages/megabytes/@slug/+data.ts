import type { PageContext } from 'vike/types';
import { fetchMegabyteBySlug } from '@/lib/cms-helpers';

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContext) {
  const slug = pageContext.routeParams.slug;
  
  const megabyte = await fetchMegabyteBySlug(slug);

  return {
    megabyte,
  };
}
