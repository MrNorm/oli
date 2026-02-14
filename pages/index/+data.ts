import { fetchHomepageData } from '@/lib/cms-helpers';

export async function data() {
  const homepage = await fetchHomepageData();
  
  return {
    homepage,
  };
}

export type Data = Awaited<ReturnType<typeof data>>;
