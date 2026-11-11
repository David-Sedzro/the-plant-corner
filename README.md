# Ama's Plant Corner

A responsive website for Ama's neighbourhood plant shop at 14 Okaishie Lane, Accra, Ghana. The site helps visitors explore plants and accessories, find practical plant-care advice, and contact or locate the shop.

## 1. Planning

### Page sketch

[View the page sketch in Figma](https://www.figma.com/design/GGDLAYadqjGMbkU1E5HfmW/Untitled?node-id=0-1&t=iRG1Y63gJnnD8GY5-1)

### Why the page is ordered this way

The header and welcoming hero identify the shop and give visitors clear next steps. Product categories follow so nearby shoppers can quickly browse what Ama sells. The About section introduces Ama and supports trust, while the homepage FAQ offers immediate help to first-time plant owners. The contact section provides a way to ask a question, and the footer keeps secondary navigation, location, hours, phone, and directions available.

The main page also links to separate catalogue, product-details, and plant-care pages. This lets visitors go directly to more detailed information without putting every product and care instruction on the homepage, which is especially useful on mobile.

## 2. Site Diagnosis

Before beginning the redesign, I examined the existing website's HTML structure, CSS styles and rendered appearance to identify issues affecting its usability, accessibility and visual presentation. The investigation focused on the two main concerns raised by the client: difficulty reading and navigating the website on mobile devices, and an appearance that does not communicate the calm, welcoming and knowledgeable identity of the business.

### Mobile usability and local access

| # | Issue and root cause | Evidence from the original website | Impact on Ama's customers |
|---|---|---|---|
| 1 | **Fixed-width layout and columns:** The page uses fixed dimensions instead of layouts that can shrink or reflow. | `#header`, `#banner`, and `#content` use `width: 900px`; `#main` is 610px and `#sidebar` is 240px wide. | On a phone, customers may need to scroll sideways to read the page or reach shop contact details. |
| 2 | **No mobile viewport configuration:** The document does not define a viewport meta tag. | The `<head>` has no `<meta name="viewport">`. | A phone may render the page at a wider virtual width and scale it down, making product information and links too small to read or tap comfortably. |
| 3 | **Small text in important content:** Product descriptions and other key text use an 11px font size. | Inline `font-size: 11px` styles appear in the product introduction, About section, plant-care information, and sidebar. Product cards and the footer also use 11px text. | Customers reading product details, care advice, or shop information on a phone may have difficulty without zooming in. |
| 4 | **No responsive breakpoints:** The stylesheet does not adapt the layout to different screen sizes. | The supplied CSS contains no `@media` rules. | The navigation and product listings stay rigid on small screens, making it harder for mobile shoppers to browse the catalogue. |
| 5 | **Product images do not adapt to their containers:** Images have fixed dimensions and no responsive sizing rules. | Product images use `width="180"` and `height="120"` in the HTML, with no CSS such as `max-width: 100%`. | On narrow screens, product images may not fit their listing areas, disrupting the layout and making items harder to compare. |
| 6 | **Referenced product image files are missing:** The original project does not include the image assets referenced by the page. | `index.html` references `images/houseplants.jpg`, `images/pots.jpg`, and `images/soil.jpg`, but the original project has no `images` folder. | Customers cannot see the houseplants, pots, or soil being offered, leaving them with less information when deciding what to ask Ama about or whether to visit. |

### Visual identity and consistency

| # | Issue and root cause | Evidence from the original website | Impact on Ama's customers |
|---|---|---|---|
| 7 | **Inconsistent colour scheme:** The site uses several strong colours without a unified visual system. | The header uses `#0066cc`, the banner `#009900`, the main button `#ff6600`, and hover states turn red. | The competing colours make pages and calls to action feel inconsistent, rather than supporting the calm, welcoming experience Ama wants customers to associate with her plant shop. |
| 8 | **Weak heading hierarchy:** Section headings use inconsistent semantic levels and identical styling. | The page moves from `<h1>` to `<h4>` for sections such as “What We Sell” and “About Ama”; the CSS styles the `<h4>` headings alike. | Customers scanning the page may have difficulty distinguishing sections. The skipped heading levels also make section navigation less clear for screen-reader users. |
| 9 | **Inconsistent spacing:** Margins and padding use unrelated values rather than a consistent spacing scale. | The CSS uses values such as 4px, 5px, 8px, 10px, 12px, 15px, 20px, and 25px. | Uneven spacing can make product listings, care advice, and contact information harder for customers to scan as connected sections. |

### Accessibility, content, and functionality

| # | Issue and root cause | Evidence from the original website | Impact on Ama's customers |
|---|---|---|---|
| 10 | **Missing useful alternative text:** Product images have generic alt text. | All three product images use `alt="image"`. | Screen-reader users cannot tell whether an image represents houseplants, pots, or soil, so they miss product information available to sighted customers. |
| 11 | **Form inputs lack proper labels:** The forms rely on placeholders instead of associated `<label>` elements. | Inputs use placeholders such as “Your name” and “Email address” without matching labels. | Placeholder instructions disappear as customers type, and assistive technology may not have a reliable field name to announce while they complete an enquiry. |
| 12 | **Plant-care topics are not implemented as clear controls:** The topics are ordinary elements rather than accessible disclosure controls. | The original page uses `<div class="guide-trigger">` and `<div class="guide-body">`; the care content is displayed rather than controlled by a semantic interactive element. | Customers may not know how to open or close a topic, and keyboard users may not be able to operate it to find Ama's care advice. |
| 13 | **Duplicated enquiry forms:** Two forms offer overlapping ways to contact Ama. | The page has an “Ask Ama” form for a name and question, followed by a “Get In Touch” form for a name, email, phone, and message. | Customers may be unsure which form to use, while Ama's enquiries may be split between two similar contact routes. |
| 14 | **Navigation and social links do not lead to their intended destinations.** | The menu, “Shop Now,” Facebook, and Instagram links use `href="#"`. | Customers cannot use these links to reach the catalogue or Ama's social media; the links remain on the current page instead of taking them to the intended destination. |
| 15 | **Neither enquiry form submits or provides a result.** | Both buttons use `type="button"`, and `script.js` contains no form-handling code. | When a customer selects “Send Question” or “Send Message,” no enquiry is sent and no confirmation appears, leaving them unsure whether Ama received it. |



# 3. Site Rebuild

The rebuild separates the shop overview, catalogue, product information, and care guidance so visitors can go directly to what they need, especially on mobile.

### Pages and navigation

- **Homepage — `index.html`:** Introduces the shop, links to product categories, shares information about Ama, provides plant-care FAQs, and offers a contact form.
- **Shop — `shop.html`:** Organises the catalogue into indoor plants, outdoor plants, pots and planters, and potting soil (accessories). Each listing links to its details.
- **Product details — `product-details.html`:** Provides a separate anchored section for each of the four catalogue listings and links back to the catalogue.
- **Plant care — `care-tips.html`:** Provides additional care guidance organised by plant type.

All pages use shared navigation and footer patterns. HTML landmarks (`<header>`, named `<nav>`, `<main>`, and `<footer>`) organize each page. The header phone action uses a `tel:` link.

### Visual system and responsive layout

The shared design system lives in `css/tokens.css`, `css/layout.css`, and `css/components.css`:

- **Colour:** Forest green (`#254B38`), sage (`#8FA68E`), warm cream (`#F8F6EF`), white surfaces, and dark text.
- **Typography and spacing:** Poppins, a responsive heading scale, and reusable spacing tokens create consistent hierarchy and rhythm.
- **Responsive layout:** Shared containers and CSS media queries adapt navigation, category cards, product details, and forms to smaller and larger screens.
- **Reusable components:** Shared styles cover buttons, cards, forms, navigation.

# 4. Site Audit

The audit below prioritizes semantic structure and practical access for the shop’s main audience or customers using phones.

### Semantic structure

The pages use HTML landmarks and descriptive headings to make content easier to navigate. Sections are associated with their headings using `aria-labelledby`. The care questions use native `<details>` and `<summary>` controls, and product facts use definition lists (`<dl>`, `<dt>`, and `<dd>`).

### Accessibility priorities

- **Images and controls:** Images have descriptive `alt` text. The homepage contact form uses explicit labels and suitable `type="tel"` and `type="email"` fields with unique IDs and autocomplete values.
- **Readable, responsive presentation:** Shared type and spacing tokens, the colour palette, and responsive CSS aim to keep content usable across screen sizes. Contrast and layout still need manual checks at small viewport widths.
- **Keyboard focus:** The skip link and custom `:focus-visible` styles are currently omitted by design and remain future accessibility work. Keyboard navigation should be tested, and visible focus styling should be restored before the site is presented as fully keyboard-accessible.

### Current functional limitations

- **Contact form:** The homepage form has labelled, required fields and uses the browser's built-in validation, but it has no configured submission endpoint or form handler. It does not currently deliver enquiries to Ama or show a success confirmation.
- **Shop controls:** Product category links jump to catalogue items. The price range and sort control are visual placeholders; they do not filter or reorder products.
- **JavaScript:** `js/script.js` is currently a placeholder. The navigation and care disclosures use CSS and native `<details>`/`<summary>` behavior instead.

# 5. Additional Improvement

## Frequently Asked Questions (FAQ) Section

As an additional improvement, I introduced a Frequently Asked Questions section using accordions.

The purpose of this feature is to help visitors, particularly first-time plant owners, find answers to common questions without having to contact Ama for every enquiry. Visitors can expand a question to read its answer and close it when they are finished.

This makes useful information easier to access, and may reduce the number of repetitive questions Ama has to answer. It also gives customers a convenient way to obtain basic information before deciding to visit or contact the shop.

## Project Structure

```text
amas-plant-corner/
|-- index.html
|-- shop.html
|-- product-details.html
|-- care-tips.html
|-- css/
|   |-- styles.css
|   |-- tokens.css
|   |-- layout.css
|   `-- components.css
|-- js/
|   `-- script.js
`-- images/
    |-- products/
    |-- hero/
    `-- about/
```
