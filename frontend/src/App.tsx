// src/App.tsx
import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {Provider} from "react-redux";
import "./styles/index.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProtectedRoute from "common/ProtectedRoute/ProtectedRoute";
import Home from "pages/home/Home";
import store from "store/store";

const Signin = lazy(() => import("pages/auth/signin/signin"));
const Signup = lazy(() => import("pages/auth/signup/signup"));
const Favorite = lazy(() => import("pages/favriote"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Prevent refetch on window focus
      refetchOnReconnect: false, // Prevent refetch on reconnect
      refetchInterval: false, // Disable polling
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/favorite" element={<Favorite />} />
              </Route>
            </Routes>
          </Suspense>
        </Router>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
