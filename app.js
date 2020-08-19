const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

//Creaet element and render to the DOM
function renderCafes(doc) {
  let li = document.createElement('li');
  let name = document.createElement('span');
  let city = document.createElement('span');
  let cross = document.createElement('div');

  li.setAttribute('data-id', doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = 'x';
  //Appending element to the parent
  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);
  cafeList.appendChild(li);

  //deleting
  cross.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('cafes').doc(id).delete();
  });
}

// // getting specific query

// db.collection('cafes')
//   .where('city', '==', 'Dar')
//   .get()
//   .then((snapshot) => {
//     //Show the documents' snapshot
//     // console.log(snapshot.docs);
//     snapshot.forEach((doc) => {
//       //show the actual document data
//       //   console.log(doc.data());
//       renderCafes(doc);
//     });
//   });

// //Ordering  and fetching query
// db.collection('cafes')
//   .orderBy('city')
//   .get()
//   .then((snapshot) => {
//     //Show the documents' snapshot
//     // console.log(snapshot.docs);
//     snapshot.forEach((doc) => {
//       //show the actual document data
//       //   console.log(doc.data());
//       renderCafes(doc);
//     });
//   });

// //getting data
// db.collection('cafes')
//   .get()
//   .then((snapshot) => {
//     //Show the documents' snapshot
//     // console.log(snapshot.docs);
//     snapshot.forEach((doc) => {
//       //show the actual document data
//       //   console.log(doc.data());
//       renderCafes(doc);
//     });
//   });

// GETTING DATA WITH DATABASE REAL TIME=>real-time listener
db.collection('cafes')
  .orderBy('city')
  .onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      if (change.type == 'added') {
        renderCafes(change.doc);
      } else if (change.type == 'removed') {
        let li = cafeList.querySelector(`[data-id = ${change.doc.id}]`);
        cafeList.removeChild(li);
      }
    });
  });

//saving data to the database
form.addEventListener('submit', (e) => {
  e.preventDefault();

  //Adding the fields to the database
  db.collection('cafes').add({
    name: form.name.value,
    city: form.city.value,
  });

  form.name.value = '';
  form.city.value = '';
});

//UPDATING DATA
//Updating according to the field pass
// db.collection('cafes').doc('Q1NADpw1wyMdPdfiIjto').update({
//   name: 'Juma',
// });

// //Overriding the whole document(fields)
// db.collection('cafes').doc('rcgCEo3uzNGLDSPULDkV').set({
//   name: 'Kibwana',
// });
