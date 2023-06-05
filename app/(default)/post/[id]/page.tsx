import PostDetail from '@/components/Post/detail';
import style from './page.module.scss';

export default function Post({ params }: { params: { id: string } }) {
  return (
    <div className={style.content}>
      {/* @ts-expect-error Server Component */}
      <PostDetail id={params.id} />
    </div>
  );
}
