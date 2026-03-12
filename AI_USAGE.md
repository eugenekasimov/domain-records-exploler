## AI Usage

This project was implemented with the assistance of an AI coding assistant inside the Cursor editor.

---

### Tools Used

- **Cursor built-in assistant (GPT-based)** for:
  - Scaffolding the initial Vite + Vue 3 + TypeScript project.
  - Suggesting component structure and Composition API patterns.
  - Generating boilerplate code for the mock API, composable, and Vue components.
  - Drafting example tests with Vitest and Vue Test Utils.
  - Drafting this `README.md` and `AI_USAGE.md` structure and sections.

---

### Tasks Assisted

- **Project setup**
  - Chose the Vite + Vue 3 + TypeScript template.
  - Added Vitest and basic test configuration.
- **Implementation**
  - Helped sketch the `DomainRecord` type and mock data set for domain records.
  - Generated first drafts for:
    - `useDomainRecords` composable for loading, filtering, and error handling.
    - `DomainFilters`, `DomainTable`, and `DomainDetails` components.
  - Suggested CSS structure for panels, table layout, and overall page styling using plain CSS.
- **Testing**
  - Provided initial examples of unit tests for the composable and table component.
- **Documentation**
  - Suggested the outline and wording for the README’s sections and backend API proposal.

---

### Human Review and Modifications

- **Code review**
  - Reviewed generated code for correctness and alignment with the exercise requirements.
  - Simplified or adjusted component props, events, and composable behavior for clarity.
  - Removed unused template code from the Vite starter and deleted unused components.
- **Testing fixes**
  - Updated composable tests to avoid relying on Vue lifecycle hooks outside a component context.
  - Ensured tests assert on realistic behavior of the `reload` method and error handling.
- **Styling tweaks**
  - Adjusted layout, spacing, and color choices to keep the UI clean and readable without any CSS framework.
  - Verified responsive behavior of the table and details side panel.

---

### Round 2: PR feedback and follow-up changes

After the initial submission, a second round of changes was made in response to code review. The same AI assistant was used to implement these fixes; the author reviewed and validated each change.

- **Reset and events**
  - Wired the `reset` event in `DomainFilters` so the parent’s `@reset` handler runs (clearSelection + resetFilters). Reset button now only emits `reset`; the parent clears filters in one shot so the watcher fires once.
  - Replaced the inline multiline handler in the template with a named `handleReset` method.
- **Debounce**
  - Moved debounce from the composable into `DomainFilters` for the domain and registrar text inputs only. Reset and status changes trigger an immediate reload so button and dropdown feel instant. Added `onUnmounted` to clear debounce timers and avoid leaks.
- **Details panel**
  - Restored the “Clear selection” button in `DomainDetails` so the declared `close` emit is used; renamed from “Clear” to avoid implying record deletion.
- **Tests**
  - Added tests for `format.ts`, `StatusBadge`, `DomainFilters`, `DomainDetails`, and `domainApi`; expanded `useDomainRecords` and `DomainTable` tests (filters, pagination, reset, empty state, keyboard). Fixed domainApi assertion (total vs data.length) and used fake timers so the 250ms mock delay does not slow the suite. DomainFilters tests use fake timers for debounced emits.
- **Dead code and API**
  - Removed unused `setPage` from the composable’s public API; removed dead `goToPage` and `.reload-button` CSS from App. Removed duplicate `position: sticky` from table headers and fixed invalid `font-weight: 650` in App.
- **Docs**
  - Updated README: Tradeoffs (debounce scope, testing surface), Assumptions (list keys, expiry visibility), Future Improvements (real backend, expired/expiring domains), and corrected Future Improvements so it no longer contradicted the existing pagination UI. Set top-level heading to `#`. Updated AI_USAGE (this section).

---

### Validation

- **Manual validation**
  - Ran the dev server (`npm run dev`) and manually exercised:
    - Filtering by domain name, registrar, and status.
    - Selecting different domains and checking details panel content.
    - Handling of incomplete data (missing registrar, dates, nameservers).
    - Loading, empty, and error states (via code modifications/mocking).
- **Automated validation**
  - Ran `npm test` to verify the full suite (7 files, 41+ tests), including composable, components, API, and format utilities, after each batch of changes.

The final result is considered owned and understood by the author, with AI used as a productivity tool rather than a source of unreviewed code.

