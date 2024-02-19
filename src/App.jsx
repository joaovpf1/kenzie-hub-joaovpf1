import { useContext } from 'react';
import { RoutesMain } from './Routes/RoutesMain';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './providers/userContext';
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner';


function App() {
  const { loading } = useContext(UserContext)

  return (
    <>
      {loading ? <LoadingSpinner /> : <RoutesMain />}
      <ToastContainer position='top-right' theme='dark' autoClose={2 * 1000} />
    </>
  )
}

export default App
