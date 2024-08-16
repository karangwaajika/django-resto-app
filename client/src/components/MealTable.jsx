import { formatToDateString } from "../utils/dateFormat.mjs";
import { addComma } from "../utils/addComma.mjs";
export default function mealTable({ meals, openEditModal, openDeleteModal }) {
  return (
    <table className="meal-table">
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
        {meals.length > 0 ? (
          meals.map((meal, index) => {
            return (
              <tr key={index + 1}>
                <td data-cell="#">{index + 1}</td>
                <td data-cell="Name">{meal.name}</td>
                <td data-cell="Category">{meal.meal_type}</td>
                <td data-cell="Price">{addComma(meal.price)}</td>
                <td data-cell="Date">{formatToDateString(meal.created_at)}</td>
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
            <td colSpan={6} style={{ textAlign: "center", color: "red" }}>
              No data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
