import { apolloClient } from './apollo-client';
import {
  GET_HOMEPAGE_DATA,
  GET_MEGABYTES,
  GET_MEGABYTE,
  GET_BYTES,
  GET_BYTE,
  GET_DAILY_PHOTOS,
  GET_DAILY_PHOTO,
  GET_ABOUT_ME,
} from './queries';
import type {
  GetHomepageDataQuery,
  GetMegabytesQuery,
  GetMegabyteQuery,
  GetBytesQuery,
  GetByteQuery,
  GetDailyPhotosQuery,
  GetDailyPhotoQuery,
  GetAboutMeQuery,
} from './generated/graphql';

export async function fetchHomepageData() {
  try {
    const { data } = await apolloClient.query<GetHomepageDataQuery>({
      query: GET_HOMEPAGE_DATA,
    });
    return data ?? null;
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return null;
  }
}

export async function fetchMegabytes(limit = 10, page = 1) {
  try {
    const { data } = await apolloClient.query<GetMegabytesQuery>({
      query: GET_MEGABYTES,
      variables: { limit, page },
    });
    return data?.Megabytes ?? { docs: [], hasNextPage: false, hasPrevPage: false, totalPages: 0, totalDocs: 0 };
  } catch (error) {
    console.error('Error fetching megabytes:', error);
    return { docs: [], hasNextPage: false, hasPrevPage: false, totalPages: 0, totalDocs: 0 };
  }
}

export async function fetchMegabyteBySlug(slug: string) {
  try {
    const { data } = await apolloClient.query<GetMegabyteQuery>({
      query: GET_MEGABYTE,
      variables: { slug },
    });
    return data?.Megabytes?.docs?.[0] ?? null;
  } catch (error) {
    console.error('Error fetching megabyte:', error);
    return null;
  }
}

export async function fetchBytes(limit = 10, page = 1) {
  try {
    const { data } = await apolloClient.query<GetBytesQuery>({
      query: GET_BYTES,
      variables: { limit, page },
    });
    return data?.Bytes ?? { docs: [], hasNextPage: false, hasPrevPage: false, totalPages: 0, totalDocs: 0 };
  } catch (error) {
    console.error('Error fetching bytes:', error);
    return { docs: [], hasNextPage: false, hasPrevPage: false, totalPages: 0, totalDocs: 0 };
  }
}

export async function fetchByteById(id: number) {
  try {
    const { data } = await apolloClient.query<GetByteQuery>({
      query: GET_BYTE,
      variables: { id },
    });
    return data?.Byte ?? null;
  } catch (error) {
    console.error('Error fetching byte:', error);
    return null;
  }
}

export async function fetchDailyPhotos(limit = 10, page = 1) {
  try {
    const { data } = await apolloClient.query<GetDailyPhotosQuery>({
      query: GET_DAILY_PHOTOS,
      variables: { limit, page },
    });
    return data?.DailyPhotos ?? { docs: [], hasNextPage: false, hasPrevPage: false, totalPages: 0, totalDocs: 0 };
  } catch (error) {
    console.error('Error fetching daily photos:', error);
    return { docs: [], hasNextPage: false, hasPrevPage: false, totalPages: 0, totalDocs: 0 };
  }
}

export async function fetchDailyPhotoById(id: number) {
  try {
    const { data } = await apolloClient.query<GetDailyPhotoQuery>({
      query: GET_DAILY_PHOTO,
      variables: { id },
    });
    return data?.DailyPhoto ?? null;
  } catch (error) {
    console.error('Error fetching daily photo:', error);
    return null;
  }
}

export async function fetchAboutMe() {
  try {
    const { data } = await apolloClient.query<GetAboutMeQuery>({
      query: GET_ABOUT_ME,
    });
    return data?.AboutMe ?? null;
  } catch (error) {
    console.error('Error fetching about me:', error);
    return null;
  }
}
