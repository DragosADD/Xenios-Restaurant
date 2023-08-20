import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './UI/Home';
import Error from './UI/Error';
import Menu, {
  loader as menuLoader,
  action as menuEditAndAdd,
} from './Features/Menu/Menu';
import Cart from './Features/Cart/Cart';
import Order, { loader as orderLoader } from './Features/Order/Order';
import AppLayout from './UI/AppLayout';
import AuthenticationPage, {
  action as logInOrSignUp,
} from './Features/authentication/AuthenticationPage';
import { action as logoutAction } from './Features/authentication/Logout';
import { checkAuthLoader, getUser } from './Utils/auth';
import OrderHistory, {
  loader as historyLoader,
} from './Features/HistoryOrders/OrderHistory';

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
        action: menuEditAndAdd,
        errorElement: <Error />,
      },
      {
        path: '/cart',
        element: <Cart />,
        loader: checkAuthLoader,
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
      {
        path: '/history',
        element: <OrderHistory />,
        loader: historyLoader,
        // action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
