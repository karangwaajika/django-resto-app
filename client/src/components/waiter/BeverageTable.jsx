import { formatToDateString } from "../../utils/dateFormat.mjs";
import { addComma } from "../../utils/addComma.mjs";
export default function BeverageTable({ beverages }) {
  return (
    <table className="">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Category</th>
          <th>Price/frw</th>
          <th>Qty</th>
          <th>Date Created</th>
          
        </tr>
      </thead>
      <tbody>
        {beverages.length > 0 ? (
          beverages.map((beverage, index) => {
            return (
              <tr key={index + 1}>
                <td data-cell="#">{index + 1}</td>
                <td data-cell="Name">{beverage.beverage.name}</td>
                <td data-cell="Category">{beverage.beverage.beverage_type}</td>
                <td data-cell="Price">{addComma(beverage.price)}</td>
                <td data-cell="Qty">{addComma(beverage.qty)}</td>
                <td data-cell="Date">
                  {formatToDateString(beverage.updated_at)}
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
