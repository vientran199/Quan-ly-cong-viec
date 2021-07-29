import React, { Component } from 'react';

class TaskSortControl extends Component {
  onClick = (sortBy,sortValue)=>{
   
    this.props.onSort(sortBy,sortValue);
  }
    render() {
        var {sortBy,sortValue} = this.props;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">
                  <button
                    className="btn btn-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenu1"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    Sap xep  <i className="far fa-caret-square-down"></i>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li onClick = {()=> this.onClick('name',1)}>
                      <a 
                        role="button" 
                         className={(sortBy === "name" && sortValue === 1) ? "sort-selected" : "" }
                      >
                        <i className="fas fa-sort-alpha-down mr-5"></i> 
                        Ten A-Z
                      </a>
                    </li>
                    <li onClick = {()=> this.onClick('name',-1)}>
                      <a 
                        role="button" 
                        className={(sortBy === "name" && sortValue === -1) ? "sort-selected" : "" }
                      >
                      <i className="fas fa-sort-alpha-down-alt mr-5"></i> 
                        Ten Z-A
                      </a>
                    </li>
                    <li role="separator" className="divider"></li>
                    <li onClick = {()=> this.onClick('status',1)}>
                      <a role="button" className={(sortBy === "status" && sortValue === 1) ? "sort-selected" : "" }>Trang thai kich hoat</a>
                    </li>
                    <li onClick = {()=> this.onClick('status',-1)}>
                      <a role="button" className={(sortBy === "status" && sortValue === -1) ? "sort-selected" : "" }>Trang thai an</a>
                    </li>
                  </ul>
                </div>               
              </div> 
        );
    }
}

export default TaskSortControl;