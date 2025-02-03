// import { SHIPMENT_PAYMENT_FORM_DATA } from '@/types/types';
// import { useState } from 'react';

// const CheckoutButton = ({ details }: { details: SHIPMENT_PAYMENT_FORM_DATA }) => {
//     const [loading, setLoading] = useState(false);

//     const handleCheckout = async () => {
//         event.preventDefault();
//         setLoading(true);
    
//         if (!stripe || !elements) {
//           return;
//         }
    
//         const { error: submitError } = await elements.submit();
    
//         if (submitError) {
//           setErrorMessage(submitError.message);
//           setLoading(false);
//           return;
//         }
    
//         const { error } = await stripe.confirmPayment({
//           elements,
//           clientSecret,
//           confirmParams: {
//             return_url: `http://www.localhost:3001/payment-success?amount=${amount}`,
//           },
//         });
    
//         if (error) {
//           // This point is only reached if there's an immediate error when
//           // confirming the payment. Show the error to your customer (for example, payment details incomplete)
//           setErrorMessage(error.message);
//         } else {
//           // The payment UI automatically closes with a success animation.
//           // Your customer is redirected to your `return_url`.
//         }
    
//         setLoading(false);
//     };

//     return (
//         <button
//             className={`px-4 py-2 w-fit text-sm md:text-base bg-blue-600 hover:bg-blue-800 text-white rounded-md`}
//             onClick={handleCheckout}
//             disabled={loading}>
//             {loading ? 'Processing…' : 'Book Now'}
//         </button>
//     );
// };

// export default CheckoutButton;
