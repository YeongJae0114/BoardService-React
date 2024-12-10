import { useState, useEffect, useRef } from "react";
import { fetchPostsByCursor } from "../services/api/postService";

export const usePostManager = () => {
  const [posts, setPosts] = useState([]); // 게시글 목록
  const [cursor, setCursor] = useState(null); // 현재 커서
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [hasMore, setHasMore] = useState(true); // 더 가져올 데이터 여부
  const [error, setError] = useState(null); // 에러 상태

  const initialLoad = useRef(true); // 초기 로드 여부 추적

  const loadMorePosts = async (isInitialLoad = false) => {
    if (loading || !hasMore) return; // 중복 호출 방지
    setLoading(true);

    try {
      // 초기 요청에서는 cursor를 보내지 않음
      const response = await fetchPostsByCursor(isInitialLoad ? null : cursor);

      // 응답에서 postList 배열을 추출
      const postList = response.postList || []; // 게시글 데이터 배열

      // 중복 데이터 제거
      setPosts((prevPosts) => {
        const uniquePosts = [...prevPosts, ...postList].filter(
          (post, index, self) =>
            index === self.findIndex((p) => p.id === post.id) // 중복 제거 로직
        );
        return uniquePosts;
      });

      // 커서 갱신
      setCursor({
        id: response.nextCursorId,
        createdDate: response.nextCreatedDateCursor,
      });


      // 데이터가 더 있는지 여부 업데이트
      setHasMore(response.hasNext);
    } catch (err) {
      console.error("Error loading posts:", err.message);
      setError(err.message || "데이터를 불러오는데 실패했습니다."); // 에러 상태 설정
    } finally {
      setLoading(false); // 로딩 완료
    }
  };

  useEffect(() => {
    if (initialLoad.current) {
      console.log("Initial Load Triggered");
      loadMorePosts(true); // 첫 요청 시 isInitialLoad를 true로 설정
      initialLoad.current = false; // 초기 로드 완료 표시
    }
  }, []); // 빈 배열로 설정하여 첫 요청 시 한 번만 실행

  return { posts, loading, hasMore, error, loadMorePosts };
};
