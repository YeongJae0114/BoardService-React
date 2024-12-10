import React, { createContext, useState, useEffect, useContext } from "react";
import { checkSession, logoutUser } from "../services/api/authService"; // 로그아웃 메소드 추가

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 사용자 정보
  const [loading, setLoading] = useState(true); // 초기 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // 세션 유효성 확인 함수
  const fetchSession = async () => {
    try {
      console.log("[AuthContext] Checking session...");
      setLoading(true); // 로딩 시작
      setError(null); // 기존 에러 초기화
      const sessionData = await checkSession(); // checkSession API 호출
      console.log("[AuthContext] Session data received:", sessionData);
      setUser(sessionData.data || null); // 세션 데이터에서 사용자 정보 설정
    } catch (error) {
      console.warn("[AuthContext] 세션이 유효하지 않습니다:", error.message);
      setUser(null); // 세션이 유효하지 않으면 사용자 정보 초기화
      setError(error.message || "Unknown error occurred during session check"); // 에러 메시지 저장
    } finally {
      setLoading(false); // 로딩 상태 업데이트
      console.log("[AuthContext] Session check completed. Loading:", false);
    }
  };

  useEffect(() => {
    fetchSession(); // 컴포넌트 마운트 시 세션 유효성 확인
  }, []);

  const login = (userData) => {
    console.log("[AuthContext] Logging in user:", userData);
    setUser(userData); // 사용자 정보 설정
    setError(null); // 에러 초기화
  };

  const logout = async () => {
    console.log("[AuthContext] Logging out user");
    try {
      await logoutUser(); // 백엔드 로그아웃 API 호출
      setUser(null); // 사용자 정보 초기화
      setError(null); // 에러 초기화
      console.log("[AuthContext] Logout successful.");
    } catch (error) {
      console.error("[AuthContext] Logout failed:", error.message);
      setError("Failed to log out. Please try again."); // 에러 메시지 설정
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
