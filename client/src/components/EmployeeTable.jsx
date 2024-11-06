import { formatToDateString } from "../utils/dateFormat.mjs";
export default function EmployeeTable({ employees }) {
  return (
    <table className="waiter-table">
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
                  {employee.is_staff ? "Bartender" : "Waiter"}{" "}
                  <i className="fa fa-pen-to-square text-warning"></i>
                </td>
                <td data-cell="Active" style={{ textAlign: "center" }}>
                  {employee.is_active ? (
                    <i className="fa fa-check-square text-success"></i>
                  ) : (
                    <i className="fa fa-square-xmax text-danger"></i>
                  )}{" "}
                  <i className="fa fa-pen-to-square"></i>
                </td>
                <td data-cell="Password">
                  <i className="fa fa-pencil text-primary"></i>
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
