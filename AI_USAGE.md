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

### Validation

- **Manual validation**
  - Ran the dev server (`npm run dev`) and manually exercised:
    - Filtering by domain name, registrar, and status.
    - Selecting different domains and checking details panel content.
    - Handling of incomplete data (missing registrar, dates, nameservers).
    - Loading, empty, and error states (via code modifications/mocking).
- **Automated validation**
  - Ran `npm test` to verify:
    - The composable correctly loads data and handles failures.
    - The domain table renders and emits selection events as expected.

The final result is considered owned and understood by the author, with AI used as a productivity tool rather than a source of unreviewed code.

