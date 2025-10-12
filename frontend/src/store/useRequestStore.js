import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useRequestStore = create(
  persist(
    (set, get) => ({
      // Current request
      request: {
        method: "GET",
        url: "",
        headers: [{ key: "", value: "", enabled: true }],
        params: [{ key: "", value: "", enabled: true }],
        body: "",
        name: "",
      },

      // Current response
      response: null,

      // Loading state
      loading: false,

      // Request history
      history: [],

      // Update request property
      updateRequest: (updates) =>
        set((state) => ({
          request: { ...state.request, ...updates },
        })),

      // Update specific header
      updateHeader: (index, updates) =>
        set((state) => {
          const headers = [...state.request.headers];
          headers[index] = { ...headers[index], ...updates };
          return { request: { ...state.request, headers } };
        }),

      // Add new header
      addHeader: () =>
        set((state) => ({
          request: {
            ...state.request,
            headers: [
              ...state.request.headers,
              { key: "", value: "", enabled: true },
            ],
          },
        })),

      // Remove header
      removeHeader: (index) =>
        set((state) => {
          const headers = [...state.request.headers];
          headers.splice(index, 1);
          return { request: { ...state.request, headers } };
        }),

      // Update specific param
      updateParam: (index, updates) =>
        set((state) => {
          const params = [...state.request.params];
          params[index] = { ...params[index], ...updates };
          return { request: { ...state.request, params } };
        }),

      // Add new param
      addParam: () =>
        set((state) => ({
          request: {
            ...state.request,
            params: [
              ...state.request.params,
              { key: "", value: "", enabled: true },
            ],
          },
        })),

      // Remove param
      removeParam: (index) =>
        set((state) => {
          const params = [...state.request.params];
          params.splice(index, 1);
          return { request: { ...state.request, params } };
        }),

      // Set response
      setResponse: (response) => set({ response }),

      // Set loading
      setLoading: (loading) => set({ loading }),

      // Add to history
      addToHistory: (item) =>
        set((state) => {
          // Always set a valid timestamp for createdAt
          const createdAt = item.timestamp || item.createdAt || new Date().toISOString();
          return {
            history: [
              { ...item, createdAt },
              ...state.history.slice(0, 49)
            ],
          };
        }),

      // Load request from history
      loadFromHistory: (item) =>
        set({
          request: {
            method: item.method,
            url: item.url,
            headers: item.headers,
            params: item.params,
            body: item.body,
            name: item.name,
          },
        }),

      // Clear history
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: "request-storage",
      partialize: (state) => ({ history: state.history }),
    },
  ),
);
