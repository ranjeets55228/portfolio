// central API config — change REACT_APP_BACKEND_URL in Vercel env or .env
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
export const CONTACT_API = `${BACKEND_URL}/api/contact`
