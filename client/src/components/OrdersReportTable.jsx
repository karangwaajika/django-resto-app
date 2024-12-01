import { addComma } from "../utils/addComma.mjs";
import { useNavigate } from "react-router-dom";
import { convertToDateTime } from "../utils/dateFormat.mjs";
export default function OrdersReportTable({ orders, openModal }) {
  const navigate = useNavigate();
  let income = 0;
  let expectedIncome = 0;

  return (
    <section>
      <table className="table-report">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Client</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Details</th>
            <th>Waiter</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => {
              income += order.amount_paid;
              expectedIncome += order.overall_total;
              return (
                <>
                  <tr key={index + 1}>
                    <td data-cell="#">{index + 1}</td>
                    <td data-cell="Date" className="td-row">
                      <div>{convertToDateTime(order.created_at)}</div>
                      <div>Code: {order.id}</div>
                    </td>
                    <td data-cell="Client">{order.customer_name}</td>
                    <td data-cell="Amount">
                      {addComma(order.amount_to_pay)} frw
                    </td>
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
                    <td data-cell="Bill">
                      <i
                        className="fa-regular fa-money-bill-1"
                        onClick={() =>
                          openModal(
                            index,
                            order.order_beverages_total,
                            order.order_meals_total,
                            order.order_teas_total,
                            order.overall_total,
                            order
                          )
                        }
                      ></i>
                    </td>
                    <td data-cell="Waiter">{order.employee_fullname}</td>
                  </tr>
                </>
              );
            })
          ) : (
            <tr>
              <td colSpan={9} style={{ textAlign: "center", color: "red" }}>
                No data
              </td>
            </tr>
          )}
          <tr>
            <td colSpan={7}>
              Paid <i className="span span-success">{addComma(income)} frw</i>{" "}
              Expected{" "}
              <i className="span span-dark">{addComma(expectedIncome)} frw</i>{" "}
              Unpaid{" "}
              <i className="span span-danger">
                {addComma(expectedIncome - income)} frw
              </i>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
