import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './UI/Home';
import Error from './UI/Error';
import Menu, { loader as menuLoader } from './Features/Menu/Menu';
import Cart from './Features/Cart/Cart';
import Order, { loader as orderLoader } from './Features/Order/Order';
import AppLayout from './UI/AppLayout';
import AuthenticationPage, {
  action as logInOrSignUp,
} from './Features/authentication/AuthenticationPage';
import { action as logoutAction } from './Features/authentication/Logout';
import { getUser } from './Utils/auth';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    loader: getUser,
    id: 'root',
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <AuthenticationPage />,
        action: logInOrSignUp,
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: '/cart',
        element: <Cart />,
        // action: cartSendData,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        errorElement: <Error />,
      },
      {
        path: '/logout',
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
