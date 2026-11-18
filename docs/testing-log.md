# Design Decisions

Documentation of design tokens, layout rules, and typography.

Visual accessibility

The page stretches on large screens.

There is a large gap at the top of the Hero section on the homepage. This pushes the main content toward the bottom left of the Hero section, where it is almost out of view.

On the form, there is no initial indication of which fields are compulsory. The required-field popup only appears after an attempt to submit.

Contrast

Most of the text in the Hero section has very low contrast (1.14:1).
There is very low contrast between the text and background colors.

The "Plan Your Visit" button in the Hero section has very low contrast (3.49:1).
There is very low contrast between the text and background colors.

Utility

Most of the buttons and links are broken and lead to the same page.
What It Means
A link to another location within the page is present, but it does not have a corresponding target.
Why It Matters
A link that jumps to another position within the page assists users in navigating the web page, but only if the link target exists.
What To Do
Ensure that the target for the link exists or remove the same-page link.

The hamburger menu is present but not functioning yet.

The buttons in the "What We Sell" section have very low contrast (2.98:1).
There is very low contrast between the text and background colors.

On the footer, there is a button without a description. It does not describe whether the visitor is subscribing or not; it is only an email input with an arrow button.

Structure

All the heading structures are used properly.

<div class="shop-art" aria-hidden="true">
Null or empty alternative text:
<img src="assets/images/hangingplant.png" alt="">
</div>

Alternative text
The image alternative text is present, but it does not describe exactly what the image shows. It simply states:

<div class="about-portrait">
Alternative text
<img src="assets/images/ama-portrait.png" alt="Portrait placeholder for Ama" loading="lazy">
<span class="portrait-note">
Plant person
<br>
