import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    //it will submit a form and also revalidate the page without causing a navigation
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
      {/* we can add some input fields like adress/phone number... */}
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  console.log('update');
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
