import React from 'react';
import './ProductForm.css';
const RESET_VALUES = {id: '', category: '', price: '', stocked: false, name: ''};

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      product: Object.assign({}, RESET_VALUES),
      errors: {},
      errorPresent: false
    };
  }

  isError() {
    const present = this.state.product["name"] === '' ? true : false;
    this.setState({
      errorPresent: present
    });
    return present;
  }

  handleChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    
    this.setState((prevState) => {
      prevState.product[name] = value;
      this.isError();
      return { product: prevState.product };
    });
  }
  handleSave(e) {
    if(this.isError()) {
      e.preventDefault();
      return;
    }
    this.props.onSave(this.state.product);
    this.setState({
      product: Object.assign({}, RESET_VALUES),
      errors: {}
    });
    e.preventDefault();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.product.id !== prevProps.product.id) {
      this.setState({
        product: this.props.product
      });
    }
  }
  render() {
    return (
      <form>
        <h3>Enter a new product</h3>
        <p>
          <label>
            Name
            <br />
            <input type="text" name="name" onChange={this.handleChange} value={this.state.product.name}/>
          </label>
        </p>
        <div className = {this.state.errorPresent === false ? "d-none" : ""}>This field cannot be empty</div>

        <p>
          <label>
            Category
            <br />
            <input type="text" name="category" onChange={this.handleChange} value={this.state.product.category} />
          </label>
        </p>
        <p>
          <label>
            Price
            <br />
            <input type="text" name="price" onChange={this.handleChange} value={this.state.product.price} />
          </label>
        </p>
        <p>
          <label>
            <input type="checkbox" name="stocked" onChange={this.handleChange} checked={this.state.product.stocked}/>
            &nbsp;In stock?
          </label>
        </p>
        <input type="submit" value="Save" onClick={this.handleSave}/>
      </form>
    );
  }
}

export default ProductForm;