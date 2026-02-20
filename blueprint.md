
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
- **Multi-Language Support:** Supports KO, EN, ES, FR, ZH, JA via a dynamic i18n system.
- **K-Food Guide:** A curated guide to popular Korean foods with top-rated restaurant recommendations (Google Maps based) for global visitors.

## Implementation Details

### UI/UX (Toss Style)
- **Backgrounds:** Light gray (`#f2f4f6`) for light mode, deep dark (`#101012`) for dark mode.
- **Cards:** White or dark gray containers with 24px padding and 24px border-radius.
- **Typography:** Uses system sans-serif fonts for a native look.
- **Food Section:** Card-based horizontal scroll or grid showing food images, descriptions, and top 2 restaurant links.

### Logic & Integration
- **`generateLottoSet`**: Generates 6 unique sorted numbers + 1 unique bonus number.
- **i18n System**: Centralized `translations.js` with `data-i18n` DOM mapping.
- **Google Maps Integration**: Direct outbound links to verified top-rated restaurants.

## Current Task: K-Food Section Implementation
1.  **Navigation**: Add "K-Food" to the header.
2.  **Content Selection**: 
    - Bibimbap: Mokmyeok Sanbang, Gogung.
    - K-BBQ: Geumdwaeji Sikdang, Maple Tree House.
    - Fried Chicken: Kyochon (Hongdae), BHC (Myeongdong).
3.  **UI Development**: Create a visually appealing food guide section with restaurant cards.
4.  **i18n Update**: Translate food names, descriptions, and restaurant info into all 6 languages.
