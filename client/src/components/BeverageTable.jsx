import { formatToDateString } from "../utils/dateFormat.mjs";
import { addComma } from "../utils/addComma.mjs";
export default function BeverageTable({
  beverages,
  openEditModal,
  openDeleteModal,
}) {
  return (
    <table className="beverage-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price/frw</th>
          <th>Qty</th>
          <th>Date Created</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {beverages.length > 0 ? (
          beverages.map((beverage, index) => {
            return (
              <tr key={index + 1}>
                <td data-cell="#">{index + 1}</td>
                <td data-cell="Name">{beverage.beverage__name}</td>
                <td data-cell="Category">{beverage.beverage__beverage_type}</td>
                <td data-cell="Price">{addComma(beverage.price)}</td>
                <td data-cell="Qty">{addComma(beverage.qty)}</td>
                <td data-cell="Date">
                  {formatToDateString(beverage.updated_at)}
                </td>
                <td data-cell="Action">
                  <i
                    className="fa fa-pencil"
                    onClick={() => openEditModal(index)}
                  ></i>{" "}
                  <i
                    className="fa fa-trash-can"
                    onClick={() => openDeleteModal(index)}
                  ></i>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={7} style={{ textAlign: "center", color: "red" }}>
              No data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
