import Footer from '@/components/Footer';
import Header from '@/components/Header';
import style from './layout.module.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className={style.main}>{children}</main>
      <Footer />
    </>
  );
}
