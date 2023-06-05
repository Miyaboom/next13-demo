import { PostQuery, PostsQuery } from '@/generated/graphql';
import { getClient } from '../../libs/client';
import { gql } from '@apollo/client';
import styles from './detail.module.scss';

async function getPost(id: string) {
  const query = gql`
    query post($id: ID!) {
      post(id: $id) {
        id
        title
        body
        user {
          id
          username
          image
        }
      }
    }
  `;

  const { data, error, errors, loading } = await getClient().query<PostQuery>({
    query,
    variables: {
      id: id
    }
  });
  return data;
}

interface PostProps {
  id: string;
}

export default async function PostDetail({ id }: PostProps) {
  const { post } = await getPost(id);

  return (
    <article className={styles.postDetail}>
      <h1 className={styles.postDetail_title}>{post?.title}</h1>
      <p className={styles.postDetail_body}>{post?.body}</p>
    </article>
  );
}
