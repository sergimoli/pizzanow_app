import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './ui/Home';
import Error from './ui/Error';
//after exporting the loader function we import an rename it.
import Menu, { loader as menuLoader } from './features/menu/Menu';
import Order, { loader as orderLoader } from './features/order/Order';
import Cart from './features/cart/Cart';
import CreateOrder, {
  action as createOrderAction,
} from './features/order/CreateOrder';

import { action as updateOrderAction } from './features/order/UpdateOrder';

import AppLayout from './ui/AppLayout';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    // with the error element it's good for instance: when a route is wrong, when the api is wrong...
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/menu',
        element: <Menu />,
        // the react router will actually start fetching the data at the same time as it starts rendering the correct route. In other projects we used the useEffect on render approach. We basically rendered (in other projects as I said) the component first and then after the component was already rendered is then we fech the data that can be called fetch data waterfalls.
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: '/cart', element: <Cart /> },
      {
        path: '/order/new',
        element: <CreateOrder />,
        //whenever there will be a new form submisision on this route (/order/new) this action will be called:
        action: createOrderAction,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        //the form that we wnat to be handled with this action here is actually inside UpdateOrder wich is a child component of order but React Router is smart enough to figure that out:
        action: updateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
