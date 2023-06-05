import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.VERCEL_URL
    ? `${process.env.VERCEL_URL}/api/graphql`
    : 'http://localhost:3002/api/graphql',
  documents: ['./**/*.tsx'],
  generates: {
    'generated/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo']
    }
  }
};
export default config;
