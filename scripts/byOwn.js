//create a function to fetch API

function loadCategories(){
    //1-fetch the data 
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    // 2. convert promise to json
    .then(res => res.json())
    //send data to displayCategory function
    .then(data => displayCategories(data.categories))
}


const displayCategories = (categories) =>{
    // get the category container 
    const categoryContainer = document.getElementById('category-container');
    //loop operation to get category
    for(let cat of categories){
        // create an element 
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
             <button class="btn btn-sm hover:bg-red-600 hover:text-white">${cat.category}</button>
        `;
        // append to container 
        categoryContainer.appendChild(categoryDiv)

    }
}
loadCategories();