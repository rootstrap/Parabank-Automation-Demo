## Playwright flakiness analysis and follow-ups

- **Summary**: Earlier runs showed timeouts (~54–66s) across initial tests; running specs individually succeeded. This indicates environment/timing flakiness rather than selector breakage.

- **Likely causes**:
  - **Parallelism/overhead**: Non-headless Chrome with 4 workers increases CPU and network contention.
  - **External site variability**: First navigation can exceed the 30s default timeout under load.
  - **Popup handling**: Initial popup adds extra awaits during peak contention.

- **Evidence**:
  - Individual re-runs of previously failing specs passed locally.
  - Page snapshot in the report shows the expected login UI present during failures.

### Pending actions

- **Stabilize execution**
  - Run the suite with a single worker in CI: `npx playwright test --workers=1`.
  - Prefer headless in CI: set `headless: true` in config or pass `--headed=false`.

- **Improve first-load resilience**
  - Use `page.goto(url, { waitUntil: 'networkidle' })` for initial navigations.
  - Slightly increase `TIMEOUTS.MEDIUM`/`TIMEOUTS.LONG` for first-render assertions.

- **Separate long E2E from smoke**
  - Run `tests/e2eFlows.spec.ts` serialized or in its own CI job after smoke tests.

- **Observability**
  - Keep videos and screenshots on failure; archive the HTML report as a CI artifact.
  - Add metrics around first page load (network idle/response time) to spot regressions.

- **Ownership**
  - Create a CI matrix/job with `{ workers: 1, headless: true }`.
  - Track flaky-test rate over the last N runs and alert on regression.


