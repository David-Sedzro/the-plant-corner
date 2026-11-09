# Page Architecture & Project Plan — Ama's Plant Corner

> **Module 1: Web & UI Essentials (EE-01)**  
> Strategic layout, UX decisions, and structural ordering for Ama's Plant Corner.

---

## 1. Client Context & Strategy

* **The Business:** Ama's Plant Corner, a neighbourhood plant shop at **14 Okaishie Lane, Accra**.
* **Target Audience:** First-time plant owners in Accra who feel intimidated by gardening and fear asking "stupid questions."
* **Context of Use:** Shoppers searching on mobile phones while out running errands nearby.
* **Core Goal:** Make the site feel like the physical shop—calm, welcoming, natural, and helpful—while making it effortless for walk-ins to check hours, find directions, or call.

---

## 2. Page Structure (7 Core Sections)

```
┌────────────────────────────────────────────────────────────────────────┐
│ 1. HEADER                                                              │
│    Logo • Home • Shop • About • Contact                                │
│    [Mobile: Hamburger Menu + Direct "Call" Button]                     │
├────────────────────────────────────────────────────────────────────────┤
│ 2. HERO BANNER                                                         │
│    Headline: "Welcome to Ama's Plant Corner!"                          │
│    Real Shop Photo Background                                          │
│    📍 Errand Line: "Open today until 6pm · 14 Okaishie Lane · Call"    │
│    CTAs: [ Explore Plants ]  [ Explore Care Tips ]                     │
├────────────────────────────────────────────────────────────────────────┤
│ 3. SHOP BY CATEGORY (3 Cards with starting prices)                     │
│    • Indoor Plants (From GH₵ 25)                                       │
│    • Outdoor Plants (From GH₵ 35)                                      │
│    • Accessories: Pots, Planters & Soil (From GH₵ 10)                  │
├────────────────────────────────────────────────────────────────────────┤
│ 4. ABOUT AMA                                                           │
│    Photo of Ama tending plants in the shop                             │
│    Authentic story: 5+ years experience, neighbourhood trust           │
├────────────────────────────────────────────────────────────────────────┤
│ 5. FAQ & PLANT CARE GUIDE (Native Expandable Accordions)               │
│    • Watering: How often should I water?                               │
│    • Sunlight: Indirect vs direct light                                │
│    • Soil & Repotting: Best potting mix for Accra                      │
│    • Common Problems: Yellow leaves, root rot, bugs                    │
│    • Shop FAQ: Hours, payments, walk-ins                               │
│    ─────────────────────────────────────────────────────────────────   │
│    Prompt at bottom: "Can't find your answer? Ask Ama ↓"               │
├────────────────────────────────────────────────────────────────────────┤
│ 6. CONTACT & "ASK AMA" (Unified Section)                               │
│    • Left: "Ask Ama" Form (Name, Phone/WhatsApp, Question)             │
│    • Right: 14 Okaishie Lane, Hours, Phone, WhatsApp Button, Map       │
├────────────────────────────────────────────────────────────────────────┤
│ 7. FOOTER                                                              │
│    Logo • Nav Links • Hours & Address • Social Links • Copyright       │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Section-by-Section Specifications

### Section 1: Header & Navigation
* **Desktop:** Logo (`Ama's Plant Corner`) + Horizontal navigation (`Home`, `Shop`, `About`, `Contact`).
* **Mobile:** Clean hamburger toggle on the left, Logo centered, and a direct **Call button (`tel:0244000000`)** on the right.
* **Why:** Errand-runners can call with one tap without digging through menus.

### Section 2: Hero Section
* **Headline:** Welcoming, botanical headline that sets an immediate calm tone.
* **Location & Hours Strip:** `Open today until 6:00pm · 14 Okaishie Lane · Call 0244 000 000`.
* **Two Action Buttons:**
  - `Explore Plants` (smooth scrolls to `#categories`)
  - `Explore Care Tips` (smooth scrolls to `#faq`)
* **Why:** Gives mobile visitors instant orientation and two clear paths.

### Section 3: Shop by Category
* Three clean category cards with starting prices:
  1. **Indoor Plants:** Low light, air purifying, beginner-friendly (Starting from GH₵ 25).
  2. **Outdoor Plants:** Balcony, patio, sun-loving tropicals (Starting from GH₵ 35).
  3. **Accessories:** Pots, planters, organic potting mix, trowels (Starting from GH₵ 10).
* **Why:** Simplifies inventory into 3 digestible cards. Pots and soil naturally fit under Accessories.

### Section 4: About Ama
* Photo of Ama in her shop with potted plants.
* Authentic story highlighting her 5+ years of experience helping Accra residents keep their plants alive.
* **Why:** Humanises the shop and builds personal trust before asking visitors to reach out.

### Section 5: FAQ & Plant Care Hub
* Merges plant care guidance and shop FAQ into native HTML5 `<details>/<summary>` accordions:
  - Watering schedules
  - Sunlight and placement
  - Soil mixes and repotting
  - Diagnosing common plant problems
  - Shop payment and visit info
* **Exit Prompt:** A friendly card at the end:  
  *"Can't find your answer? Ask Ama below and she'll help you out."*
* **Why:** Keeps the mobile page compact while proving Ama's knowledge.

### Section 6: Contact & "Ask Ama" (Unified)
* Consolidates the contact form and question form into a single, welcoming interaction:
  - Form fields: Name, Phone / WhatsApp, Question.
  - Submit button: `Send Question to Ama`.
* Beside the form:
  - Physical address: 14 Okaishie Lane, Accra.
  - Verified hours: Mon–Sat 8:00am – 6:00pm (Closed Sun).
  - Direct WhatsApp button for instant messaging.
  - Map / directions container.
* **Why:** Eliminates redundant forms and matches how people in Accra communicate (WhatsApp + direct calls).

### Section 7: Footer
* Brand logo, quick navigation links, address, verified hours, social links, and copyright.

---

## 4. Design Direction

* **Palette:**
  - Primary Forest: `#254B38`
  - Secondary Sage: `#8FA68E`
  - Warm Cream: `#F8F6EF`
  - Surface White: `#FFFFFF`
  - Charcoal Text: `#1A1A1A`
* **Typography:** **Poppins** (`400`, `600`, `700`) for a modern, friendly, accessible look.
* **Icons:** Inline **Lucide SVGs** (`phone`, `map-pin`, `clock`, `message-circle`, `menu`, `chevron-down`, `sprout`).
