// FilterableProductTable
// ..SearchBar
// ..ProductTable
// ....ProductCategoryRow
// ....ProductRow

import React, { useState } from "react";
import ReactDOM from "react-dom";

const ProductCategoryRow = props => {

  const {product} = props;


  return (
    <tr>
      <th colSpan="2">
        {product.category}
      </th>
    </tr>
  );
};
const ProductRow = props => {

  const {product} = props;

  const coloredName = product.stocked? product.name : <span style={{color:"red"}}>{product.name}</span>;

  return (
    <tr>
      <td>{coloredName}</td>
      <td align="right">{product.price}</td>
    </tr>
  )
};

const ProductTable = props => {
  const {filterText, inStockOnly, products} = props;
  const rows = [];
  let lastCategory = null;

  products.forEach(product => {
    if(product.name.indexOf(filterText) === -1) return;
    if(inStockOnly && !product.stocked) return;
    if(product.category !== lastCategory){
    rows.push(
      <ProductCategoryRow product={product} key={product.category} >
      </ProductCategoryRow>);
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return(
    <table width="100%">
      <thead>
        <tr style = {{color:"blue"}}>
          <th align="left">
            Name
          </th>
          <th align="right">
            Price
          </th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

const SearchBar = props =>
  {
    const {filterText, inStockOnly, onFilterTextChange, onStockOnlyChange} = props;
    return (
      <form>
        <input type="text" placeholder="Search..." value={filterText} onChange={event => onFilterTextChange(event.target.value)}/>
        <p>
          <input type="checkbox" checked={inStockOnly} onChange={event => onStockOnlyChange(event.target.checked)}/>
          {""}
          <span style={{color:"green", fontSize:"smaller"}}>
            Only show products in stock
          </span>
        </p>
      </form>
    )
  }

const FilterableProductTable = props => {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const {products} = props;

  const handleFilterTextChange = filterText => {
    setFilterText(filterText);
  }

  const handleStockOnlyChange = inStockOnly => {
    setInStockOnly(inStockOnly);
  }
  return (
    <div style={{frontFamily:"sans-serif"}}>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly}
        onFilterTextChange={handleFilterTextChange}
        onStockOnlyChange={handleStockOnlyChange}
        />
      <ProductTable 
        products={products} 
        filterText={filterText} 
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];


ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('root')
)