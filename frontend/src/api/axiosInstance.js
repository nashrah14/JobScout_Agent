/**
 * Axios HTTP Client Configuration.
 *
 * Configures axios instance with:
 * - Firebase authentication token injection
 * - Automatic token refresh
 * - Centralized error handling
 */

import axios from "axios";
import config from "../config";
import { STORAGE_KEYS, ERROR_MESSAGES } from "../constants";
import { auth } from "../firebase/firebase";

const axiosInstance = axios.create({
    baseURL: config.api.baseUrl,
    timeout: 240000,
    headers: {
        "Content-Type": "application/json",
    },
});

/*
 * ------------------------------------------------------------
 * REQUEST INTERCEPTOR
 * ------------------------------------------------------------
 *
 * Gets the current Firebase ID token before every request.
 *
 * Firebase automatically refreshes the token when required,
 * preventing expired-token authentication failures.
 */
axiosInstance.interceptors.request.use(
    async (requestConfig) => {
        try {
            if (auth.currentUser) {
                const token = await auth.currentUser.getIdToken();

                if (token) {
                    requestConfig.headers = requestConfig.headers || {};
                    requestConfig.headers.Authorization = `Bearer ${token}`;

                    // Keep localStorage synchronized.
                    localStorage.setItem(
                        STORAGE_KEYS.authToken,
                        token
                    );
                }
            } else {
                // Fallback to the locally stored token.
                const token = localStorage.getItem(
                    STORAGE_KEYS.authToken
                );

                if (token) {
                    requestConfig.headers =
                        requestConfig.headers || {};

                    requestConfig.headers.Authorization =
                        `Bearer ${token}`;
                }
            }

            return requestConfig;
        } catch (error) {
            return Promise.reject(error);
        }
    },
    (error) => {
        return Promise.reject(error);
    }
);


/*
 * ------------------------------------------------------------
 * RESPONSE INTERCEPTOR
 * ------------------------------------------------------------
 */

axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
        if (error.response) {
            const { status, data } = error.response;

            /*
             * 401 = Authentication failed.
             *
             * Clear local authentication information and
             * redirect the user to login.
             */
            if (status === 401) {
                localStorage.removeItem(
                    STORAGE_KEYS.authToken
                );

                localStorage.removeItem(
                    STORAGE_KEYS.userData
                );

                window.location.href = "/login";
            }

            const serverMessage =
                data?.error?.message ||
                data?.detail?.message ||
                data?.message;

            error.customMessage =
                serverMessage ||
                ERROR_MESSAGES.serverError;
        } else if (error.request) {
            error.customMessage =
                ERROR_MESSAGES.networkError;
        } else {
            error.customMessage =
                ERROR_MESSAGES.serverError;
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;