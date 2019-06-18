$(document).ready(() => {
  const prodsCont = $('.products-container');
  const searchResultElem = $('.search-results');
  const warningTextElem = $('.warning-text');

  let currPage = 1;
  let product;

  function showProds() {
    $.ajax({
      url: `http://localhost:3005/products?_page=${currPage}`,
      method: 'GET',
      success: response => {
        for (let i = 0; i < response.length; i++) {
          product = $("<div class='product'></div>");

          const img = `<img src='${response[i].images.primary.large}' alt=' ' title='${response[i].general.name}'>`;
          const h2 = `<h2 title='${response[i].general.name}'>${response[i].general.name}</h2>`;
          const p = `<p class='id'>Product ID: ${response[i].id}</p>`;
          const div = $("<div class='add_to_cart'>Number of items: </div>");
          const input = `<input type='number' name='quantity' min='1' id='' value='1'>`;
          const button = `<button type='button' class='btn btn-danger'>Add To Cart</button>`;

          div.append(input, button);
          product.append(img, h2, p, div);
          prodsCont.append(product);

          product.find('img, h2').click(() => {
            $('.modal-header img').attr('src', `${response[i].images.primary.large}`);
            $('.modal-header h5').text(`${response[i].general.name}`);
            $('.modal-header p.brand span').text(`${response[i].brand.name}`);
            $('.modal-body p.id span').text(`${response[i].id}`);
            $('.modal-body div.description').html(`${response[i].general.description}`);
            $('#productDetailModal').modal();
          });
        }

        let numbOfProdInBask = 0;
        const inputElems = $('.add_to_cart input');
        const numbOfProdInBaskElem = $('header .number-of-prods');

        $('.add_to_cart button').click(function () {
          const inputVal = parseInt($(this).prev().val());
          numbOfProdInBask += inputVal;
          numbOfProdInBaskElem.text(numbOfProdInBask);
          inputElems.val(1);
        });
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

  function searchProducts() {
    const query = $('.search-box input').val();
    const numOfProdsElem = $('.search-results-box .numb-of-prods');

    if (query.length >= 3) {
      $.ajax({
        url: `http://localhost:3005/products?q=${query}&_limit=140`,
        method: 'GET',
        success: response => {
          warningTextElem.hide();
          searchResultElem.show();
          numOfProdsElem.text(response.length);
          $('.search-results .query').text(query);
        }
      });

    } else {
      searchResultElem.hide();
      warningTextElem.show();
    }
  }

  showProds();
  showPagination();
  udatePagination();

  $('.search-box button').click(e => {
    e.preventDefault();
    searchProducts();
  })

  searchResultElem.add(warningTextElem).hide();

  if ($(window).width() <= 640) {
    let isTextNode = (_, el) => el.nodeType === Node.TEXT_NODE;
    $('.pagination a').contents().filter(isTextNode).remove();
  }
});