# MORENT - Way to Rent Cars

Welcome to the **Morent Car Rental Website**, a dynamic and user-friendly platform developed as part of a hackathon project. This repository includes all the code, tests, and documentation for building and deploying a car rental website.

## Project Overview

The **Morent Car Rental Website** is a fully responsive rental marketplace that allows users to:

- **Browse a collection of cars** dynamically fetched from Sanity.
- **Search and filter cars** by name, type, or capacity.
- **Book cars online**, with all booking data stored in Sanity.
- **View car details dynamically**, powered by Next.js App Router.

The platform focuses on providing a seamless user experience and implements efficient data handling via APIs.

---

## Key Features

### 1. User Authentication
- Google Sign-In using **NextAuth**.
- User data securely stored in **Sanity**.

### 2. Dynamic Car Listings
- Cars are fetched dynamically from **Sanity**.
- Pagination and "Show More" functionality for optimized performance.

### 3. Advanced Search & Filters
- Search by car name, type, or capacity.
- Category filters for quick browsing.

### 4. Booking Process
- Zod-powered form validation.
- User, rental, and booking data saved to **Sanity**.
- Dynamic car details page using **slug-based routing**.

### 5. Responsive Design
- Fully responsive design, tested for mobile, tablet, and desktop views.
- Smooth user experience across multiple browsers.

---

## Technologies Used

### Frontend
- **Next.js 15** with App Router
- **TailwindCSS** for styling
- **TypeScript** for type safety
- **Zod** for form validation

### Backend
- **Sanity** for data storage
- **Next.js API Routes** for backend logic

### Tools
- **VSCode**, **GitHub**, **ExcelDraw**

---

## File Structure

- `/api`: API routes for authentication, car fetching, and booking management.
- `/components`: Reusable components for the UI (e.g., CarCard, SearchBar, UserProfile).
- `/pages`: Dynamic pages such as `Car Details`, `Bookings`, and `Favorites`.
- `/styles`: TailwindCSS configurations and global styles.

---

## Testing & Quality Assurance

**Test Cases**: Comprehensive tests were conducted to ensure functionality, UI consistency, and API error handling.  
View the detailed test cases in [Test Cases CSV](https://github.com/DanielHashmi/Car-Rent-Website/blob/main/Documentation/Testing%20Report's%20Image%20in%20Excel.png).

### Sample Test Case:
| Test Case ID | Description                            | Status  | Severity |
|--------------|----------------------------------------|---------|----------|
| TC001        | Verify car listings load from Sanity API | Passed  | High     |

### Tools:
- Chrome Lighthouse (Performance Score: **98**)
- Cross-browser compatibility tests (Chrome, Firefox, Edge, Opera)
