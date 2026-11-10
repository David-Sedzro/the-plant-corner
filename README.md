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

| # | Issue and root cause | Evidence from the existing website | Reasoning and impact |
|---|---|---|---|
| 1 | **Fixed-width page layout:** Major page sections use fixed pixel widths instead of flexible dimensions. | `#header`, `#banner`, and `#content` use `width: 900px`. Their padding increases their total rendered width because the default box model is `content-box`. | The layout does not adapt properly to smaller screens. Customers using mobile phones may have to scroll horizontally or view a scaled-down page, making it harder to browse products and access important information. |
| 2 | **No mobile viewport configuration:** The HTML document does not define a viewport meta tag. | The `<head>` contains the character encoding and stylesheet link, but no `<meta name="viewport">`. | Without the viewport configuration, mobile browsers may use a wider virtual viewport and scale the page down. This can make text and interactive elements difficult to use on phones. |
| 3 | **Fixed-width two-column layout:** The main content and sidebar use floated elements with fixed dimensions. | `#main` uses `float: left; width: 610px`, while `#sidebar` uses `float: right; width: 240px`. | These dimensions do not provide a flexible way to reorganise the content on smaller screens. Customers may struggle to access the shop's contact information and other content conveniently. |
| 4 | **Small text in important content:** Several paragraphs and product descriptions use an 11px font size. | Inline styles such as `font-size: 11px` appear in the product introduction, About section, plant-care information, and sidebar. Product cards and the footer also use 11px text. | Small text can be difficult to read, particularly on mobile screens. This may discourage customers from reading product descriptions, care instructions, and business information. |
| 5 | **No responsive breakpoints:** The stylesheet does not contain media queries for adapting the layout to different screen sizes. | There are no `@media` rules in the supplied CSS. | The layout retains the same styling across different screen sizes. This limits its ability to adjust the navigation, product arrangement, and content sections for mobile users. |
| 6 | **Product images do not adapt to their containers:** Images have fixed rendered dimensions and no responsive image styling. | Product images use `width="180"` and `height="120"` in HTML. The CSS does not provide `max-width: 100%` or another responsive sizing rule. | Images cannot naturally adjust to narrower product layouts under the current styling. This may affect how products are displayed when the layout is adapted for smaller screens. |
| 7 | **Important business information is not directly actionable:** Contact details are presented as ordinary text. | The phone number is plain text rather than a `tel:` link. The address is not linked to a directions service. | A customer browsing on a phone cannot simply tap the phone number to call the shop or follow a directions link to find its location. This introduces unnecessary steps for people who want to visit or contact Ama. |

### Visual identity and consistency

| # | Issue and root cause | Evidence from the existing website | Reasoning and impact |
|---|---|---|---|
| 8 | **Inconsistent colour scheme:** The website uses several strong colours without a consistent visual system. | The header uses `#0066cc`, the banner uses `#009900`, the main button uses `#ff6600`, and the navigation hover state changes to red. | These colours compete for attention rather than creating a calm and welcoming appearance. The green links and orange button also have limited contrast with their white text or background combinations, which can affect readability. |
| 9 | **Generic typography:** The website uses a default Arial font throughout. | The body CSS specifies `font-family: Arial, sans-serif`. | Although readable, the typography does not contribute much to the natural and welcoming identity the client wants to communicate. A more considered typeface and typographic system would give the website a more consistent appearance. |
| 10 | **Weak heading hierarchy:** Section headings use the same heading level and styling. | The page uses `<h1>` for the banner heading, but `<h4>` for sections such as What We Sell, About Ama, Plant Care Tips, and Ask Ama. The CSS also styles all `h4` elements identically. | This creates a flat content hierarchy and does not clearly distinguish the major sections. It also makes the document heading structure less meaningful for assistive technologies. |
| 11 | **Inconsistent spacing:** Margins and padding are applied using unrelated values rather than a consistent spacing system. | The stylesheet contains values such as 4px, 5px, 8px, 10px, 12px, 15px, 20px, and 25px. | Without a consistent spacing scale, sections and elements can appear unevenly arranged. This affects the overall visual organisation and makes the design feel less polished. |

### Accessibility, content, and functionality

| # | Issue and root cause | Evidence from the existing website | Reasoning and impact |
|---|---|---|---|
| 12 | **Missing alternative text for product images:** Images use generic descriptions. | All three product images have `alt="image"`. | Screen-reader users cannot identify what the images represent. Descriptive alternative text would help communicate the products to customers who cannot see the images. |
| 13 | **Form inputs lack proper labels:** Placeholder text is used instead of explicit form labels. | Both forms contain inputs with placeholders such as “Your name,” “Email address,” and “Your message,” but no associated `<label>` elements. | Placeholder text disappears when users begin typing and does not provide the same reliable identification as a properly associated label. This can make the forms harder to understand and use, particularly with assistive technology. |
| 14 | **Unclear plant-care interaction:** The care topics look like ordinary text rather than clearly identifiable interactive controls. | The HTML uses `<div class="guide-trigger">` for topics and `<div class="guide-body">` for their content. The screenshot shows the care information displayed rather than collapsed behind an obvious control. | Visitors are told to click a topic, but the interface does not clearly communicate that the topics are interactive. This can create confusion and make the care guide less intuitive. |
| 15 | **Duplicated enquiry forms:** Two forms provide overlapping ways to contact Ama. | The page contains an Ask Ama form requesting a name and question, followed by a Get In Touch form requesting a name, email, phone number, and message. | Both forms appear to serve similar enquiry purposes. Having them separately may create uncertainty about which form customers should use. Their intended purposes should be clarified or combined where appropriate. |
| 16 | **Navigation links do not lead to their intended destinations.** | The navigation links, Shop Now button, and social media links use `href="#"`. | Visitors may expect these elements to take them to the relevant sections or external pages, but the supplied HTML does not provide those destinations. This makes navigation less useful and can prevent customers from finding the information they expect. |

# 3. Site Rebuild

The rebuild separates the shop overview, catalogue, product information, and care guidance so visitors can go directly to what they need, especially on mobile.

### Pages and navigation

- **Homepage — `index.html`:** Introduces the shop, links to product categories, shares information about Ama, provides plant-care FAQs, and offers a contact form.
- **Shop — `shop.html`:** Organises the catalogue into indoor plants, outdoor plants, pots and planters, and potting soil. Each listing links to its details.
- **Product details — `product-details.html`:** Provides a separate anchored section for each of the four catalogue listings and links back to the catalogue.
- **Plant care — `care-tips.html`:** Provides additional care guidance organised by plant type.

All pages use shared navigation and footer patterns. HTML landmarks (`<header>`, named `<nav>`, `<main>`, and `<footer>`) organize each page. The skip link jumps to `#main-content`; the header phone action uses a `tel:` link. The mobile menu uses a checkbox with a matching label, and CSS in `css/components.css` opens the navigation and changes the hamburger icon. Product detail links use URL fragments, with `.product-detail:target` showing the selected section; this keeps the experience JavaScript-free.

### Visual system and responsive layout

The shared design system lives in `css/tokens.css`, `css/layout.css`, and `css/components.css`:

- **Colour:** Forest green (`#254B38`), sage (`#8FA68E`), warm cream (`#F8F6EF`), white surfaces, and dark text establish a calm botanical palette.
- **Typography and spacing:** Poppins, a responsive heading scale, and reusable spacing tokens create consistent hierarchy and rhythm.
- **Responsive layout:** Shared containers and CSS media queries adapt navigation, category cards, product details, and forms to smaller and larger screens.
- **Reusable components:** Shared styles cover buttons, cards, forms, navigation, and focus states. Keyboard focus is indicated with `:focus-visible`.

# 4. Site Audit

The audit below prioritizes semantic structure and practical access for the shop’s main audience: first-time plant owners using phones. It is based on the current HTML and CSS; it is not a substitute for testing with assistive technology or across real devices.

### Semantic structure

The pages use HTML landmarks and descriptive headings to make content easier to navigate. Sections are associated with their headings using `aria-labelledby`. The care questions use native `<details>` and `<summary>` controls, and product facts use definition lists (`<dl>`, `<dt>`, and `<dd>`). 

### Accessibility priorities

- **Navigation and keyboard access:** The skip link, named navigation landmarks, associated menu checkbox and label, and `:focus-visible` styles support keyboard navigation. The direct-call link uses `tel:` so mobile visitors can call with one tap.
- **Images and controls:** Images have descriptive `alt` text. The homepage contact form uses explicit labels and suitable `type="tel"` and `type="email"` fields with unique IDs and autocomplete values.
- **Readable, responsive presentation:** The shared type and spacing tokens, contrast-conscious palette, and responsive CSS aim to keep content usable across screen sizes. Contrast and layout still need manual browser checks at small viewport widths and keyboard-only checks.



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
