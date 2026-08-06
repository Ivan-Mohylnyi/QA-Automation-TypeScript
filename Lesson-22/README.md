# Lesson 22 - CI/CD in Automated Testing

GitHub Actions pipelines added retroactively to the Playwright- and WDIO-based homeworks, so the lecturer can see the tests actually run (not just read the code) when opening each PR.

## Where the pipelines live

Each pipeline was committed directly onto the branch/PR whose tests it runs, since GitHub Actions has to find the workflow file on the same ref that triggers it - a new `Lesson-22` branch with copies of the files wouldn't actually run anything. This branch only holds the summary below.

| Branch / PR | Workflow file | What it runs |
|---|---|---|
| `Lesson-17` (`webdriver-io` only, per the assignment) | `.github/workflows/lesson-17-webdriver-io.yml` | `npm test` (`wdio run`) |
| `Lesson-18` | `.github/workflows/lesson-18.yml` | `npm test` (`playwright test`) |
| `Lesson-19` | `.github/workflows/lesson-19.yml` | `npm test` (`playwright test`) |
| `Lesson-20` | `.github/workflows/lesson-20.yml` | `npm test` (`cucumber-js`) |
| `Lesson-21` | `.github/workflows/lesson-21.yml` | `npm test` + `npm run report:allure:generate` |

Each workflow: checks out the branch, sets up Node, installs dependencies (`npm ci`), installs Playwright's Chromium where needed (`npx playwright install --with-deps chromium`), runs the suite headless, and uploads the HTML report (Playwright/Cucumber/Allure) as a build artifact. Lesson 21 additionally sets up a JDK (`actions/setup-java`), since `allure-commandline` needs Java to render the static report.

Triggers on every workflow: `push` to that lesson's own branch, `pull_request` targeting `main`, and `workflow_dispatch` for a manual run.

## A real blocker found and fixed along the way

After adding all five workflow files and pushing them, GitHub Actions showed **zero** registered workflows and **zero** runs anywhere in the repository - despite every file being valid YAML, correctly placed at `.github/workflows/`, and living on branches with real, open PRs against `main`.

Root cause: GitHub only activates Actions for a repository once at least one workflow file has existed on the **default branch**. Every homework in this repo lives on its own branch that's never merged into `main`, so Actions had literally never been switched on repo-wide - none of the five pipelines could trigger no matter how correct they were.

Fix: added a small `.github/workflows/_repo-actions-bootstrap.yml` directly to `main` - it touches no lesson code, it only exists so GitHub recognizes the repository uses Actions. After that one-time push, four of the five branches (Lesson-17, 19, 20, 21) registered and ran within about a minute of their next push. `Lesson-18` took a couple of extra retriggers before GitHub picked it up - no configuration difference from the others, just a slower propagation on that specific branch.

## Result

All five pipelines are confirmed green (verified via the GitHub Actions API, not just assumed):

| Branch | Run |
|---|---|
| Lesson-17 | [success](https://github.com/Ivan-Mohylnyi/QA-Automation-TypeScript/actions/runs/31129848331) |
| Lesson-18 | [success](https://github.com/Ivan-Mohylnyi/QA-Automation-TypeScript/actions/runs/31130178243) |
| Lesson-19 | [success](https://github.com/Ivan-Mohylnyi/QA-Automation-TypeScript/actions/runs/31130193570) |
| Lesson-20 | [success](https://github.com/Ivan-Mohylnyi/QA-Automation-TypeScript/actions/runs/31129869506) |
| Lesson-21 | [success](https://github.com/Ivan-Mohylnyi/QA-Automation-TypeScript/actions/runs/31129881564) |
