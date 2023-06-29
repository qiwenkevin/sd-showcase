"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';

// export function Providers({ children }: { children: React.ReactNode }) {
//   return <Provider store={store}>{children}</Provider>;
// }

export function Providers({ children }: { children: React.ReactNode }) {
return (
  <CacheProvider>
    <ChakraProvider>
      <Provider store={store}>{children}</Provider>
    </ChakraProvider>
  </CacheProvider>
);
}