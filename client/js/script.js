$(document).ready(() => {
  let prodsCont = $('.products-container');
  let currPage = 1;

  function showProds() {
    $.ajax({
      url: `http://localhost:3005/products?_page=${currPage}`,
      method: 'GET',
      success: response => {
        for (let i = 0; i < response.length; i++) {
          let product = $("<div class='product'></div>");
          const img = `<img src='${response[i].images.primary.large}' alt=' '>`;
          const h2 = `<h2>${response[i].general.name}</h2>`;
          const p = `<p class'id'>${response[i].id}</p>`;
          const input = `<input type='number' name='quantity' min='1' id=''>`;
          const button = `<button>Dodaj</button>`;

          $(product).append(img, h2, p, input, button);
          prodsCont.append(product);
        }
      }
    });
  }

  function showPagination() {
    $('li a').click(e => {
      e.preventDefault();
    })

    $('li a[rel=first]').click(() => {
      prodsCont.empty();
      currPage = 1;
      showProds();
      udatePagination();
    });

    $('li a[rel=prev]').click(() => {
      prodsCont.empty();
      currPage--;
      showProds();
      udatePagination();
    });

    $('li a[rel=next]').click(() => {
      prodsCont.empty();
      currPage++;
      showProds();
      udatePagination();
    });

    $('li a[rel=last]').click(() => {
      prodsCont.empty();
      currPage = 14;
      showProds();
      udatePagination();
    });
  }

  function udatePagination() {
    if (currPage == 1) {
      $('li a[rel=first], li a[rel=prev]').hide();
    } else {
      $('li a[rel=first], li a[rel=prev]').show();
    }

    if (currPage == 14) {
      $('li a[rel=next], li a[rel=last]').hide();
    } else {
      $('li a[rel=next], li a[rel=last]').show();
    }
  }

  showProds(currPage);
  showPagination();
  udatePagination();
});