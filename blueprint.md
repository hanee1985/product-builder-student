
# Lotto Number Generator (Toss Style)

## Overview

A premium Lotto Number Generator inspired by the Toss UI. It generates 5 sets of unique lottery numbers, each including a bonus number marked with a `+` sign and distinct coloring. The application supports Light and Dark modes with a clean, modern interface.

## Features

- **Multi-Set Generation:** Generates 5 sets of numbers simultaneously.
- **Bonus Number:** Each set includes a 7th bonus number with a `+` prefix.
- **Toss UI Aesthetic:** 
  - Clean typography and card-based layout.
  - Subtle shadows and rounded corners (24px).
  - Responsive design with adaptive layouts for mobile.
- **Color-Coded Numbers:** Main numbers colored by range; bonus numbers colored in red.
- **Persistent Theme Toggle:** Independent button in the top-right corner to switch between Light and Dark modes.

## Implementation Details

### UI/UX (Toss Style)
- **Backgrounds:** Light gray (`#f2f4f6`) for light mode, deep dark (`#101012`) for dark mode.
- **Cards:** White or dark gray containers with 24px padding and 24px border-radius.
- **Typography:** Uses system sans-serif fonts (Apple SD Gothic Neo, etc.) for a native look.
- **Buttons:** Bold blue (`#0064ff`) buttons with smooth hover and active states.

### Logic Improvements
- **`generateLottoSet`**: Generates 6 unique sorted numbers + 1 unique bonus number.
- **`renderLottoSets`**: Clears the container and loops 5 times to create rows.
- **Row Structure**: Split into `numbers-group` and `bonus-group` for visual separation.
