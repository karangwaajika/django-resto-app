import React from "react";

function Bill() {
  return (
    <aside className="bill">
      <h1 style={{ fontFamily: "cursive" }}>Bill</h1>
      <div className="bill-details">
        <div className="item-bill">
          <div className="item-header">
            <div className="item-icon">
              <i className="far fa-circle-dot"></i>
            </div>
            <div className="item-text">Beverage</div>
          </div>
          <div className="" style={{ paddingLeft: "5px" }}>
            <ul className="item-items">
              <li>Ajika(3 x 120) = 3000 frw</li>
              <li>Ajika(3 x 120) = 3000 frw</li>
              <li>Ajika(3 x 120) = 3000 frw</li>
              <li>Ajika(3 x 120) = 3000 frw</li>
            </ul>
          </div>
        </div>
        <div className="item-bill">
          <div className="item-header">
            <div className="item-icon">
              <i className="far fa-circle-dot"></i>
            </div>
            <div className="item-text">Beverage</div>
          </div>
          <div className="" style={{ paddingLeft: "5px" }}>
            <ul className="item-items">
              <li>Ajika(3 x 120) = 3000 frw</li>
              <li>Ajika(3 x 120) = 3000 frw</li>
              <li>Ajika(3 x 120) = 3000 frw</li>
            </ul>
          </div>
        </div>
        <div className="item-bill">
          <div className="item-header">
            <div className="item-icon">
              <i className="far fa-circle-dot"></i>
            </div>
            <div className="item-text">Beverage</div>
          </div>
          <div className="" style={{ paddingLeft: "5px" }}>
            <ul className="item-items">
              <li>Ajika(3 x 120) = 3000 frw</li>
              <li>Ajika(3 x 120) = 3000 frw</li>
              <li>Ajika(3 x 120) = 3000 frw</li>
              <li>Ajika(3 x 120) = 3000 frw</li>
              <li>Ajika(3 x 120) = 3000 frw</li>
            </ul>
          </div>
        </div>
        <div style={{textAlign:"center"}}>
            Total: 3000 Rwf
        </div>
      </div>
    </aside>
  );
}

export default Bill;
