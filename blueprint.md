
# Lotto Number Generator

## Overview

A modern, simple Lotto Number Generator web application with interactive features and theme support. This project generates 6 unique random lottery numbers between 1 and 45, styled by range, and allows the user to switch between Light and Dark modes.

## Features

- **Random Number Generation:** Generates 6 unique numbers from 1 to 45.
- **Sorting:** Numbers are displayed in ascending order.
- **Color Coding:** Numbers are colored based on their range (1-10, 11-20, etc.).
- **Theme Toggle:** Supports Dark Mode and Light Mode with persistence using `localStorage`.
- **Responsive Design:** Works on various screen sizes.
- **Clean UI:** Professional layout with smooth transitions.

## Current Plan & Implementation

### Step 1: HTML Structure (`index.html`)

*   Set the title to "Lotto Number Generator".
*   Create a main container for the application.
*   Add a heading for the title.
*   Add a theme toggle button (🌙/☀️).
*   Add a container to display the generated lottery numbers.
*   Add a button to trigger the number generation.

### Step 2: Styling (`style.css`)

*   Apply a clean and modern design using CSS variables for theming.
*   Define a dark theme state (`[data-theme="dark"]`) for colors, backgrounds, and shadows.
*   Style the main container, title, number display area, and the "Generate" button.
*   Use a color-coded system to display the lottery numbers based on their value ranges.

### Step 3: JavaScript Logic (`main.js`)

*   Implement a function to generate 6 unique random numbers from 1 to 45.
*   Attach an event listener to the "Generate" button to refresh numbers.
*   Implement theme switching logic that toggles a data attribute on the `<html>` element.
*   Persist the user's theme preference in `localStorage`.
*   Initialize the page with the saved theme and a fresh set of numbers.
