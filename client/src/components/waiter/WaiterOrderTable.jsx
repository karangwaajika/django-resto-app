import { addComma } from "../../utils/addComma.mjs";
import { convertToDateTime } from "../../utils/dateFormat.mjs";
export default function WaiterOrderTable({ orders }) {
  return (
    <table className="order-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Date</th>
          <th>Client</th>
          <th>Waiter</th>
          <th>Amount To Pay</th>
          <th>Status</th>
          <th>Re-order</th>
        </tr>
      </thead>
      <tbody>
        {orders.length > 0 ? (
          orders.map((order, index) => {
            return (
              <tr key={index + 1}>
                <td data-cell="#">{index + 1}</td>
                <td data-cell="Date" className="td-row">
                  <div>{convertToDateTime(order.created_at)}</div>
                  <div>Code: {order.id}</div>
                </td>
                <td data-cell="Client">{order.customer_name}</td>
                <td data-cell="Waiter">{order.employee_fullname}</td>
                <td data-cell="Amount">{addComma(order.amount_to_pay)} frw</td>
                <td data-cell="Status">
                  {order.is_paid ? (
                    <div
                      className="span td-row"
                      style={{
                        fontWeight: 400,
                      }}
                    >
                      <i className="fa fa-check text-success"></i> Paid
                    </div>
                  ) : (
                    <div
                      className="span td-row"
                      style={{
                        fontWeight: 400,
                      }}
                    >
                      <i className="fa fa-xmark text-danger"></i> Unpaid
                    </div>
                  )}
                </td>
                <td data-cell="Approve" style={{ textAlign: "center" }}>
                  <i className="fa fa-repeat text-success"></i>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={9} style={{ textAlign: "center", color: "red" }}>
              No data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
