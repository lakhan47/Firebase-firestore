

const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create element & render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');
    
    li.setAttribute('date-id',doc.id);
    
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    cafeList.appendChild(li);

    //deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = doc.id;
        mainid = id;
        
        db.collection('cafe').doc(id).delete();
    });
}


//Getting Data
//collection('cafe').orderBy('city')get().then(snapshot => {
// snapshot.docs.forEach(doc => {
//     renderCafe(doc);
// });
//


//Saving Data
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    db.collection('cafe').add({
        name: form.name.value,
        city: form.city.value
    });
    form.name.value = '';
    form.city.value = '';
});

//real-time listener
db.collection('cafe').orderBy('city').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        
        
        if(change.type == 'added'){
            renderCafe(change.doc);
        } else if (change.type == 'removed'){
            let li = cafeList.querySelector('[date-id=' + change.doc.id +']');
            
            cafeList.removeChild(li);
            
        }
    });
});