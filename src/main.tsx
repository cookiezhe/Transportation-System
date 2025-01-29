import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'antd/dist/reset.css'
import Login from './pages/Login/Login.tsx'

import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ConfigProvider locale={zhCN}>
      <Routes>
        <Route path='/admin/*' element={<App />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Login />} />
      </Routes>
    </ConfigProvider>
  </BrowserRouter>,
)
