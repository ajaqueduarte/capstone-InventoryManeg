import Image from "next/image";
import Header from './ui/Header';

export default function Home() {
  return (
    <div>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Main Page
    </main>
    </div>
    
  );
}
