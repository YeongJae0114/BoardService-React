import { useState, useEffect } from "react";
import { fetchPostsByCursor } from "../services/api/postService"; // 커서 기반 API 사용

export const usePostManager = () => {
  const [posts, setPosts] = useState([]); // 게시글 목록
  const [cursor, setCursor] = useState(null); // 현재 커서
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [hasMore, setHasMore] = useState(true); // 더 가져올 데이터 여부
  const [error, setError] = useState(null); // 에러 상태

  // 데이터 로드 함수
  const loadMorePosts = async () => {
    if (loading || !hasMore) return; // 중복 호출 방지
    setLoading(true);

    try {
      // API 호출
      const response = await fetchPostsByCursor(cursor);

      // 데이터 처리
      setPosts((prevPosts) => [...prevPosts, ...response.data]); // 기존 데이터에 추가
      setCursor({ id: response.nextCursorId, createdDate: response.nextCursorCreatedDate }); // 커서 갱신
      setHasMore(response.data.length > 0); // 데이터가 더 있는지 확인
    } catch (err) {
      setError(err.message); // 에러 상태 설정
    } finally {
      setLoading(false); // 로딩 완료
    }
  };

  // 초기 데이터 로드
  useEffect(() => {
    loadMorePosts();
  }, []);

  return { posts, loading, hasMore, error, loadMorePosts };
};
