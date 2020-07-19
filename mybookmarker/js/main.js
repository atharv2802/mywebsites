// listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBm);

// save bookmark
function saveBm(e){
    // get form value
    var sitename = document.getElementById('siteName').value;

    var siteurl = document.getElementById('siteUrl').value;

    if(!validateForm(sitename, siteurl)){
        return false;
      }

    var bm = {
        name: sitename,
        url: siteurl
    }

    if(localStorage.getItem('bookmarks') === null){
        var bookmarks = [];
        bookmarks.push(bm);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bm);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // clear forms
    document.getElementById('myForm').reset();

    fetchBm();
    
    // prevent default actions
    e.preventDefault();
}

function deleteBm(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for (var i = 0; i < bookmarks.length; i++) {
        if(bookmarks[i].url == url){
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBm();
}


// fetch bookmarks
function fetchBm(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var lbmresult = document.getElementById('leftbookmarksResults');
    var rbmresult = document.getElementById('rightbookmarksResults');

    lbmresult.innerHTML = '';
    rbmresult.innerHTML = '';

    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

         if (i % 2 === 0) {
            rbmresult.innerHTML += 
        '<div class="well">' +
        '<h3>' +name+ 
          '<a href="'+addhttp(url)+'" class="btn btn-default space" target="_blank">VISIT</a>' +
          '<a href="#" class="btn btn-danger space"  onclick = "deleteBm(\''+url+'\')">DELETE</a>' +
        '</h3>' +
        '</div>';   
        }
        else {
            lbmresult.innerHTML += 
            '<div class="well">' +
            '<h3>' +name+ 
              '<a href="'+addhttp(url)+'" class="btn btn-default space" target="_blank">VISIT</a>' +
              '<a  class="btn btn-danger space"  onclick = "deleteBm(\''+url+'\')">DELETE</a>' +
            '</h3>' +
            '</div>';
        }       
    }
}

function validateForm(sitename, siteurl){
    if(!sitename || !siteurl){
      alert('Please fill in the form');
      return false;
    }
  
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
  
    if(!siteurl.match(regex)){
      alert('Please use a valid URL');
      return false;
    }
  
    return true;
  }

  function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "http://" + url;
    }
    return url;
  }