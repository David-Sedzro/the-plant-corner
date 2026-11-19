# EE02 write-up: fixes and further improvement

- My site: [\[GitHub Pages link\]](https://david-sedzro.github.io/the-plant-corner/index.html)
- Audit received from: Alvin Etornam Laryea, [\[link to their audit\]](https://amalitech-workspace.slack.com/archives/D0CEDH85Z5M/p1795041161185859)

## Fixes

### Finding [number from the audit]: [title]

- Reproduced before fixing: [yes / no, and what I saw]
- Cause: [what in the code caused it]
- What I changed: [files and a short description]
- Why this fixes the cause, not just the symptom: [...]
- How I verified it: [keyboard / screen reader / zoom / tool, and the result]

## Issues I found myself

## Finding 1: Automatically changing hero carousel without a pause control

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

## Finding 2: Navigation links are encountered in an incorrect order

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

[Which, and why.]

## Further improvement

- Who it helps: Visitors who prefer a darker interface, including people browsing in dimly lit environments or who find bright pages uncomfortable.
- The barrier they faced: The site previously offered only a light palette, which could feel too bright in some settings. This is a comfort and preference improvement, not a claim that dark mode benefits every person with low vision.
- What I built: I added a dark-mode control across the site, with a palette based on shared colour tokens. It follows the visitor's operating-system preference until they choose a theme, then saves that choice across pages. The control is a labelled button with an `aria-pressed` state and a visible keyboard focus indicator; its moon and sun icons change with the selected theme.
- Why it is worth doing for the business: A more comfortable browsing option can make the shop easier to use in different environments and lets visitors choose the presentation that works for them. This may reduce friction while browsing products and care information.
- How I tested it: I checked system light and dark preferences, keyboard and pointer toggling, the button's pressed state, and saved preferences across pages. At 320px, the logo and Contact, theme, and menu controls stay on one row with 44px targets; I also checked for horizontal overflow at viewport widths from 320px to 1440px. Measured dark-theme contrast included 16.06:1 for body text, 9.21:1 for links on surfaces, and 3.05:1 for borders.
