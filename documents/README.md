# Rental E-Commerce Website Documentation

This repository contains the detailed documentation and implementation notes for the **Rental E-Commerce Website** project. It includes system design, API integrations, schema definitions, and feature implementation details.

## Table of Contents
- [Project Overview](#project-overview)
- [System Design](#system-design)
- [APIs and Endpoints](#apis-and-endpoints)
- [Schemas](#schemas)
- [Features](#features)
- [Data Integration and Challenges](#data-integration-and-challenges)
- [Testing](#testing)
- [Technologies Used](#technologies-used)

---

## Project Overview

This project is a dynamic rental e-commerce website where users can:
1. **Sign In** using Google through NextAuth, with data stored in Sanity.
2. **Choose Cars**: Select a car, view specifications, and fill out rental forms validated by Zod.
3. **Submit Booking**: Data is saved in Sanity, and shipment labels are generated via ShipEngine.
4. **Track Booking**: View real-time tracking and payment status.
5. **Receive Delivery**: Cars are delivered to specified drop-off locations on the agreed dates.

---

## System Design

### **Frontend**
- Built with **Next.js** (App Router), **TypeScript**, **TailwindCSS**, and **Zod** for validation.

### **Backend**
- Responsible for authentication, car search, booking, shipment tracking, and data management.

### **Database**
- **Sanity** is used to store user, car, reservation, payment, and shipment data.

### **APIs**
- **Sanity API** for CMS integration.
- **ShipEngine API** for shipment and tracking.
- **Stripe API** for payment processing.
- **Next.js API** routes for backend functionality.

### **Data Flow**
Data flows through the system via REST APIs, handling:
- User authentication.
- Car data fetching and filtering.
- Booking creation and management.
- Payment processing.
- Shipment tracking.

---

## APIs and Endpoints

### **Authentication**
- **Endpoint**: `/api/auth/signin/google`
- **Method**: `GET`
- **Purpose**: Initiates OAuth for Google Sign-In.

### **Fetching Cars**
- **Endpoint**: `/api/cars`
- **Method**: `GET`
- **Parameters**: 
  - `limit` (optional): Fetch limited results.
  - `slug` (optional): Fetch car details by slug.

### **Booking**
- **Endpoint**: `/api/new-booking`
- **Method**: `POST`
- **Purpose**: Saves user, car, payment, and rental data in Sanity.

### **Payment**
- **Endpoint**: `/api/payment`
- **Method**: `POST`
- **Purpose**: Processes payments via Stripe.

### **Shipment**
- **Endpoint**: `/api/shipment`
- **Method**: `POST`
- **Purpose**: Initiates car shipment and returns tracking data.

---

## Schemas

### **User Schema**
Defines fields like `name`, `email`, `image`, and `phone` for user data.

### **Car Schema**
Captures car details, including:
- Name, type, availability, price, slug, and specifications.
- Supports arrays for images and other details for dynamic pages.

### **Booking Schema**
Stores reservation data:
- User and car references, drop-off location, rental dates, and total price.

### **Payment Schema**
Tracks payment details:
- Booking reference, amount, status, method, and payment date.

---

## Features

### **User-Facing Features**
- **Car Listings**: Dynamic car fetching and rendering.
- **Car Filters**: Filter by type, capacity, and more.
- **Search**: Search cars by name, type, and specifications.
- **Favorite Cars**: Save and view hearted cars.
- **User Profile**: Display user information and booking history.

### **Booking Workflow**
1. User selects a car and fills out the rental form.
2. Form data is validated and submitted.
3. A booking is created, and the user is redirected to the booking page.

### **Admin Features**
- Manage car inventory, reservations, and payments.

---

## Data Integration and Challenges

### **API Customization**
- Adjusted APIs for specific project needs, including custom fields like `slug`, `heart`, and `availability`.

### **Data Migration**
- Used a modified migration script to populate Sanity with car data.

### **Challenges**
- Handling environment variables during API integration.
- Managing custom fields and SEO-friendly URLs using slugs.

---

## Testing

Thorough testing was performed, including:
1. **UI/UX Testing**: Ensured responsiveness and fallback handling using `&&`, `?:`, and `||` operators.
2. **API Testing**: Validated all endpoints with sample requests.
3. **Error Handling**: Wrapped API fetches in `try-catch` blocks to handle errors gracefully.

Testing reports are documented in **`Testing Reports.csv`**.

---

## Technologies Used

- **Frontend**: Next.js, TailwindCSS, TypeScript, Zod.
- **Backend**: Next.js Server, NextAuth, Node.js, ShipEngine, Stripe.
- **Database**: Sanity.
- **APIs**: Sanity API, ShipEngine API, Stripe API.

---

## Screenshots

- **Sanity CMS with Data**: Populated with user and car data.
- **Dynamic Pages**: Car listings and detail pages.
- **API Responses**: Demonstrated with JSON responses for `/api/cars`.

---

## Future Enhancements

- Add multi-language support.
- Create admin page for the the admin tasks
- Fix some layout alignments

---

