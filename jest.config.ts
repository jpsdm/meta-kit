import type { Config } from 'jest';

const config: Config = {
  projects: ['<rootDir>/packages/whatsapp'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  passWithNoTests: true,
};

export default config;
