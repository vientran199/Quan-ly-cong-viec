import React, { Component } from 'react';

class TaskItem extends Component {

    onUpdateStatus = () => {
        //console.log(this.props.tasks.id);
        this.props.onUpdateStatus(this.props.task.id); // truyen ra cho then cha la taskList
    }

    onDelete = ()=>{
        this.props.onDelete(this.props.task.id);
    }
    onUpdate = ()=>{
        this.props.onUpdate(this.props.task.id);
    }

    render() {

        var {task , index} = this.props;
       
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span className={task.status ? "label label-success" : "label label-danger"}  onClick = {this.onUpdateStatus}>
                        {task.status ? "Kich hoat" : "an"}
                        </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={this.onUpdate}><i className="fas fa-pencil-alt mr-5"></i>Sua</button>&nbsp;
                    <button type="button" className="btn btn-danger" onClick = {this.onDelete}><i className="fas fa-trash-alt mr-5"></i>Xoa</button>
                </td>
            </tr>
        );
    }
}

export default TaskItem;