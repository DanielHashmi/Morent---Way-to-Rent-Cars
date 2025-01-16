### User Steps
1. **Sign In**: User logs in using Google through NextAuth, with their data saved in Sanity.
2. **Choose Car**: User selects a car, reads specifications, and fills out a form powered by Zod, including user, rental, and payment data.
3. **Submit Form**: Form data is saved in Sanity, and a shipment label is generated through ShipEngine.
4. **Confirmation**: User sees a confirmation message and is redirected to the booking page.
5. **Tracking**: Tracking data is shown on the booking page.
6. **Payment**: Payment is processed through Stripe, and the status is displayed on the booking page.
7. **Delivery**: Car is delivered to the drop-off location on the specified date and time.

### System Components
- **Frontend**: NextJS Client, TailwindCSS, TypeScript, Zod.
- **Backend**: Handles authentication, design, car search, favorites, data tables, shipment, and real-time tracking.
- **Database**: Stores user, car, reservation, payment, and shipment data.
- **APIs**: Sanity API, ShipEngine API, Stripe API, NextJS API.

### Data Flow
- Data is fetched, saved, and processed through various steps, including tracking, payment details, car data, and user data.

### Entities
- **User**: Name, email, image, ID, phone.
- **Car**: Name, image, description, ID, availability, rental price per day.
- **Reservation**: Reservation ID, car ID, user ID, locations, dates, total days, shipment costs.
- **Payment**: Payment ID, reservation ID, status, method, amount.
- **Shipment**: Shipment ID, car ID, user ID, locations, dates.
