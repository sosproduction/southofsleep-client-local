import Home from "./pages/Home";
import Product from "./pages/Product";
import Result from "./pages/Result";
import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { loadStripe } from '@stripe/stripe-js'
import { CartProvider } from "use-shopping-cart";
import { Toaster } from 'react-hot-toast'
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

// Stripe public API key - place in .env file later with REACT_APP_ prefix in root
const stripePromise = loadStripe('pk_test_51NrR0dLUFvcfMrRHTuK2aEKP8mjRisLUok8X7T7gMpu8o3BoAQ86PDsxGFCbRbGUZewkcqxfU8ghABh1RbR6109A00ZeYuouZw');

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider
        mode="checkout-session"
        stripe={stripePromise}
        currency="USD"
      >
        <BrowserRouter>
          <Navbar />
          <Toaster position="bottom-center" />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/result" component={Result} />
            <Route path="/:productId" component={Product} />
          </Switch>
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
  )
}

export default App;
