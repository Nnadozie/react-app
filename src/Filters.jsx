import React, {Component} from 'react';

class Filters extends Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    };

    handleChange(e) {
      const value = e.target[e.target.type === "checkbox" ? "checked" : "value"]
      const name = e.target.name;

      this.props.onFilter({
        [name]: value
      });
    }

    render() {
        return (
          <form>
            <input type="text" placeholder="Search..."
             value={this.props.filterText}
             name="filterText"
             onChange={this.handleChange}/>
            <p>
              <input type="checkbox"
               checked={this.props.inStockOnly}
               name="inStockOnly"
               onChange={this.handleChange}
              />&nbsp;Only show stocked products
            </p>
          </form>
        );
    }
}

export default Filters;