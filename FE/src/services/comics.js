import { getAuthToken } from "@/hooks/useAuth";

let baseUrl = process.env.NEXT_PUBLIC_BASE_API + '/api';

let option = { next: {revalidate: 10, tags: ['Comics']} };
let optionNoStore = { cache: 'no-store' };

export async function getComics() {
  const response = await fetch(baseUrl + '/home', optionNoStore);
  const data = await response.json();
  return data;
}

export async function getComic(slug) {
  const response = await fetch(baseUrl + '/home/' + slug, optionNoStore);
  const data = await response.json();
  return data;
}

export async function getChapter(id) {
  const token = await getAuthToken();
  const response = await fetch(`${baseUrl}/chapters/getChapter/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token?.value}`
    }
  }, 3600);
  // console.log(id);
  const data = await response.json();
  return data;
}

export async function getComicsByList(slug, page) {
  try {
    const response = await fetch(baseUrl + `/home/list/${slug}?page=${page}`, optionNoStore);
    if (!response.ok) {
      return {
        status: "error",
        message: "Failed to fetch comics"
      };
    }
    const data = await response.json();
    return {
      status: "success",
      data: {
        items: data.data.items || [],
        pagination: {
          currentPage: page,
          totalPages: data.data.pagination.totalPages,
          totalItems: data.data.pagination.totalItems,
          limit: data.data.pagination.limit
        },
        title: data.data.title || ''
      }
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message
    };
  }
}

export async function getComicsByCategory(slug, page) {
  try {
    const response = await fetch(baseUrl + `/home/category/${slug}?page=${page}`, optionNoStore);
    if (!response.ok) {
      return {
        status: "error",
        message: "Failed to fetch comics"
      };
    }
    const data = await response.json();
    return {
      status: "success",
      data: {
        items: data.data.items || [],
        pagination: {
          currentPage: page,
          totalPages: data.data.pagination.totalPages,
          totalItems: data.data.pagination.totalItems,
          limit: data.data.pagination.limit
        },
        title: data.data.title || ''
      }
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message
    };
  }
}
export async function getSreach(slug, page) {
  try {
    const response = await fetch(baseUrl + `/home/search?keyword=${slug}&page=${page}`, optionNoStore);
    if (!response.ok) {
      return {
        status: "error",
        message: "Failed to fetch comics"
      };
    }
    const data = await response.json();
    return {
      status: "success",
      data: {
        items: data.data.items || [],
        pagination: {
          currentPage: page,
          totalPages: data.data.pagination.totalPages,
          totalItems: data.data.pagination.totalItems,
          limit: data.data.pagination.limit
        },
        title: data.data.title || ''
      }
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message
    };
  }
}

export async function getComicsByAuthor(slug, page) {
  try {
    const response = await fetch(baseUrl + `/home/author/${slug}?page=${page}`, optionNoStore);
    if (!response.ok) {
      return {
        status: "error",
        message: "Failed to fetch comics"
      };
    }
    const data = await response.json();
    return {
      status: "success",
      data: {
        items: data.data.items || [],
        pagination: {
          currentPage: page,
          totalPages: data.data.pagination.totalPages,
          totalItems: data.data.pagination.totalItems,
          limit: data.data.pagination.limit
        },
        title: data.data.title || ''
      }
    };
  } catch (error) {
    return {
      status: "error",
      message: error.message
    };
  }
}

export async function getAllComics() {
  const response = await fetch(baseUrl + '/comics/getAllComics', option);
  const data = await response.json();
  return data;
}

export async function getComicsByPage(page) {
  const response = await fetch(baseUrl + '/comics/getComicsByPage?page=' + page, optionNoStore);
  const data = await response.json();
  return data;
}

export async function getTotalComicAndChapter() {
  const response = await fetch(baseUrl + '/comics/getTotalComicAndChapter', option);
  const data = await response.json();
  return data;
}

export async function getChaptersByPage(page) {
  const response = await fetch(baseUrl + '/comics/getChaptersByPage?page=' + page, optionNoStore);
  const data = await response.json();
  return data;
}

export async function getComicsByLetter(letter, page) {
  const response = await fetch(`${baseUrl}/home/search?keyword=${letter}&page=${page}`, optionNoStore);
  const data = await response.json();
  return data;
}
