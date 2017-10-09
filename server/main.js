import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Employees  } from '../imports/collections/employees';
import faker from 'faker';

Meteor.startup(() => {
  // code to run on server at startup
    //Check if data already exists
    var numberRecords = Employees.find({}).count();
    if(!numberRecords){
        // Generate Data With Faker
        _.times(5000, () => {
           const { name, email, phone } = faker.helpers.createCard();
           Employees.insert({
               name, email, phone,
               avatar : faker.image.avatar()
           });
        });
    }
    /*else{
        Employees.remove({});
    }*/

    Meteor.publish('employees', function (pages) {
       return Employees.find({}, {limit: pages});
    });
});
