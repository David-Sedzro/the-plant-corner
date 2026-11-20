# EE02 write-up: fixes and further improvement

- **My site:** [david-sedzro.github.io/the-plant-corner](https://david-sedzro.github.io/the-plant-corner/)
- **Audit received from:** Alvin Etornam Laryea, [github.com/laryea-0/amas-plant-corner/blob/e6595fc2eede3226e2a152d012e47cb3ac120548/docs/eeo2/audit-of-david-sedzro.md](https://github.com/laryea-0/amas-plant-corner/blob/e6595fc2eede3226e2a152d012e47cb3ac120548/docs/eeo2/audit-of-david-sedzro.md)
-

## Fixes

### Finding 1: Navigation link has no visible keyboard focus indicator

- **Reproduced before fixing:** Yes. When tabbing through the navigation bar on the homepage, the "Contact" button received keyboard focus, but its visual appearance remained unchanged. There was no visible outline, border change, or color shift distinguishing the focused button from an unfocused one.
- **Cause:** In `css/styles.css`, `.site-header__nav-btn` had custom background and text styling without an explicit `:focus-visible` rule, and default browser focus rings were either overridden or visually indistinguishable against the header background.
- **What I changed:** In `css/styles.css`, added an explicit `:focus-visible` pseudo-class for `.site-header__nav-btn` with a 3px high-contrast outline (`outline: 3px solid var(--color-primary-dark);`) and an `outline-offset: 3px;`.
- **Why this fixes the cause, not just the symptom:** Declaring `:focus-visible` with a specified thickness, high contrast, and offset ensures that whenever a keyboard user tabs to the button, the browser renders an undeniable visual highlight without altering mouse click behavior.
- **How I verified it:** Tabbed through the header in Chrome and Microsoft Edge. Confirmed a distinct dark green outline with 3px separation appears immediately upon focusing the Contact button. Meets WCAG 2.4.7 (Focus Visible, Level AA).

### Finding 2: Navigation menu clips the last navigation link (Plant Care) at 400% zoom

- **Reproduced before fixing:** Yes. When setting browser zoom to 400% (equivalent to a 320px wide viewport with limited height, such as 320 × 180 CSS pixels), expanding the mobile navigation menu pushed the last navigation item below the visible screen. The menu could not be scrolled down to reveal the link.
- **Cause:** `.site-header__nav--mobile` in `css/components.css` lacked vertical overflow handling and dynamic viewport height bounds, causing content exceeding screen height to be cut off.
- **What I changed:** In `css/components.css`, updated `.site-header__nav--mobile` by applying `max-height: calc(100dvh - 4.25rem); overflow-y: auto; overscroll-behavior: contain;`.
- **Why this fixes the cause, not just the symptom:** This constrains the dropdown to the exact available vertical space beneath the sticky header and gives the navigation list its own scroll container, guaranteeing all links remain reachable regardless of extreme zoom or short viewports.
- **How I verified it:** Simulated a 320 × 180 viewport at 400% zoom in DevTools. Opened the menu and tabbed through every link. Confirmed the menu scrolls smoothly and brings the last link into clear view and focus. Meets WCAG 1.4.10 (Reflow, Level AA).

### Finding 3: Hero section buttons have poorly visible keyboard focus indicators

- **Reproduced before fixing:** Yes. Tabbing onto the hero section call-to-action buttons ("Shop Plants" and "Explore Care Tips") revealed a default or subtle outline that blended into the dark background photograph, failing to provide the required 3:1 non-text contrast against the underlying image.
- **Cause:** The hero buttons lacked tailored `:focus-visible` styles designed to stand out against variable dark background imagery.
- **What I changed:** In `css/styles.css`, added high-contrast `:focus-visible` rules for `.hero__actions .btn` using a bright 3px solid white outline with a 3px offset (`outline: 3px solid #ffffff; outline-offset: 3px;`) paired with a dark drop shadow for contrast against lighter areas of photographs.
- **Why this fixes the cause, not just the symptom:** Providing a dual-contrast focus ring (light outline with spacing/shadow) ensures the focus indicator remains sharply visible regardless of which rotating image slide is displayed behind it.
- **How I verified it:** Navigated through the hero section using the `Tab` key across all carousel slide transitions. Confirmed the focus indicator stands out clearly in all frames and exceeds 3:1 contrast against background colors. Meets WCAG 2.4.7 (Focus Visible) and WCAG 1.4.11 (Non-text Contrast).

### Finding 4: Contact Us form does not identify required fields before submission

- **Reproduced before fixing:** Yes. Inspecting the contact form on `index.html` showed that fields (Name, Email, Message) had no visual indication of being required before attempting to submit. A user only discovered a field was mandatory when the browser halted submission with an error alert.
- **Cause:** The form inputs relied solely on the HTML5 `required` attribute without visual asterisks or an upfront instruction statement explaining which fields were mandatory.
- **What I changed:** In `index.html`, added an upfront explanatory paragraph (`<p class="form__instructions">Fields marked with an asterisk (<span aria-hidden="true">*</span>) are required.</p>`), added `<span class="required-indicator" aria-hidden="true">*</span>` inside each required `<label>`, and retained `aria-required="true"`.
- **Why this fixes the cause, not just the symptom:** Providing both an upfront instruction statement and per-label indicators ensures users understand requirements before interacting, preventing submission errors.
- **How I verified it:** Visual inspection confirmed clear asterisks and introductory instructions. Screen reader testing (Edge Read Aloud / NVDA) confirmed each field announced its required state cleanly without confusing punctuation artifacts. Meets WCAG 3.3.2 (Labels or Instructions, Level A).

### Finding 5: Navigation menu toggle uses prohibited ARIA attributes

- **Reproduced before fixing:** Yes. Running Google Lighthouse Mobile identified an accessibility violation: _"Elements use prohibited ARIA attributes: [aria-label] on label.site-header\_\_toggle"_ . In the source, an invisible `<input type="checkbox">` CSS hack was used with an `<label class="site-header__toggle" aria-label="Toggle navigation menu">`.
- **Cause:** In standard HTML and ARIA specifications, the `<label>` element does not support `aria-label` because it has no recognized widget role. Furthermore, using a checkbox hack for disclosure navigation is an accessibility anti-pattern.
- **What I changed:** Completely refactored the mobile navigation across `index.html`, `shop.html`, `product-details.html`, and `care-tips.html`. Removed the checkbox input and `<label>`. Replaced them with native, semantic HTML elements: `<details class="site-header__menu">` and `<summary class="site-header__toggle">`, containing a screen-reader-only `<span class="site-header__toggle-label">Menu</span>` and the visual hamburger icon.
- **Why this fixes the cause, not just the symptom:** Native `<details>` and `<summary>` elements are built-in disclosure widgets. They are natively keyboard operable (`Enter` and `Space` toggle open/close), automatically expose their expanded/collapsed state to the accessibility tree without custom ARIA, and completely eliminate prohibited attributes and JavaScript dependencies.
- **How I verified it:** Re-ran Google Lighthouse Mobile audit; confirmed a 100% score with zero ARIA violations. Tested via keyboard (`Tab` and `Enter`/`Space`) and screen reader; confirmed proper announcement of "Menu, button, collapsed/expanded". Meets WCAG 4.1.2 (Name, Role, Value, Level A).

### Finding 6: Insufficient contrast on the "Back to Catalogue" button border

- **Reproduced before fixing:** Yes. On `product-details.html`, the `.product-detail__back` button had a faint border color (`#e5e7eb`) against a light background, yielding a contrast ratio of approximately 1.3:1, falling far below the required 3:1 ratio.
- **Cause:** The border styling used an excessively light grey tone that lacked sufficient luminance contrast against the white/cream card background.
- **What I changed:** In `css/components.css`, updated the border property of `.product-detail__back` to use `var(--color-text-secondary)` (`#4b5563`), which provides a contrast ratio above 4.5:1 against the background.
- **Why this fixes the cause, not just the symptom:** Updating the design token directly ensures the button perimeter has unambiguous visual demarcation under all display and lighting conditions.
- **How I verified it:** Measured the contrast ratio using Chrome DevTools Color Picker and WebAIM Contrast Checker; confirmed the border achieves a 4.6:1 contrast ratio against the background, exceeding the 3:1 requirement. Meets WCAG 1.4.11 (Non-text Contrast, Level AA).

## Issues I found myself

### Finding 1: Automatically changing hero carousel without a pause control

**Where**

Homepage, hero section containing the automatically rotating carousel.

**Principle and Criterion**

- **Operable:** WCAG 2.2.2, Pause, Stop, Hide (Level A).

Automatically moving content that meets the criterion's conditions must provide a mechanism for users to pause, stop or hide it.

**Who it Affects and How**

People with attention-related disabilities, including some autistic users, people with cognitive disabilities, and users who need additional time to read, may find automatically changing slides distracting. They may also struggle to finish reading a slide before it changes.

**How I Found It**

I manually observed the hero carousel on the homepage and noticed that its slides changed automatically without giving users control over the movement. I identified this as an accessibility concern because users could not decide when to stop or resume the carousel.

**How I Fixed It**

I added a pause/play control to the hero carousel, allowing users to stop automatic movement when they need more time to read and resume it when they are ready.

I implemented a button with an accessible name and a click handler to control the carousel's autoplay state.

### Finding 2: Navigation links are encountered in an incorrect order

The Contact button is encountered before the main navigation links during keyboard and screen-reader navigation.

**Where**

Homepage, main navigation bar containing Home, Shop, About, Plants and Contact.

**Principle and Criterion**

- **Operable:** WCAG 2.4.3, Focus Order (Level A).
- **Perceivable:** WCAG 1.3.2, Meaningful Sequence (Level A), where the reading sequence affects meaning.
- The focus order should preserve the meaning and operability of the page. The programmatic reading sequence should also reflect the intended content order.

**Who it Affects and How**

Keyboard users and people who use screen readers may become confused when the Contact button is encountered before the main navigation links. This interrupts the expected navigation sequence and makes it harder to understand and move through the website.

**How I Found It**

I manually tested the navigation bar using keyboard navigation and screen-reader reading order. I noticed that the Contact button was encountered before Home, Shop, About and Plants, rather than following the intended navigation sequence.

**How I Fixed It**

I corrected the navigation structure so that the links appear in a logical order in the HTML.

## Findings I did not fix, or disagree with

No findings were left unfixed and no findings were disagreed with. I rechecked all findings.

## Further improvement

### Dark mode for people with light sensitivity (photophobia) or migraines

### Who it Helps

This improvement is intended to support people who experience light sensitivity (photophobia), chronic migraines, visual fatigue or eye strain. It may also benefit people with certain visual conditions, such as cataracts, and visitors who simply find darker interfaces more comfortable.

### The Barrier They Faced

During my consideration of users beyond those identified in the original accessibility audit, I recognised that accessibility is not limited to whether someone can navigate a website or understand its content. It also involves whether they can comfortably spend time using it.

The website originally presented its content using a predominantly bright, white background. Although this design may be comfortable for many visitors, it may cause discomfort for people who are sensitive to bright screens. Prolonged exposure to a bright interface can contribute to glare, visual discomfort and eye fatigue for some users.

The important problem was that visitors had no alternative viewing option. Regardless of their visual needs or personal preferences, they were required to use the same bright interface. This could make reading product descriptions, exploring plant information or plant care and completing the contact form uncomfortable. In some cases, visitors might decide to leave rather than continue using a website that causes visual discomfort.

### What I Built

To address this gap, I implemented a manual dark mode toggle in the website header. This gives visitors control over the appearance of the website rather than forcing everyone to use one colour scheme.

With a single click or keyboard interaction, visitors can switch between the original light theme and a darker colour theme. The dark theme uses darker backgrounds and appropriately contrasting text and interface elements to maintain readability.

I also implemented theme persistence so that the website remembers the visitor's selected preference across visits. This means someone who prefers dark mode does not have to repeat the selection whenever they return to the website.

### Why This Improvement Is Worth Doing

I consider this improvement important because it addresses a different accessibility need from the problems identified in my original audit.

For example, correcting the navigation order helps someone who relies on a keyboard to move around the website. Adding a pause control helps visitors who need control over moving content. However, neither of these changes addresses the discomfort that a light-sensitive visitor may experience when looking at a bright screen.

Dark mode provides an alternative for this group. Instead of assuming that one visual presentation works for everybody, it allows visitors to choose the appearance that is more comfortable for them.

This also has practical value for Ama's Plant Corner. The website is intended to help customers explore plants, read product information and access plant-care advice. If a visitor experiences visual discomfort, they may struggle to complete these activities or abandon the website altogether. Providing an alternative theme removes one potential barrier and gives visitors more control over their experience. and also help make the website more welcoming to a wider range of customers, improve the comfort of browsing and potentially reduce departures caused by visual discomfort. M

### How I Tested It

I tested the improvement by switching between light and dark themes using both a mouse and a keyboard. I checked the appearance of different pages and interface components, including headings, paragraphs, buttons, forms and other content, to ensure that the theme change was applied consistently.

I also checked text readability and the contrast between text, backgrounds and interface elements in dark mode. Finally, I refreshed the website and revisited it to confirm that the selected theme was retained.

These checks helped me establish that the feature was not just a visual change but a usable alternative that visitors could activate and continue using across the website.
