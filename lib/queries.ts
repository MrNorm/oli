import { gql } from '@apollo/client';

// HOMEPAGE DATA - Single query to get all data for index page
export const GET_HOMEPAGE_DATA = gql`
  query GetHomepageData {
    # Featured Megabyte (long-form article)
    featuredMegabyte: Megabytes(limit: 2, sort: "-date") {
      docs {
        id
        slug
        title
        date
        excerpt
        featuredImage {
          id
          url
          alt
        }
        tags
      }
    }
    
    # Recent Bytes (short posts/musings)
    recentBytes: Bytes(limit: 2, sort: "-date") {
      docs {
        id
        date
        content
        tags
        attachedMedia {
          id
          url
          alt
        }
      }
    }
    
    # Today's Daily Photo
    todayPhoto: DailyPhotos(limit: 2, sort: "-date") {
      docs {
        id
        title
        date
        photo {
          id
          url
          alt
        }
        photoType
        caption
        location
      }
    }
    
    # Projects for VHS tape collection
    projects: Projects(sort: "-createdAt") {
      docs {
        id
        slug
        projectName
        caption
      }
    }
    
    # About Me section data
    aboutMe: AboutMe {
      photo {
        id
        url
        alt
      }
      title
      content
      quickStats {
        key
        value
        id
      }
    }
  }
`;

// INDIVIDUAL COLLECTION QUERIES
export const GET_MEGABYTES = gql`
  query GetMegabytes($limit: Int, $page: Int) {
    Megabytes(limit: $limit, page: $page, sort: "-date") {
      docs {
        id
        slug
        title
        date
        excerpt
        featuredImage {
          id
          url
          alt
        }
        tags
      }
      hasNextPage
      hasPrevPage
      totalPages
      totalDocs
    }
  }
`;

export const GET_MEGABYTE = gql`
  query GetMegabyte($slug: String!) {
    Megabytes(where: { slug: { equals: $slug } }, limit: 1) {
      docs {
        id
        slug
        title
        date
        excerpt
        featuredImage {
          id
          url
          alt
          width
          height
        }
        content
        tags
      }
    }
  }
`;

export const GET_BYTES = gql`
  query GetBytes($limit: Int, $page: Int) {
    Bytes(limit: $limit, page: $page, sort: "-date") {
      docs {
        id
        date
        content
        tags
        attachedMedia {
          id
          url
          alt
        }
      }
      hasNextPage
      hasPrevPage
      totalPages
      totalDocs
    }
  }
`;

export const GET_BYTE = gql`
  query GetByte($id: Int!) {
    Byte(id: $id) {
      id
      date
      content
      tags
      attachedMedia {
        id
        url
        alt
      }
    }
  }
`;

export const GET_DAILY_PHOTOS = gql`
  query GetDailyPhotos($limit: Int, $page: Int) {
    DailyPhotos(limit: $limit, page: $page, sort: "-date") {
      docs {
        id
        title
        date
        photo {
          id
          url
          alt
          width
          height
        }
        photoType
        caption
        location
      }
      hasNextPage
      hasPrevPage
      totalPages
      totalDocs
    }
  }
`;

export const GET_DAILY_PHOTO = gql`
  query GetDailyPhoto($id: Int!) {
    DailyPhoto(id: $id) {
      id
      title
      date
      photo {
        id
        url
        alt
        width
        height
      }
      photoType
      caption
      location
    }
  }
`;

export const GET_ABOUT_ME = gql`
  query GetAboutMe {
    AboutMe {
      photo {
        id
        url
        alt
      }
      title
      content
      quickStats {
        key
        value
        id
      }
    }
  }
`;

export const GET_PROJECT = gql`
  query GetProject($slug: String!) {
    Projects(where: { slug: { equals: $slug } }, limit: 1) {
      docs {
        id
        slug
        projectName
        caption
        projectOverview
      }
    }
  }
`;
