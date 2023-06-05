import { PostsQuery } from '@/generated/graphql';
import { getClient } from '../../libs/client';
import { gql } from '@apollo/client';
import PostItem from './item';
import styles from './list.module.scss';

async function getPosts(limit: number = 10, offset: number = 0) {
  const query = gql`
    query posts($limit: Int! = 10, $offset: Int! = 0) {
      posts(limit: $limit, offset: $offset) {
        id
        title
        body
      }
    }
  `;

  const { data, error, errors, loading } = await getClient().query<PostsQuery>({
    query,
    variables: {
      limit: limit,
      offset: offset
    }
  });
  return data;
}

interface PostListProps {
  limit?: number;
  offset?: number;
}

export default async function PostList({ limit = 10, offset = 0 }: PostListProps) {
  const { posts } = await getPosts(limit, offset);

  return (
    <div className={styles.postList}>
      {posts?.map((post) => {
        return post && <PostItem key={post?.id} post={post} />;
      })}
    </div>
  );
}
