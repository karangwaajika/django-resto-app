import { formatToDateString } from "../utils/dateFormat.mjs";
import { addComma } from "../utils/addComma.mjs";
export default function TeaTable({ teas, openEditModal, openDeleteModal }) {
  return (
    <table className="dashboard-content-table">
      {/* <caption>Tea/Coffe List</caption> */}
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price/frw</th>
          <th>Date Created</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {teas.length > 0 ? (
          teas.map((tea, index) => {
            return (
              <tr key={index + 1}>
                <td data-cell="#">{index + 1}</td>
                <td data-cell="Name">{tea.name}</td>
                <td data-cell="Category">{tea.tea_type}</td>
                <td data-cell="Price">{addComma(tea.price)}</td>
                <td data-cell="Date">{formatToDateString(tea.created_at)}</td>
                <td data-cell="Action">
                  <div className="action-btns">
                    <i
                      className="fa fa-pen-to-square text-primary"
                      onClick={() => openEditModal(index, "edit")}
                    ></i>{" "}
                    <i
                      className="fa fa-trash-can"
                      onClick={() => openDeleteModal(index, "delete")}
                    ></i>
                  </div>
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
