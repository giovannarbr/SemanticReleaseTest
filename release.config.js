module.exports = {
  branches: ["main"],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
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
          if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' -e "s|<Version>.*</Version>|<Version>$VERSION</Version>|" $FILE
          else
            sed -i -e "s|<Version>.*</Version>|<Version>$VERSION</Version>|" $FILE
          fi
          echo "Version updated to $VERSION"
          cat $FILE
        `
      }
    ],
    [
      "@semantic-release/git",
      {
        assets: ['CHANGELOG.md', 'SemanticReleaseTest.csproj'],
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}'
      }
    ],
    "@semantic-release/github",
  ],
  repositoryUrl: "https://github.com/giovannarbr/SemanticReleaseTest.git"
};
