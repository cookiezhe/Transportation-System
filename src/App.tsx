import MyLayout from './componnets/MyLayout'
import { Routes, Route } from 'react-router-dom'
import Users from './pages/Users/Users'
import Data from './pages/Data/Data'
import Analysis from './pages/Analysis/Analysis'
import System from './pages/SystemManage/SystemManage'
import Screen from './pages/Screen/Screen'

function App() {
  return (
    <MyLayout>
      <Routes>
        <Route path='data' element={<Data />} />
        <Route path='analysis' element={<Analysis />} />
        <Route path='system' element={<System />} />
        <Route path='users' element={<Users />} />
        <Route path='screen' element={<Screen />} />
      </Routes>
    </MyLayout>
  )
}

export default App
