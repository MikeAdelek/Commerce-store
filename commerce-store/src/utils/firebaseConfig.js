export const getFirebaseConfig = () => {
  const requiredEnvVars = [
    "VITE_APP_FIREBASE_API_KEY",
    "VITE_APP_FIREBASE_AUTH_DOMAIN",
    "VITE_APP_FIREBASE_PROJECT_ID"
  ];

  const missingVars = requiredEnvVars.filter(
    (varName) => !import.meta.env[varName]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing Firebase Config Variables: ${missingVars.join(", ")}`
    );
  }

  return {
    apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID
  };
};
