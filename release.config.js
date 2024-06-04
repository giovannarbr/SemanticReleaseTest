module.exports = {
    branches: ["main"],
    plugins: [
      "@semantic-release/commit-analyzer",
      "@semantic-release/release-notes-generator",
      "@semantic-release/changelog",
      "@semantic-release/git",
      "@semantic-release/github",
      [
        "@semantic-release/commit-analyzer",
        {
          releaseRules: [
            {
              tag: "*",
              release: "patch"
            },
            {
              subject: "*",
              release: "patch"
            }
          ]
        }
      ],
      [
        "@semantic-release/exec",
        {
          prepareCmd: `
          VERSION=\${nextRelease.version}
          FILE="SemanticReleaseTest.csproj"
          if [ -z "$VERSION" ]; then
            echo "No version provided!"
            exit 1
          fi
          sed -i '' -e "s|<Version>.*</Version>|<Version>$VERSION</Version>|" $FILE
          echo "Version updated to $VERSION"
        `
        }
      ],
    ],
    repositoryUrl: "https://github.com/giovannarbr/SemanticReleaseTest.git"
  };