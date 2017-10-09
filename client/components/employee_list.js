import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../../imports/collections/employees';
import EmployeeDetail from './employee_detail';

const PER_PAGE = 20;

class EmployeeList extends Component{
    constructor(props){
        super(props)
    }
    componentWillMount(){
        this.page = 1;
    }
    onLoadMore(){
        Meteor.subscribe('employees', PER_PAGE * (this.page + 1));
        this.page += 1;
    }
    render(){
        return(
            <div>
                <div className="employee-list">
                    {this.props.employees.map((employee) => <EmployeeDetail key={employee._id} employee={employee}/>)}
                </div>
                <button className="btn btn-primary" onClick={ this.onLoadMore.bind(this)}>Load More</button>
            </div>
        )
    }
}

export default createContainer(() => {
    // set up subscription
    Meteor.subscribe('employees', PER_PAGE);
    //return an object. Whatever we return will be sent as props
    return { employees : Employees.find({}).fetch() };

}, EmployeeList);