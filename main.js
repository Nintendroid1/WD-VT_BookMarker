let myForm = document.getElementById('myForm').addEventListener('submit',saveBookmark);
//console.log(myForm);

//Save Bookmark
function saveBookmark(e) {
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;

    let bookmark = {
        name: siteName,
        url: siteUrl
    };

    //Local Storage Test
    /*localStorage.setItem('test', 'Hello World');
    localStorage.getItem('test');
    localStorage.removeItem('test');*/

    if(localStorage.getItem('bookmarks') === null) {
        //Init array
        let bookmarks = [];
        //Add to array
        bookmarks.push(bookmark);
        //Set to local storage
        localStorage.setItem('bookmarks', JSON. stringify(bookmarks));
    } else {
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        //Reset back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //Re-fetch bookmarks
    fetchBookmarks();

    e.preventDefault();
}

function deleteBookmark(url) {
    //Get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //loop through bookmarks
    for(let i=0; i<bookmarks.length; i++) {
        if(bookmarks[i].url == url) {
            //Remove from array
            bookmarks.splice(i, 1);
        }
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //Re-fetch bookmarks
    fetchBookmarks();
}

function fetchBookmarks() {
    //Get bookmarks from localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    let bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = " ";

    for (let i=0; i < bookmarks.length; i++) {
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="list-group-item p-4">' +
        '<h4>' + name + '<a class="btn btn-outline-secondary ml-2" target="_blank" href="' + url +'">Visit</a>'
        +'<a class="btn btn-outline-danger ml-2" onclick="deleteBookmark(\'' + url + '\')">Delete</a>'
        + '</h4>'
        + '</div>';
    }
}