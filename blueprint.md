
# Lotto Number Generator (Toss Style)

## Overview

A premium Lotto Number Generator inspired by the Toss UI. It generates 5 sets of unique lottery numbers, each including a bonus number marked with a `+` sign and distinct coloring. The application supports Light and Dark modes with a clean, modern interface and includes a partnership inquiry form and a community comment section.

## Features

- **Multi-Set Generation:** Generates 5 sets of numbers simultaneously.
- **Bonus Number:** Each set includes a 7th bonus number with a `+` prefix.
- **Toss UI Aesthetic:** 
  - Clean typography and card-based layout.
  - Subtle shadows and rounded corners (24px).
  - Responsive design with adaptive layouts for mobile.
- **Color-Coded Numbers:** Main numbers colored by range; bonus numbers colored in red.
- **Persistent Theme Toggle:** Independent button in the top-right corner to switch between Light and Dark modes.
- **Partnership Inquiry Form:** Integrated Formspree form for business inquiries.
- **Comment System:** Integrated Disqus for community feedback and discussion.
- **Google AdSense:** Monetization via Google AdSense with account verification and `ads.txt`.
- **Advanced SEO & Quality Optimization (AdSense Pass Focus):**
    - Semantic Navigation & Footer.
    - Detailed Educational Content (Lottery Odds, AI Technology History).
    - Mandatory Legal Pages (Privacy Policy with Cookie Clause, Terms of Service).
    - SEO Assets: `robots.txt`, `sitemap.xml`.
    - Rich Meta Tags (Open Graph, Description, Keywords).
    - Accessibility (ARIA labels, semantic HTML).

## Implementation Details

### UI/UX (Toss Style)
- **Backgrounds:** Light gray (`#f2f4f6`) for light mode, deep dark (`#101012`) for dark mode.
- **Cards:** White or dark gray containers with 24px padding and 24px border-radius.
- **Typography:** Uses system sans-serif fonts for a native look.
- **Partnership Form:** Clean input fields with 12px border-radius and focus states that match the brand blue.
- **Comment Section:** Positioned at the bottom with a clear visual hierarchy.

### Logic & Integration
- **`generateLottoSet`**: Generates 6 unique sorted numbers + 1 unique bonus number.
- **Formspree Integration**: Submits inquiry data to `https://formspree.io/f/xvzbqnrq`.
- **Disqus Integration**: Loads the Disqus universal code via `https://productowner-1.disqus.com/embed.js`.
- **Google AdSense Integration**: 
    - Loads `adsbygoogle.js` with client ID `ca-pub-5417675697574913`.
    - Includes account verification meta tag.
    - `ads.txt` configured with `google.com, pub-5417675697574913, DIRECT, f08c47fec0942fa0`.

## Current Task: Advanced AdSense & SEO Optimization
1.  **Content Expansion:** Add a "Deep Dive" section with 2 long-form articles (Lottery Probability and AI Face Tech) to ensure high textual value.
2.  **Privacy Policy Update:** Ensure the Privacy Policy explicitly mentions Google AdSense and Third-Party Cookies.
3.  **SEO Files:** Create `robots.txt` and `sitemap.xml`.
4.  **Meta Enhancement:** Add Open Graph meta tags for better social sharing preview.
5.  **A11Y Improvement:** Add ARIA labels to buttons and links.
