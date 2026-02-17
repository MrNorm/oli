import type { PageContextServer } from 'vike/types';
import { fetchMegabytes, fetchBytes, fetchDailyPhotos } from '@/lib/cms-helpers';
import type { GetMegabytesQuery, GetBytesQuery, GetDailyPhotosQuery } from '@/lib/generated/graphql';

export type MegabyteDoc = NonNullable<GetMegabytesQuery['Megabytes']>['docs'][number];
export type ByteDoc = NonNullable<GetBytesQuery['Bytes']>['docs'][number];
export type DailyPhotoDoc = NonNullable<GetDailyPhotosQuery['DailyPhotos']>['docs'][number];

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContextServer) {
  const urlSearchParams = pageContext.urlParsed?.search;
  const yearParam = urlSearchParams?.year;
  const selectedYear = yearParam ? parseInt(yearParam as string, 10) : null;

  try {
    const [megabytes, bytes, dailyPhotos] = await Promise.all([
      fetchMegabytes(1000, 1),
      fetchBytes(1000, 1),
      fetchDailyPhotos(1000, 1),
    ]);

    const filterByYear = <T extends { date: unknown }>(items: T[], dateField: keyof T = 'date' as keyof T) => {
      if (!selectedYear) return items;
      return items.filter(item => {
        const itemYear = new Date(item[dateField] as string).getFullYear();
        return itemYear === selectedYear;
      });
    };

    return {
      megabytes: filterByYear(megabytes.docs || []),
      bytes: filterByYear(bytes.docs || []),
      dailyPhotos: filterByYear(dailyPhotos.docs || []),
      selectedYear,
    };
  } catch (error) {
    console.error('Error fetching activity data:', error);
    // Return empty data on error
    return {
      megabytes: [],
      bytes: [],
      dailyPhotos: [],
      selectedYear,
    };
  }
}
