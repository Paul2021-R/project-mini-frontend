// app/src/app/login/page.tsx

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        {/* 1. 제목 공간 */}
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          로그인
        </h1>

        <form>
          {/* 2. 이메일 입력 */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="email@example.com"
              className="w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* 3. 비밀번호 입력 */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* (추가 요소) 로그인 유지 */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="remember-me"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-900"
            >
              로그인 유지
            </label>
          </div>

          {/* 메인 로그인 버튼 */}
          <button
            type="submit"
            className="mb-4 w-full rounded-md bg-blue-600 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-700"
          >
            로그인
          </button>
        </form>

        {/* 4. 계정/비밀번호 찾기 */}
        <div className="mb-6 flex justify-between text-sm">
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            계정 찾기
          </a>
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            비밀번호 찾기
          </a>
        </div>

        {/* 5. 간편 가입 (구글, 깃헙) */}
        <div className="space-y-3">
          <button className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            {/*  */}
            <span className="mr-2">G</span> 구글로 로그인
          </button>
          <button className="flex w-full items-center justify-center rounded-md border border-gray-800 bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700">
            {/*  */}
            <span className="mr-2"></span> 깃헙으로 로그인
          </button>
        </div>

        {/* 6. (추가 요소) 회원가입 */}
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            아직 계정이 없으신가요?{' '}
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              회원가입
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}