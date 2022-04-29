/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test'
        PUBLIC_URL: string
        REACT_APP_MARKETPLACE_BASE_URL: string
        REACT_APP_MARKETPLACE_API_KEY: string
    }
}