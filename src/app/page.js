import Image from "next/image";
import coffeeGray from '/public/img/coffee-gray.jpg'

export default function Home() {
  return (
    <>
      <h2>Welcome</h2>
      <p><Image src='/img/coffee-blue.jpg' alt="coffee-blue" width={100} height={100} /></p>
      <p><Image src={coffeeGray} alt="coffee-gray" /></p>
    </>

  );
}
