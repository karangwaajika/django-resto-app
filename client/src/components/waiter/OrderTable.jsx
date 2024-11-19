import { addComma } from "../../utils/addComma.mjs";
import { useNavigate } from "react-router-dom";
import { convertToDateTime } from "../../utils/dateFormat.mjs";
export default function OrderTable({ orders }) {
  const navigate = useNavigate()
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
          <th>Approve Payment</th>
          <th>Bill</th>
          <th>Edit</th>
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
                      className="span"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontWeight: 400,
                      }}
                    >
                      <i className="fa fa-check text-success"></i> Paid
                    </div>
                  ) : (
                    <div
                      className="span"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontWeight: 400,
                      }}
                    >
                      <i className="fa fa-xmark text-danger"></i> Unpaid
                    </div>
                  )}
                </td>
                <td data-cell="Approve" style={{ textAlign: "center" }}>
                  <i className="far fa-check-square text-success" onClick={()=>navigate(`/service/approve/${order.id}/bill`)}></i>
                </td>
                <td data-cell="Bill">
                  <i className="fa-regular fa-money-bill-1"></i>
                </td>
                <td data-cell="Edit">
                  <i className="fa fa-pen-to-square text-primary"></i>
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
