import React, { Component } from 'react';

class TaskForm extends Component {

  //Dung state để lưu trữ dư liệu của các controls
  constructor(props){
    super(props);
    this.state ={
      id : '',
      name : '',
      status : false
    }
  }

  componentWillMount(){  //Khi component nay dc chay thi ham nay se chay dau tien
    if(this.props.task){
      this.setState({
        id : this.props.task.id,
        name : this.props.task.name,
        status : this.props.task.status
      })
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.task){
      this.setState({
        id : nextProps.task.id,
        name : nextProps.task.name,
        status : nextProps.task.status
      })
    }
  }
  closeForm = () =>{
    this.props.onCloseForm();
  }

  onChange = (event) => {
    var target =  event.target;
    var name = target.name;
    var value = target.value;
    if(name === 'status'){
      value = target.value ==='true' ? true : false;
    }
    this.setState({
      [name] : value
    })
  }

  onSubmit = (event) => {
    event.preventDefault(); // Bỏ load lại trang khi submit
    // this.props.onSubmit(this.state.name, this.state.status === 'true' ? true : false); //Truyen ra ngoai app.js. Không nên dùng cách này
    this.props.onSubmit(this.state);
    //sau khi submit
    this.onClear();
    this.closeForm();
  }

  onClear = () =>{
    this.setState({
      id : '',
      name : '',
      status : false
    })
    this.closeForm(); 
  }
    render() {
      var {id} = this.state;
        return (
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
            <div className="panel panel-warning">
                <div className="panel-heading">
                  <h3 className="panel-title">
                    {id !== ''? 'Cap nhat cong viec' : 'Them cong viec'} &nbsp;
                    <span className=" text-right fas fa-times-circle " onClick={this.onClear}></span>
                  </h3>
                </div>
                <div className="panel-body">
                  {/* bắt sự kiện onSubmit thì phải có button có type là submit */}
                  <form onSubmit = {this.onSubmit}>
                    <div className="form-group">
                      <label>Ten :</label>
                                                                              {/* thao tác với state trên form phải có value và onChange */}
                      <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange}></input>
                    </div>
                    <div className="form-group">
                      <label>Trang thai</label>
                      <select type="text" className="form-control" name="status" value={this.state.status} onChange={this.onChange}>
                        <option value={true}>Kich hoat</option>
                        <option value={false}>An</option>
                      </select><br/>
                    </div>
                    <div>
                      <button type="submit" className="btn btn-warning"><i className="fas fa-plus"></i> Luu lai</button> &nbsp;
                      <button type="button" className="btn btn-danger" onClick = {this.onClear}><i className="fas fa-times" ></i> Huy bo</button>
                    </div>
                  </form>
                </div>
            </div>
          </div>
        );
    }
}

export default TaskForm;