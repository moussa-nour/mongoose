// Import necessary modules
const mongoose = require('mongoose');
require('dotenv').config();

// Connect to the database using the provided URI in the .env file
mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log("database connected"))
.catch((err) =>console.log(err));

// Define the Person Schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: { type: [String], default: [] },
});

// Create the Person model using the schema
const Person = mongoose.model('Person', personSchema);

// Create a new person document and save it
const newPerson = new Person({
  name: 'John Doe',
  age: 30,
  favoriteFoods: ['chocolat', 'Burger'],
});

newPerson.save()
  .then(data => {
    console.log('New person saved:', data);
  })
  .catch(err => {
    console.error(err);
  });


// Create many records using model.create()
const arrayOfPeople = [
  { name: 'Alice', age: 25, favoriteFoods: ['Pizza', 'Ice Cream'] },
  { name: 'Bob', age: 35, favoriteFoods: ['Steak', 'Sushi'] },
];

const createManyPerson = async(arrayOfPeople)=>{
  try{
    const newPll = await Person.create(arrayOfPeople)
    console.log(newPll)
  }
  catch(err){
    console.log(err)
  }
}
// createManyPerson(arrayOfPeople)


// Use model.find() to search for people with a given name
Person.find({ name: 'John Doe' })
  .then(data => {
    console.log('People with the name "John Doe":', data);
  })
  .catch(err => {
    console.error(err);
  });


// Use model.findOne() to find a person with a certain food in favorites
const findoneperson = async (favoriteFoods ) =>{
  try{
    const person = await Person.findOne({ favoriteFoods :{$in : [favoriteFoods]}});
    console.log(` the person who live this food: '${favoriteFoods}':`, person);
  } catch(err){
    console.log(err);
  }
}
findoneperson('Sushi');
// Use model.findById() to find a person by _id
const findIdPerson = async (_id) =>{
  try{
      const personId = await Person.findById({_id : _id});
      console.log ( `the person with ID is : '${_id}'`,personId);
  } catch (err){
      console.error(err);
  }
}
findIdPerson('659eab6d1614dacfb10b106a');

// Perform classic updates by running find, edit, then save
const updateFoods = async (_id) =>{
  try{
      const  personfind = await Person.findById(_id); //@search with ID the person
      personfind.favoriteFoods.push('Hamburger'); //@add hamburger to the list favoritefoods
      const updatePerson = await personfind.save(); //@save update
      console.log(' food updated suucefully:', updatePerson);
  }catch (err){
      console.error(err);
  }
}
updateFoods('659eb187559be8ad0044b3f8');



// Perform classic updates by running find, edit, then save







// // Perform new updates using model.findOneAndUpdate()

const updateOnePerson = async (name) => {
  try {
      const findIdPerson = await Person.findOneAndUpdate({ name: name }, { $set: { age: 20 } }, { new: true })
      console.log('The person found is ', findIdPerson);
  } catch (err) {
      console.error(err);
  }
};
updateOnePerson('John');



// // Delete one document using model.findByIdAndRemove


const deletePerson = async (_id) => {
  try {
      const personDelete = await Person.findByIdAndDelete({ _id })
      console.log('We deleted this person:', personDelete);
  } catch (err) {
      console.error(err);
  }
};
deletePerson('659eabf1811fddb0288d0041')
// const personIdDelete = (_id);

// Person.findByIdAndDelete(personIdDelete)
//   .then(removedPerson => {
//     if (!removedPerson) {
//       throw new Error('Person not found'); // Handle case where person with the given ID is not found
//     }

//     console.log(`Person with ID "${personIdDelete}" removed:`, removedPerson);
//   })
//   .catch(err => {
//     console.error(err);
//   });


// // Delete many documents using model.remove()
// const personNameDeleteMany = 'Mary';

// Person.deleteMany({ name: personNameDeleteMany })
//   .then(result => {
//     console.log(`Deleted all people with the name "${personNameDeleteMany}":`, result);
//   })
//   .catch(err => {
//     console.error(err);
//   });


// // Chain search query helpers to narrow search results
// Person.find({ favoriteFoods: 'burger' })
//   .sort({ name: 1 })
//   .limit(2)
//   .select({ age: 0 })
//   .exec()
//   .then(data => {
//     console.log('People who like burger:', data);
//   })
//   .catch(err => {
//     console.error(err);
//   });

