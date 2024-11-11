import { formatToDateString } from "../../utils/dateFormat.mjs";
import { addComma } from "../../utils/addComma.mjs";
export default function MealTable({ meals }) {
  return (
    <table className="">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price/frw</th>
          <th>Date Created</th>
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
