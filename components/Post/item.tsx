import { Post } from '@/generated/graphql';
import Link from 'next/link';
import styles from './item.module.scss';

interface PostItemProps {
  post: WithOptional<Post, 'user'>;
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <Link href={`/post/${post?.id}`}>
      <article className={styles.postItem}>
        <div className={styles.postItem_title}>{post.title}</div>
        <div className={styles.postItem_body}>{post.body}</div>
      </article>
    </Link>
  );
}
