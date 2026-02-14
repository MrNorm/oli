import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.VITE_CMS_API_URL || 'https://oli-cms.hi-4ce.workers.dev/api/graphql',
  documents: ['**/*.tsx', '**/*.ts', '!lib/generated/**/*'],
  ignoreNoDocuments: true,
  generates: {
    './lib/generated/': {
      preset: 'client',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false,
      },
    },
    './lib/generated/introspection.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
