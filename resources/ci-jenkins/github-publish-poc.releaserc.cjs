module.exports = {
  branches: ["feature/INFRA-6932-jenkins"],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
  ],
};
