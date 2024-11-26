import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>공통 헤더</header>
        <h1><Link href='/' >  WEB</Link> </h1>
        <ol>
          <li><Link href='/read/1'>HTML</Link></li>
          <li><Link href='/read/2'>CSS</Link></li>
          <li><Link href='/read/3'>JS</Link></li>
          <li><Link href='/gallery'>Image</Link></li>
          <li>ItemList(외부서버)</li>
          <li>Guestbook(Spring 서버)</li>
        </ol>
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
