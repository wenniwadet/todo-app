import { createRoot } from 'react-dom/client'

import App from './components/App'

import './index.css'

const todoApp = createRoot(document.getElementById('root'))
todoApp.render(<App />)
