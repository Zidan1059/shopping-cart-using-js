let shop = document.getElementById("shop");
let basket = JSON.parse(localStorage.getItem("data")) || [];
// let inStock = () => {

//   console.log(a);
// };
// inStock();
let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      return ` <div id= product-id-${id}
      class="item">
    <img id="img" width="100%" src="${img}" alt="" />
    <div class="details">
      <h3>${name}</h3>
      <p>In Stock: ${desc}</p>
      <div class="price-quantity">
        <h2>$ ${price}</h2>
        <div class="buttons">
          <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
          <div id=${id} class="quantity">${
        search.item === undefined ? 0 : search.item
      }</div>
          <i onclick="increment(${id},${desc})" class="bi bi-plus-lg"></i>
        </div>
      </div>
    </div>
  </div>`;
    })
    .join(""));
};
generateShop();

let increment = (id, desc) => {
  // let { id, desc } = product;
  console.log(desc);

  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
    search = {
      item: 0,
    };
  } else if (search.item < desc) {
    search.item += 1;
  } else {
    search.item = desc;
    window.alert("Sorry..!!! No more stock available");
  }

  if (search.item <= desc) {
    update(selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
  } else {
    window.alert("Sorry..!!! Stock is over");
  }

  //console.log(search.item);
  // let a = shopItemsData.map((x) => {
  //   x.desc === selectedItem.id;
  // });
  // console.log(a);
  // // console.log(selectedItem.desc);
  // let count = basket.find((x) => x.desc === selectedItem.id);
  // //if(search.item )

  //count();

  //console.log(basket);
};
// let count = () => {
//   let a = shopItemsData.desc;
//   console.log(a);

//   console.log(basket);
// };
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);

  basket = basket.filter((x) => x.item !== 0);

  localStorage.setItem("data", JSON.stringify(basket));

  //console.log(basket);
};
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  let count = search.item;
  document.getElementById(id).innerHTML = count;
  // let a = shopItemsData.map((x) => {
  //   let desc = x.desc;
  //   let id = x.id;
  //   console.log(desc, id);
  //   //return x.desc;
  // });

  //console.log(a);
  //console.log(id);
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");

  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
calculation();
