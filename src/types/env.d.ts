declare namespace NodeJS {
  interface ProcessEnv {
    GEMINI_API_KEY?: string;
    FIREBASE_CONFIG?: {
      projectId?: string;
      appId?: string;
      apiKey?: string;
      authDomain?: string;
      firestoreDatabaseId?: string;
      storageBucket?: string;
      messagingSenderId?: string;
    };
  }
}
