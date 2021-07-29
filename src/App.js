
import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';
import _ from 'lodash';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks : [],  // Id: unique, status, name 
      isDisplayForm : false,
      taskEditing : null,
      filter : {
        name : '',
        status : -1
      },
      keyWord : '',
      sortBy : 'name',
      sortValue : 1
    }
  }

  // Hàm này chỉ được gọi duy nhất 1 lần khi cac component được gán lên trang web
  componentWillMount(){

    //NÊN  Kiểm tra khác null khác rỗng
    if(localStorage && localStorage.getItem('tasks')){
      var tasks = JSON.parse(localStorage.getItem('tasks'));  //json.parse() : để chuyển chuỗi thành kiểu đối tượng
      this.setState({
        tasks : tasks
      })
    }
  }



  // Random 1 chuoi so
  s4(){
    return Math.floor((1 + Math.random()) * 0x10000).toString(6).substring(1);
  }

  generateID(){
    return this.s4() + this.s4() + '-' + this.s4() + "-" + this.s4() +"-" + this.s4() +"-" + this.s4() + this.s4() + this.s4();
  }

  //tim index cua state co id
  findIndex = (id) =>{
    var {tasks} = this.state;
    var result = -1;
    tasks.forEach((task,index) => {
      if(task.id === id){
        result = index; 
      }
    })
    return result;
  }

  // function cho nút thêm công việc

  openAddJob = ()=>{
    this.setState({
      isDisplayForm : true
    })
  }

  onCloseForm=()=>{
    this.setState({
      isDisplayForm : false,
      taskEditing : null
    })
  }

  onSubmit = (data) =>{
    var {tasks} = this.state;
    var index = this.findIndex(data.id);
    if(index === -1){
      data.id = this.generateID();
      tasks.push(data);
    }
    else{
      tasks[index] = data;
    }
    this.setState({
      tasks : tasks,
      taskEditing : null
    })
    localStorage.setItem('tasks', JSON.stringify(tasks)); // luu vao localStorage. //Json.stringjfy() : chuyển object thành string
  }

  onUpdateStatus = (id)=>{
    //var index = this.findIndex(id);
    var {tasks} = this.state;
    var index = _.findIndex(tasks,(task) => {
      return task.id === id;
    })
    if(index !== -1){
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks : tasks
      })
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }
  }

  

  onDelete = (id)=>{
    var index = this.findIndex(id);

    var {tasks} = this.state;
    if(index !== -1){
      tasks.splice(index,1);
      this.setState({
        tasks : tasks
      })

      localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    this.onCloseForm();
  }

  onUpdate = (id)=>{
    var {tasks} = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    this.setState({
      taskEditing : taskEditing
    })
    //co state cua job
    this.openAddJob();
  }

  onFilter = (filterName,filterStatus)=>{  
    filterStatus = parseInt(filterStatus,10);
    console.log(filterStatus);
    this.setState({
      filter : {
        name : filterName,
        status : filterStatus
      }
    })
  }
  onSearch = (keyWord) =>{
    this.setState({
      keyWord : keyWord
    })
  }

  onSort =(sortBy,sortValue)=>{
    this.setState({
      sortBy : sortBy,
      sortValue: sortValue
    })
  }
  render() {

    var {tasks, isDisplayForm,taskEditing,filter,keyWord ,sortBy,sortValue} = this.state; // tuong duong var tasks = this.state.tasks;
    if(filter){
      if(filter.name){
        // tasks = tasks.filter((task)=>{
        //   return task.name.toLowerCase().indexOf(filter.name) !== -1;
        // })
        tasks = _.filter(tasks,(task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        })
      }
        tasks = tasks.filter((task)=>{
          if(filter.status === -1){
            return task;
          }
          else{
            return task.status === filter.status;
          }
        })
    }
    if(keyWord){
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyWord) !== -1;
      })
    }
    if(sortBy === 'name'){
      tasks.sort((a,b) => {
        if(a.name > b.name) return sortValue;
        else if(a.name < b.name) return -sortValue;
        else return 0;
      });
    }
    else{
      tasks.sort((a,b) => {
        if(a.name > b.name) return sortValue;
        else if(a.name < b.name) return -sortValue;
        else return 0;
      });
    }
    var elementForm = isDisplayForm ? <TaskForm onSubmit = {this.onSubmit} onCloseForm={this.onCloseForm} task = {taskEditing}/> : "";
    return (

      
      <div className="container">
        <div className="text-center">
          <h1>Quan ly cong viec</h1>
          <hr/>
        </div>
        <div className="row">    
        {/* Form them coong viecj */}   
           {elementForm}
          
          <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button type="button" className="btn btn-primary" onClick={this.openAddJob}><i className="fas fa-plus mr-5"></i> Them cong viec</button>
            {/* Tim kiem va sort */}
            <TaskControl onSearch = { this.onSearch } onSort = {this.onSort} sortBy = {sortBy} sortValue= {sortValue}/>
            {/* Danh sach cac cong viec */}
            <TaskList tasks = {tasks} onUpdateStatus = {this.onUpdateStatus} onDelete = {this.onDelete} onUpdate={this.onUpdate} onFilter={this.onFilter}/>
          </div>         
        </div>
      </div>
    );
  }
}



export default App;
