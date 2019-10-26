import React from 'react';
import Filters from './Filters.jsx';
import ProductTable from './ProductTable.jsx';
import ProductForm from './ProductForm';

var PRODUCTS = {
  '0': {id: 0, category: '', price: '', stocked: false, name: ''},
  '1': {id: 1, category: 'Musical Instruments', price: '$459.99', stocked: true, name: 'Clarinet'},
  '2': {id: 2, category: 'Musical Instruments', price: '$5,000', stocked: true, name: 'Harpsicord'},
  '3': {id: 3, category: 'Musical Instruments', price: '$11,000', stocked: false, name: 'Fortepiano'},
  '4': {id: 4, category: 'Furniture', price: '$799', stocked: true, name: 'Chaise Lounge'},
  '5': {id: 5, category: 'Furniture', price: '$1,300', stocked: false, name: 'Dining Table'},
  '6': {id: 6, category: 'Furniture', price: '$100', stocked: true, name: 'Bean Bag'}
};

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false,
      products: PRODUCTS,
      formProduct: '0'
    };

    this.handleFilter = this.handleFilter.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.edit = this.edit.bind(this);
  }
  handleFilter(filterInput) {
    this.setState(filterInput);
  }
  saveProduct(product) {
    if (!product.id) {
      product.id = new Date().getTime();
    }
    this.setState((prevState) => ({
      products: {
          ...this.state.products,
      },
      formProduct: 0
    }));
  }
  handleDestroy(productId) {
    this.setState((prevState) => {
      let products = prevState.products;
      delete products[productId];
      return { products };
    });
  }

  edit(productId) {
    this.setState({
        formProduct: productId
    })
    console.log(this.state.formProduct);
  }
  render() {
    return (
      <div>
        <Filters
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onFilter={this.handleFilter}
        ></Filters>
        <ProductTable
          products={this.state.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onDestroy={this.handleDestroy}
          edit={this.edit}
        ></ProductTable>
        <ProductForm onSave={this.saveProduct}
            product={this.state.products[this.state.formProduct]}
        ></ProductForm>
      </div>
    );
  }
}

export default Products;