# Agent instructions

This repository contains the reusable Scrollable Explainer skill and its supporting research. Keep `SKILL.md` self-contained, and retain attribution and provenance for research and third-party reference images.

- Write agent instructions here; `CLAUDE.md` is a symlink.
- Keep Markdown paragraphs on one line.
- Track tasks only in Beads; order work with `bd dep`.
- Read the [Beads sync playbook](docs/beads-sync-playbook.md) for setup and recovery.

## Beads sync

`git push` also pushes Beads through the repo-local pre-push hook; `bd dolt push` is the manual fallback. Post-merge and branch-checkout hooks pull Beads without blocking Git on sync failure. Dolt is the source of truth; automatic JSONL export is disabled. After cloning, run `git config core.hooksPath .beads/hooks`, `bd bootstrap` if needed, then `bd dolt pull`.

## Changelog

At session end, only log new features or significant reader-facing changes
(behaviour, fixes to materially broken functionality, or public content).
Skip polish, tidying, and small fixes as standalone entries; include them only
as supporting detail in a larger feature or release announcement that qualifies
on its own. Planning/research/design must itself be a significant public
deliverable. When unsure, skip.

Use `changelog/YYYY-MM-DD-slug.md` with `date`/`title`/`promote` frontmatter:
a plain-text title, one or two reader-facing sentences, a live link where
available, and consider a screenshot for visual work. Substantial announcements
can use paragraphs or bullets. Omit internal implementation detail. For the
first entry or when the format is unclear, fetch and follow
https://raw.githubusercontent.com/life-itself/changelog/main/CONVENTION.md
