'use client'
import Link from "next/link";
import './globals.css'
import { Button, Stack } from "@mui/material";
import useAuthStore from "../../store/authStore";
import { blue, green } from "@mui/material/colors";

export default function RootLayout({ children }) {
  // zustand 상태 가져오기
  const { user, token, isAuthenticated, logout } = useAuthStore();
  console.log("user: ", user)
  console.log("token: ", token)

  const handleLogout = () => {
    if (confirm("정말 로그아웃 하시겠습니까?")) logout();
  }
  return (
    <html lang="en">
      <body>
        <header>공통 헤더</header>
        <h1><Link href='/' >WEB</Link> </h1>
        <nav>
          <Stack direction='row' spacing={2} justifySelf="center">
            <Link href='/read/2'>CSS</Link>
            <Link href='/read/1'>HTML</Link>
            <Link href='/read/3'>JS</Link>
            <Link href='/gallery'>Image</Link>
            <Link href='/itemList'>ItemList(외부서버)</Link>
            <Link href='/guestBookList'> Guestbook(Spring 서버)</Link>
            <Link href='/join'> 회원가입 Join(Spring 서버)</Link>
            {isAuthenticated ? (
              <>
                <p>{user.m_id} 님 환영합니다</p>
                <Button variant="contained" style={{ color: "white", backgroundColor: "#f050f4" }} onClick={handleLogout}> 로그아웃</Button>
              </>
            ) : (
              <Link href='/login'> 로그인 Login(Spring 서버)</Link>
            )}
            <Link href='/stellarium'> stellarium Test</Link>
            <Link href='/todayhouse'> Today's House Test</Link>
          </Stack>
        </nav>
        <hr />
        <ul>
          <li><Link href='/create'>Create</Link></li>
          <li>Update</li>
          <li><input type="button" value="delete" /></li>
        </ul>
        <hr />
        <h2>Main page.js</h2>
        {children}


        <footer>공통 푸터</footer>
      </body>
    </html >
  );
}
