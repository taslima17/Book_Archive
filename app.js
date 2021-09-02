
/* Call search button function */

const search_button = () => {
    showSpinner("block");
    const input = document.getElementById('input');
    const searchText = input.value;

    input.value = '';
    const BookContainer = document.getElementById('Book-info-container');
    BookContainer.textContent = '';
    const NumberOfResult = document.getElementById('no-of-result');
    NumberOfResult.textContent = '';

    /*  checking search Input and fetch Url */

    if (searchText === '') {

        NumberOfResult.innerHTML = `Please Enter Book Name`;
        showSpinner('none');
    }
    else {
        const url = `https://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => Display(data))
            .catch(e => {

                NumberOfResult.innerHTML = `No result found`;
                showSpinner('none');
            })
    }
}

/* spinner display function */

const showSpinner = (value) => {
    document.getElementById('spinner').style.display = value;
}

/* display searched data */

const Display = (data) => {
    let Length = data.docs.length;
    const NumberOfResult = document.getElementById('no-of-result');

    /* searched information number */

    if (Length == 0) {
        NumberOfResult.innerHTML = `No result found`;
    }
    else {
        if (Length > 40) {
            Length = 40;
            NumberOfResult.innerHTML = `${data.numFound} results found and here showing ${Length} results`;
        }
        else {
            NumberOfResult.innerHTML = `${data.numFound} results found and here showing ${Length} results`;
        }

    }

    const BookContainer = document.getElementById('Book-info-container');
    BookContainer.textContent = '';
    const Bookdata = data.docs;
    const BookList = Bookdata.slice(0, 40);


    /* display searched items using forEach  */

    BookList.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('col');

        let imgVal = "";
        let author = '';
        let published = '';
        let subjects = '';
        let publisher = '';

        /*   checking subjects */

        if (item.subject == undefined) {
            subjects = "subject not found";
        }
        else {
            subjects = item.subject.join(", ");
        }

        /* Checking publishing year */

        if (item.first_publish_year === undefined) {
            published = "year not found"
        }
        else {
            published = item.first_publish_year;
        }

        /* checking Author */

        if (item.author_name === undefined) {
            author = "Author name unavailable";
        }
        else {
            author = item.author_name.join(',');
        }
        /* checking publisher */

        if (item.publisher === undefined) {
            publisher = "publisher name unavailable";
        }
        else {
            publisher = item.publisher;
        }

        /* checking cover photo */

        if (item.cover_i === undefined) {
            imgVal = "default.png"
        }
        else {
            imgVal = `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`;
        }

        /* setting data in html using  card */

        div.innerHTML = `<div class="card h-100 border border-0 ">
        <img src="${imgVal}" class="card-img-top h-50  " alt="...">
        <div class="card-body">
          <p class="card-title"><strong>Book Name:</strong>${item.title}</p>
          <p class="card-text"><strong>Author:</strong>${author}</p>
          <p class="card-text"><strong>Publisher:</strong>${publisher}</p>
          <p class="card-text"><strong>First Published:</strong>${published}</p>
          <p class="card-text"><strong>Subjects:</strong>${subjects}</p>
        </div>
      </div>`;
        BookContainer.appendChild(div);
    })
    showSpinner('none');

}