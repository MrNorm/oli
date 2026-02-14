/**
 * Helper functions for fetching CMS data
 * 
 * NOTE: Run `pnpm codegen` first to generate types and resolve type errors.
 * After codegen runs, you can import generated types like:
 * import { GetHomepageDataQuery } from './generated/graphql';
 */

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

/**
 * Fetch all data needed for the homepage in one query
 */
export async function fetchHomepageData() {
  try {
    const { data } = await apolloClient.query({
      query: GET_HOMEPAGE_DATA,
    });
    // @ts-expect-error - Types will be available after running `pnpm codegen`
    return data;
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return null;
  }
}

/**
 * Fetch Megabytes (long-form articles)
 */
export async function fetchMegabytes(limit = 10, page = 1) {
  try {
    const { data } = await apolloClient.query({
      query: GET_MEGABYTES,
      variables: { limit, page },
    });
    // @ts-expect-error - Types will be available after running `pnpm codegen`
    return data.Megabytes;
  } catch (error) {
    console.error('Error fetching megabytes:', error);
    return { docs: [], hasNextPage: false, hasPrevPage: false, totalPages: 0, totalDocs: 0 };
  }
}

/**
 * Fetch a single Megabyte by ID
 */
export async function fetchMegabyteById(id: number) {
  try {
    const { data } = await apolloClient.query({
      query: GET_MEGABYTE,
      variables: { id },
    });
    // @ts-expect-error - Types will be available after running `pnpm codegen`
    return data.Megabyte;
  } catch (error) {
    console.error('Error fetching megabyte:', error);
    return null;
  }
}

/**
 * Fetch Bytes (short posts/musings)
 */
export async function fetchBytes(limit = 10, page = 1) {
  try {
    const { data } = await apolloClient.query({
      query: GET_BYTES,
      variables: { limit, page },
    });
    // @ts-expect-error - Types will be available after running `pnpm codegen`
    return data.Bytes;
  } catch (error) {
    console.error('Error fetching bytes:', error);
    return { docs: [], hasNextPage: false, hasPrevPage: false, totalPages: 0, totalDocs: 0 };
  }
}

/**
 * Fetch a single Byte by ID
 */
export async function fetchByteById(id: number) {
  try {
    const { data } = await apolloClient.query({
      query: GET_BYTE,
      variables: { id },
    });
    // @ts-expect-error - Types will be available after running `pnpm codegen`
    return data.Byte;
  } catch (error) {
    console.error('Error fetching byte:', error);
    return null;
  }
}

/**
 * Fetch Daily Photos
 */
export async function fetchDailyPhotos(limit = 10, page = 1) {
  try {
    const { data } = await apolloClient.query({
      query: GET_DAILY_PHOTOS,
      variables: { limit, page },
    });
    // @ts-expect-error - Types will be available after running `pnpm codegen`
    return data.DailyPhotos;
  } catch (error) {
    console.error('Error fetching daily photos:', error);
    return { docs: [], hasNextPage: false, hasPrevPage: false, totalPages: 0, totalDocs: 0 };
  }
}

/**
 * Fetch a single Daily Photo by ID
 */
export async function fetchDailyPhotoById(id: number) {
  try {
    const { data } = await apolloClient.query({
      query: GET_DAILY_PHOTO,
      variables: { id },
    });
    // @ts-expect-error - Types will be available after running `pnpm codegen`
    return data.DailyPhoto;
  } catch (error) {
    console.error('Error fetching daily photo:', error);
    return null;
  }
}

/**
 * Fetch About Me data
 */
export async function fetchAboutMe() {
  try {
    const { data } = await apolloClient.query({
      query: GET_ABOUT_ME,
    });
    // @ts-expect-error - Types will be available after running `pnpm codegen`
    return data.AboutMe;
  } catch (error) {
    console.error('Error fetching about me:', error);
    return null;
  }
}
