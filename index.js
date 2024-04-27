// console.log('hello')
let root = document.querySelector('.root');
let category = document.querySelector('#category');
let search = document.querySelector('.search');
let priceFilter = document.querySelector('#price-sort');

async function getData(){
    try {
        let res = await fetch('https://fakestoreapi.com/products');
        let finalRes = await res.json();
        console.log(finalRes);
        displayData(finalRes);
    } catch {
        console.log('error');
    }
}

getData();

function displayData(data){
    root.innerHTML = '';
    data.forEach((e)=>{
        let div = document.createElement('div');
        div.className = 'box';

        let image = document.createElement('img');
        image.src = e.image;
        image.className = 'logo';

        let title = document.createElement('h3');
        title.innerText = e.title;

        // let description = document.createElement('p');
        // description.innerText = e.description;

        let category = document.createElement('p');
        category.innerText = e.category;

        let price = document.createElement('h4');
        price.innerText = e.price;

        let rating = document.createElement('p');
        rating.innerText = e.rating.rate;

        let addToCart = document.createElement('button');
        addToCart.innerText = 'Add To Cart';

        let addToFavorite = document.createElement('button');
        addToFavorite.innerText = 'Add To Favorite';

        div.append(image, title, category, price, rating, addToCart, addToFavorite);
        root.append(div);
    })
}

search.addEventListener('change',()=>{
    handleSearch()
})

async function handleSearch(){
    try {
        let value = search.value;
        let res =  await fetch(`https://fakestoreapi.com/products`);
        let finalRes = await res.json();
        // console.log(finalRes);
        finalRes.forEach((e)=>{
            if(e.title === value){
                displayData(`https://fakestoreapi.com/products/${e}`);
            }

        })
    } catch (error) {
        console.log('error in search');
    }
}

priceFilter.addEventListener('change',()=>[
    handlePrice()
])

async function handlePrice(){
    let value = priceFilter.value;
    console.log(value);
    let res = await fetch(`https://fakestoreapi.com/products?sort=desc?${value}`);
    let finalRes = await res.json();
    console.log(finalRes);
}