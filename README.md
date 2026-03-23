# Muse & Medium Art Gallery

A professional, responsive, and accessible multi-page web platform designed to showcase a fusion of traditional and digital artwork. This project demonstrates mastery of modern web development principles, including semantic HTML5, advanced CSS layouts, client-side interactivity, and rigorous accessibility standards.

**Author:** Shao En Hung (Aden)

## 🚀 Setup & Execution Instructions

This project is built using a Static/Progressive Enhancement approach (Vanilla HTML, CSS, JavaScript) and does not require a complex build step or Node.js environment.

1. **Clone or Extract the Project:** Download the project files to your local machine.
2. **Launch the Application:**
   - **Method A (Easiest):** Simply double-click `index.html` to open it in any modern web browser.
   - **Method B (Recommended):** Use a local server extension like VS Code's "Live Server" for the best experience. Right-click `index.html` and select "Open with Live Server".
3. **Run Automated Tests:** Navigate to `tests.html` in your browser to view the results of the custom-built frontend unit tests.

## ✨ Features Implemented

- **Multi-Page Architecture:** Includes Home, Gallery, About, FAQ, and Contact pages with a consistent, sticky navigation header.
- **Advanced CSS Layouts:** Utilizes a combination of CSS Grid (for the artwork catalog) and Flexbox (for navigation and component alignment) to ensure a fluid layout across all devices.
- **Interactive Art Gallery:** - **Debounced Search:** Users can search artworks by title or medium. The input is debounced (300ms) to optimize performance.
  - **Category Filtering:** Dynamic filtering to seamlessly switch between Oil, Digital, and Watercolor works.
  - **Modal Lightbox:** A custom-built, fully accessible modal for viewing artwork details.
- **Dynamic Form Validation:** The Contact form includes real-time JavaScript validation for email formatting and dynamically renders a success message upon submission without page reload.
- **Progressive Enhancement:** Core content remains accessible even if JavaScript is disabled or fails to load.

## ♿ Accessibility (a11y) Considerations

This project strictly adheres to WCAG (Web Content Accessibility Guidelines) POUR principles:

- **Semantic HTML & Landmarks:** Proper use of `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>` to establish a clear document outline.
- **Skip Navigation:** Implemented a `.skip-link` allowing keyboard and screen-reader users to bypass the navigation and jump straight to the main content.
- **Keyboard Navigation:** - Visible focus indicators (`focus-visible`) are applied to all interactive elements.
  - Artwork cards in the gallery are focusable (`tabindex="0"`) and can trigger the modal using the `Enter` key.
  - The Modal traps focus conceptually and returns focus to the trigger element when closed (or allows easy exit via the `Escape` key).
- **ARIA Attributes:** Utilized `aria-current="page"` for active navigation, `aria-expanded` for FAQ accordions, `aria-hidden` for modal states, and `aria-live="polite"` for form success announcements.

## ⚡ Performance Optimizations

- **Responsive Imagery:** All artwork images utilize the `srcset` and `sizes` attributes to serve appropriately scaled images based on the user's viewport, drastically saving bandwidth on mobile devices.
- **Lazy Loading:** Native `loading="lazy"` is applied to images below the fold to improve initial page load speed.
- **Debounced Event Listeners:** Search input events are throttled/debounced to prevent excessive DOM reflows and function calls during typing.

## 🧪 Testing

A lightweight, zero-dependency testing framework was implemented to verify core business logic.
- **Location:** `tests.html` / `tests.js`
- **Coverage:** Includes 5 unit tests validating data integrity, filtering logic, search functionality, and email format validation.

## 🖨️ Print Stylesheet

Includes a `@media print` query to ensure the website is printer-friendly. It strips away navigation, search bars, and modals, formatting the art grid specifically for physical paper output (`page-break-inside: avoid`).