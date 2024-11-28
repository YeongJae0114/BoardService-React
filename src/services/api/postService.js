const API_BASE_URL = "https://purely-funky-ladybug.ngrok-free.app/api";

/**
 * Fetch paginated posts with cursor-based pagination.
 *
 * @param {Object} [cursor] - Cursor containing `id` and `createdDate`.
 * @returns {Promise<Object>} - Response data containing posts and next cursor info.
 */
export const fetchPostsByCursor = async (cursor) => {
  try {
    // 쿼리 문자열 생성
    const queryParams = new URLSearchParams();

    // 커서가 존재하면 추가
    if (cursor?.id && cursor?.createdDate) {
      queryParams.append("cursorId", cursor.id.toString());
      queryParams.append("createdDateCursor", cursor.createdDate);
    }

    const url = `${API_BASE_URL}/posts/cursor?${queryParams.toString()}`;

    // Fetch 요청
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420", // ngrok 경고 우회
      },
    
    });

    // HTTP 응답 처리
    if (!response.ok) {
      throw new Error(`Error fetching posts: ${response.status}`);
    }

    // JSON 응답 처리
    const data = await response.json();

    // 데이터 구조 확인
    const { results, status } = data;

    // 응답 상태 확인
    if (status.code !== 2000) {
      throw new Error(`Error: ${status.message}`);
    }

    // 결과 반환
    return results[0]; // results 배열에서 첫 번째 요소 반환
  } catch (error) {
    console.error("[FetchPostsByCursor Error]", error.message);
    throw error; // 호출부에서 에러 처리
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
    });

    // HTTP 응답 처리
    if (!response.ok) {
      throw new Error(`Error fetching post detail with ID ${id}: ${response.status}`);
    }

    const data = await response.json();

    // 응답 상태 확인
    const { results, status } = data;

    if (status.code !== 2000) {
      throw new Error(`Error: ${status.message}`);
    }

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