const API_BASE_URL = "https://purely-funky-ladybug.ngrok-free.app/api/auth";

/**
 * 사용자 로그인 요청
 *
 * @param {Object} loginData - 로그인 데이터 (email과 password)
 * @param {string} loginData.email - 사용자 이메일
 * @param {string} loginData.password - 사용자 비밀번호
 * @returns {Promise<Object>} - 서버 응답 데이터
 */
export const loginUser = async (loginData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // JSON 형식으로 요청
        "ngrok-skip-browser-warning": "69420", // ngrok 경고 우회
      },
      credentials: "include", // 쿠키 포함
      body: JSON.stringify(loginData), // JSON 형식으로 email, password 전송
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.status}`);
    }

    const data = await response.json(); // 응답 데이터 파싱
    return data; // 성공 시 응답 반환
  } catch (error) {
    console.error("[AuthService] Error logging in user:", error.message);
    throw error; // 에러를 호출한 곳으로 전달
  }
};

/**
 * 사용자 로그아웃 요청
 *
 * @returns {Promise<void>} - 로그아웃 성공 시 빈 응답 반환
 */
export const logoutUser = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: "POST", // 로그아웃 요청은 POST 메소드로 수행
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420", // ngrok 경고 우회
      },
      credentials: "include", // 쿠키 포함
    });

    if (!response.ok) {
      throw new Error(`Logout failed: ${response.status}`);
    }

    console.log("[AuthService] Logout successful.");
  } catch (error) {
    console.error("[AuthService] Error logging out user:", error.message);
    throw error; // 에러를 호출한 곳으로 전달
  }
};

/**
 * 사용자 회원가입 요청
 *
 * @param {string} username - 사용자 이름
 * @param {string} email - 사용자 이메일
 * @param {string} password - 사용자 비밀번호 (string 형식)
 * @returns {Promise<Object>} - 서버 응답 데이터
 */
export const registerUser = async (username, email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420", // ngrok 경고 우회
      },
      credentials: "include",
      body: JSON.stringify({
        username: String(username),
        email: String(email),
        password: String(password), // 명시적으로 문자열로 변환
      }),
    });

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.status}`);
    }

    const data = await response.json();
    return data; // 회원가입 성공 시 응답 데이터 반환
  } catch (error) {
    console.error("[AuthService] Error registering user:", error.message);
    throw error; // 에러를 호출한 곳으로 전달
  }
};

/**
 * 세션 유효성 확인
 * @returns {Promise<Object>} - 사용자 정보 또는 에러 메시지
 */
export const checkSession = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/session`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420", // ngrok 경고 우회
      },
      credentials: "include", // 쿠키를 포함하여 요청
    });

    if (!response.ok) {
      throw new Error("세션이 유효하지 않습니다.");
    }

    const data = await response.json();
    return data; // 유효한 세션의 경우 사용자 정보 반환
  } catch (error) {
    console.error("[AuthService] 세션 확인 실패:", error.message);
    throw error;
  }
};
