import { Route, Routes } from 'react-router-dom';
import { Login } from '../components/Login/Login';
import { Dashboard } from '../components/Dashboard/Dashboard';
import { RegisterPage } from '../components/Register/Register';
import { PrivateRoutes } from './PrivateRoutes/PrivateRoutes';

export const RoutesMain = () => {

    return (
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/register' element={<RegisterPage />} />
            <Route element={<PrivateRoutes/>}>
                <Route path='/dashboard' element={<Dashboard />} />
            </Route>
        </Routes>
    )
}