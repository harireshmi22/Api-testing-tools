import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            hasHydrated: false,

            login: (token, user) => {
                set({ token, user, isAuthenticated: true });
                localStorage.setItem("token", token);
                document.cookie = `auth-token=${token}; path=/; max-age=604800; secure; samesite=strict`;
            },

            logout: () => {
                set({ token: null, user: null, isAuthenticated: false, hasHydrated: true });
                localStorage.removeItem("token");
                document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            },

            setUser: (user) => set({ user }),

            setHydrated: (hydrated) => set({ hasHydrated: hydrated }),
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                token: state.token,
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                // Note: _hasHydrated is intentionally NOT persisted
            }),
            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true); // ensures hasHydrated = true after loading
            },
        }
    )
);
