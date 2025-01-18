# APIEndpoints

## Authentication
**Endpoint**: /api/auth/signin/google

**Method**: GET

**Purpose**: Initiates the OAuth flow for Google Sign-In

**Flow**: Redirects the user to Google's OAuth authorization endpoint.
After successful authentication, Google redirects the user back to the NextAuth callback/redirect URL.


## Fetching
**Endpoint**: /api/cars

**Method**: GET

**Purpose**: Fetches all cars from sanity

**Flow**: When the page loads cars will be fetched and displayed on the pages

## Booking
**Endpoint**: /api/new-booking

**Method**: POST

**Purpose**: Takes UserData, CarData PaymentData and RentalData inside the body and initiates a booking for that specific car and user, and saves the data inside sanity

**Flow**: After the form is submitted this endpoint will be executed and initiates booking and saves data inside sanity


## Payment
**Endpoint**: /api/payment

**Method**: POST

**Purpose**: To make a payment of that Rent

**Flow**: Takes BookingData and make a payment using Stripe and then saves payment data inside sanity returns payment status


## Shipment
**Endpoint**: /api/shipment

**Method**: POST

**Purpose**: To initiate a shipment and return as response the tracking data

**Flow**: Takes rental details and starts a shipment of the car to the user



