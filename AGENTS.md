# Agent instructions

This repository contains the reusable Scrollable Explainer skill and its supporting research. Keep `SKILL.md` self-contained, and retain attribution and provenance for research and third-party reference images.

- Write agent instructions here; `CLAUDE.md` is a symlink.
- Keep Markdown paragraphs on one line.
- Track tasks only in Beads; order work with `bd dep`.
- Read the [Beads sync playbook](docs/beads-sync-playbook.md) for setup and recovery.

## Beads sync

`git push` also pushes Beads through the repo-local pre-push hook; `bd dolt push` is the manual fallback. Post-merge and branch-checkout hooks pull Beads without blocking Git on sync failure. Dolt is the source of truth; automatic JSONL export is disabled. After cloning, run `git config core.hooksPath .beads/hooks`, `bd bootstrap` if needed, then `bd dolt pull`.
