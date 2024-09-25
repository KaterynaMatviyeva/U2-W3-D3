//https://striveschool-api.herokuapp.com/books
const localStorageKey = "bought-book";
const getBook = function () {
  fetch("https://striveschool-api.herokuapp.com/books", {})
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error");
      }
    })
    .then((libri) => {
      //forEach libro crea col (dove metto la classe, card, tutto quello che ci deve essere nella card) e metti nella row
      const rowLibrary = document.getElementById("row-library");
      libri.forEach((libro) => {
        const colLibrary = document.createElement("div");
        colLibrary.classList.add("col", "col-12", "col-md-6", "col-lg-3");
        colLibrary.innerHTML = `
    <div class="card" >
  <img src="${libro.img}" class="card-img-top" alt="library img">
  <div class="card-body">
    <h5 class="card-title">${libro.title}</h5>
    <p class="card-text">${libro.category}</p>
    <p class="card-text">${libro.price}</p>
     <button id="${libro.title}" class="btnBuy btn btn-primary">Compra ora</button>
     <button id="${libro.title}"  class="btnDiscard btn btn-primary">Scarta</button>
  </div>
</div>`;
        rowLibrary.appendChild(colLibrary);
      });
      const btnBuy = document.querySelectorAll(".btnBuy");
      const btnDiscard = document.querySelectorAll(".btnDiscard");
      btnBuy.forEach((button) => {
        button.addEventListener("click", () => {
          const id = button.id;
          let booksInLocalStorage = localStorage.getItem(localStorageKey);
          if (!booksInLocalStorage) {
            booksInLocalStorage = [];
          } else {
            booksInLocalStorage = JSON.parse(booksInLocalStorage);
          }
          libri.forEach((libro) => {
            if (libro.title === id) {
              booksInLocalStorage.push(libro);
              localStorage.setItem(localStorageKey, JSON.stringify(booksInLocalStorage));
              //crea la lista dentro un carello
            }
          });
        });
      });
      //   btnDiscard.addEventListener("click", () => {});
    })

    .catch((error) => {
      console.log("Error", error);
    });
};

getBook();

//ciclo le row, ciclo le col e creo card all interno ciclando l'array che mi è stato dato?
//faccio tutto a mano?

// genero la lista degli libri nel cart
//svuotare la lista ogni volta anche local?

//dare il d-none alla colonna e non alla card
