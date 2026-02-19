
# Lotto Number Generator (Toss Style)

## Overview

A premium Lotto Number Generator inspired by the Toss UI. It generates 5 sets of unique lottery numbers, each including a bonus number marked with a `+` sign and distinct coloring. The application supports Light and Dark modes with a clean, modern interface and includes a partnership inquiry form.

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

## Implementation Details

### UI/UX (Toss Style)
- **Backgrounds:** Light gray (`#f2f4f6`) for light mode, deep dark (`#101012`) for dark mode.
- **Cards:** White or dark gray containers with 24px padding and 24px border-radius.
- **Typography:** Uses system sans-serif fonts for a native look.
- **Partnership Form:** Clean input fields with 12px border-radius and focus states that match the brand blue.

### Logic & Integration
- **`generateLottoSet`**: Generates 6 unique sorted numbers + 1 unique bonus number.
- **Formspree Integration**: Submits inquiry data to `https://formspree.io/f/xvzbqnrq`.
