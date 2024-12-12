import { formatToDateString } from "../utils/dateFormat.mjs";
export default function EmployeeTable({ employees, openModal }) {
  return (
    <table className="dashboard-content-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Names</th>
          <th>Join on</th>
          <th>Role/Edit</th>
          <th>Active/Edit</th>
          <th>Set Password</th>
        </tr>
      </thead>
      <tbody>
        {employees.length > 0 ? (
          employees.map((employee, index) => {
            return (
              <tr key={index + 1}>
                <td data-cell="#">{index + 1}</td>
                <td data-cell="Name">
                  {employee.first_name + " " + employee.last_name}
                </td>
                <td data-cell="Date">
                  {formatToDateString(employee.date_joined)}
                </td>
                <td data-cell="Role">
                  <div className="action-btn">
                    {employee.is_staff ? "Bartender" : "Waiter"}{" "}
                    <i
                      className="fa fa-pen-to-square text-warning"
                      onClick={() => openModal(index, "role")}
                    ></i>
                  </div>
                </td>
                <td data-cell="Active" style={{ textAlign: "center" }}>
                  <div className="action-btns">
                    {employee.is_active ? (
                      <i className="fa fa-check-square text-success"></i>
                    ) : (
                      <i className="fa fa-square-xmark text-danger"></i>
                    )}{" "}
                    <i
                      className="fa fa-pen-to-square"
                      onClick={() => openModal(index, "activate")}
                    ></i>
                  </div>
                </td>
                <td data-cell="Password">
                  <i
                    className="fa fa-pencil text-primary"
                    onClick={() => openModal(index, "password")}
                  ></i>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={6} style={{ textAlign: "center", color: "red" }}>
              No data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
