import React, {Component} from 'react';

class Filters extends Component {
    render() {
        return (
          <form>
            <input type="text" placeholder="Search..."
             value={this.props.filterText}/>
            <p>
              <input type="checkbox"
               checked={this.props.inStockOnly}
              />&nbsp;Only show stocked products
            </p>
          </form>
        );
    }
}

export default Filters;