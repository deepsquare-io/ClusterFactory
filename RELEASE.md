# Releasing ClusterFactory

## Creating a release

Creating a release happens via GitHub Actions by creating an [annotated](https://git-scm.com/book/en/v2/Git-Basics-Tagging#_creating_tags) git tag. Tag creation triggers the release workflow which will do most of the heavy-lifting:

- Create the actual release in [releases](https://github.com/deepsquare-io/ClusterFactory/releases/)

After the action completes, the release will be in `draft` state to allow manual modification of the release notes. Currently there is no automation for the release notes, this has to be manually collected.

Once the release notes are done we can publish the release.

## Semver

We follow [semantic versioning](https://semver.org/) for version numbering. We are currently working on the 0.y.z series, so the rules are interpreted a bit more loosely.

Break changes still need to be announced.

## Betas, RCs and others

We may bake couple beta or RC releases before pushing out the final release.
