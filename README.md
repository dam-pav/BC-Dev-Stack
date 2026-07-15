# BC Dev Stack

BC Dev Stack is a curated VS Code extension pack for Microsoft Dynamics 365 Business Central AL development.

Installing the pack installs all included extensions. Two tools are intentionally treated as optional:

- `vjeko.vjeko-al-objid`
- `jeremyvyska.bc-code-intelligence`

VS Code's public Extension API does not permit one extension to disable another. On first activation, BC Dev Stack therefore asks the user to review these two extensions and opens the Extensions view so they can be disabled. The prompt can be reopened with **BC Dev Stack: Review Optional Extensions**.

## Releases

The first successful release from an untagged repository publishes version `0.0.0`. Later releases are generated from Conventional Commits merged into `main`:

- `fix:` creates a patch release.
- `feat:` creates a minor release.
- `BREAKING CHANGE:` or `!` creates a major release.

The release workflow creates one VSIX and publishes that exact file to the Visual Studio Marketplace, GitHub Container Registry (`ghcr.io/dam-pav/bc-dev-stack`), and the matching GitHub Release. The repository manifest remains at the bootstrap version `0.0.0`; the release workflow writes the calculated version into the packaged artifact.

Repository setup requires a `VSCE_PAT` secret with permission to publish as the `dam-pav` Marketplace publisher. The built-in `GITHUB_TOKEN` publishes tags, releases, and the GHCR package.

## Development

```sh
npm ci
npm run check
npm run package
```
