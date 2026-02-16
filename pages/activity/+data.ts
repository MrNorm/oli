import type { PageContextServer } from 'vike/types';
import { fetchMegabytes, fetchBytes, fetchDailyPhotos } from '@/lib/cms-helpers';

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContextServer) {
  // Get year from URL search params (e.g., /activity?year=2024)
  const urlSearchParams = pageContext.urlParsed?.search;
  const yearParam = urlSearchParams?.year;
  const selectedYear = yearParam ? parseInt(yearParam as string, 10) : null;

  try {
    // Fetch all activity for the selected year or all years
    const [megabytes, bytes, dailyPhotos] = await Promise.all([
      fetchMegabytes(1000, 1),
      fetchBytes(1000, 1),
      fetchDailyPhotos(1000, 1),
    ]);

    // Filter by year if specified
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filterByYear = (items: any[], dateField: string = 'date') => {
      if (!selectedYear) return items;
      return items.filter(item => {
        const itemYear = new Date(item[dateField]).getFullYear();
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
