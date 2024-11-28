import { useState, useEffect } from "react";
import { fetchPostDetail } from "../services/api/postService";

export const usePostDetail = (id) => {
  const [post, setPost] = useState(null); // 게시글 데이터
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    if (!id) return;

    const loadPostDetail = async () => {
      setLoading(true); // 로딩 시작
      setError(null); // 기존 에러 초기화

      try {
        const data = await fetchPostDetail(id); // API 호출
        setPost(data); // 데이터 저장
      } catch (err) {
        setError(err.message); // 에러 처리
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    loadPostDetail();
  }, [id]);

  return { post, loading, error };
};
