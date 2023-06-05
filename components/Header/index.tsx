import Image from 'next/image';
import styles from './index.module.scss';
import Link from 'next/link';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src="/next.svg" className={styles.logo} alt="logo" fill />
        </Link>
      </div>
    </header>
  );
}
