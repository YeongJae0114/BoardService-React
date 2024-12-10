const API_BASE_URL = "https://purely-funky-ladybug.ngrok-free.app/api";

/**
 * Fetch paginated posts with cursor-based pagination.
 *
 * @param {Object} [cursor] - Cursor containing `id` and `createdDate`.
 * @returns {Promise<Object>} - Response data containing posts and next cursor info.
 */
export const fetchPostsByCursor = async (cursor) => {
  try {
    const queryParams = new URLSearchParams();

    // 커서 값이 있으면 쿼리 파라미터에 추가
    if (cursor) {
      queryParams.append("cursorId", cursor.id?.toString() || "");
      queryParams.append("createdDateCursor", cursor.createdDate || "");
    }

    const url = `${API_BASE_URL}/posts/cursor?${queryParams.toString()}`;
    console.log("Fetching URL:", url);

    // Fetch 요청
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420", // ngrok 경고 우회
      },
      credentials: "include",
    });

    // 응답 상태 코드 확인
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API Response:", data);

    // 응답 구조에서 데이터 추출
    const { postList = [], nextCursorId, nextCreatedDateCursor, hasNext } = data;

    // 응답 데이터 유효성 검사
    if (!Array.isArray(postList)) {
      throw new Error("Invalid response: postList is not an array.");
    }

    return { postList, nextCursorId, nextCreatedDateCursor, hasNext };
  } catch (error) {
    console.error("[FetchPostsByCursor Error]", error.message);
    throw error;
  }
};



/**
 * Fetch detailed post by ID.
 *
 * @param {string|number} id - The ID of the post to fetch.
 * @returns {Promise<Object>} - The detailed post data.
 */
export const fetchPostDetail = async (id) => {
  try {
    const url = `${API_BASE_URL}/posts/${id}`;

    // Fetch 요청
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420", // ngrok 경고 우회
      },
      credentials: "include",
    });

    // HTTP 응답 처리
    if (!response.ok) {
      throw new Error(`Error fetching post detail with ID ${id}: ${response.status}`);
    }

    const data = await response.json();

    // 응답 상태 확인
    const { results, status } = data;


    // results 배열에서 첫 번째 요소 반환
    if (results.length === 0) {
      throw new Error(`No post found with ID ${id}`);
    }

    return results[0]; // 첫 번째 게시글 반환
  } catch (error) {
    console.error("[FetchPostDetail Error]", error.message);
    throw error;
  }
};
