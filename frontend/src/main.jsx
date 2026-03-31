import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import { Login } from './Authentication/Login.jsx'
import { Register } from './Authentication/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { Toaster } from 'sonner'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import AuthBootstrap from './components/AuthBootstrap.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <AuthBootstrap>
          <Routes>
            <Route path='/' element={<App/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route
              path='/dashboard'
              element={
                <ProtectedRoute>
                  <Dashboard/>
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster
            position='top-right'
            richColors
            closeButton
            duration={3000}
            toastOptions={{
              style: {
                borderRadius: '12px',
                border: '1px solid #d9e2ec',
                background: '#fffaf1',
                color: '#102a43',
                fontWeight: 600,
              },
            }}
          />
        </AuthBootstrap>
      </StrictMode>
    </BrowserRouter>
  </Provider>
)
