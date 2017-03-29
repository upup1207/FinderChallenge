/*
  constants and global functions
*/

var JSON_FILE = '/books_schema.json';
var JSON_ARTICLES,complete;

/*
 @method loadJSON
 source: https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
*/
function loadJSON(callback){
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", 'http://localhost:8089/books-schema.json', true);
    xobj.onreadystatechange = function(responseText){
        if(xobj.readyState == 4 && xobj.status == "200"){
            callback(xobj.responseText);
        }

    };
    xobj.send(null);
}
function init() {
 loadJSON(function(response) {
  // Parse JSON string into object
    JSON_ARTICLES = JSON.parse(response);
    html_articles();
    console.log(JSON_ARTICLES);
/*    $.each(JSON_ARTICLES.data.title, function(val) {
        list_tittle.push(val);
        console.log('each de array');
    });*/

/*   for (var i = 0; i <JSON_ARTICLES.data.length; i++) {
        list_tittle.push(JSON_ARTICLES.data.title);
        console.log('each');
    }*/
     });
    console.log('carga todo');
    function html_articles(){
        var list_title = [];
        var out = "",i,cantactual = JSON_ARTICLES.data.length;
        for(i = 0; i < cantactual; i++) {
                list_title.push(JSON_ARTICLES.data[i].title);
                out += '<article><img src="'+JSON_ARTICLES.data[i].image+'"><h2>'+JSON_ARTICLES.data[i].title+'</h2><p>'+JSON_ARTICLES.data[i].teaser+'</p></article>';
        }
        document.getElementById("gr-items-books").innerHTML = out;
        console.log(list_title);
        var input = document.getElementById("myinput");
        complete = new Awesomplete(input,{
        list:list_title,
        minChars: 3,
        maxItems: 7,
        });

    }
}
init();
/*LIST ITEMS OPT EDIT - DELETE*/
function createEdit(){
    $( "#save-ul li" ).each( function(){
        $(this).prepend('<div class="list-items-opt"><span>editar</span><span>eliminar</span></div>');
    });
   /* $(".list-items li").innerHTML = out_edit;*/
    console.log('each');

}
createEdit();
/*LIST ITEMS OPT EDIT - DELETE*/
$(document).ready(function(){

    //how much items per page to show
    var show_per_page = 6;
    //getting the amount of elements inside content div
    var number_of_items = $('#gr-items-books').children().length;
    //calculate the number of pages we are going to have
    var number_of_pages = Math.ceil(number_of_items/show_per_page);

    //set the value of our hidden input fields
    $('#current_page').val(0);
    $('#show_per_page').val(show_per_page);

    //now when we got all we need for the navigation let's make it '

    /*
    what are we going to have in the navigation?
        - link to previous page
        - links to specific pages
        - link to next page
    */
    var navigation_html = '<a class="previous_link" href="javascript:previous();">anterior</a>';
    var current_link = 0;
    while(number_of_pages > current_link){
        navigation_html += '<a class="page_link" href="javascript:go_to_page(' + current_link +')" longdesc="' + current_link +'">'+ (current_link + 1) +'</a>';
        current_link++;
    }
    navigation_html += '<a class="next_link" href="javascript:next();">siguiente</a>';

    $('#page_navigation').html(navigation_html);

    //add active_page class to the first page link
    $('#page_navigation .page_link:first').addClass('active_page');

    //hide all the elements inside content div
    $('#gr-items-books').children().css('display', 'none');

    //and show the first n (show_per_page) elements
    $('#gr-items-books').children().slice(0, show_per_page).css('display', 'block');

});

function previous(){

    new_page = parseInt($('#current_page').val()) - 1;
    //if there is an item before the current active link run the function
    if($('.active_page').prev('.page_link').length == true){
        go_to_page(new_page);
        
    }

}

function next(){
    new_page = parseInt($('#current_page').val()) + 1;
    //if there is an item after the current active link run the function
    if($('.active_page').next('.page_link').length == true){
        go_to_page(new_page);
    }

}
function go_to_page(page_num){
    //get the number of items shown per page
    var show_per_page = parseInt($('#show_per_page').val());

    //get the element number where to start the slice from
    start_from = page_num * show_per_page;

    //get the element number where to end the slice
    end_on = start_from + show_per_page;

    //hide all children elements of content div, get specific items and show them
    $('#gr-items-books').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');

    /*get the page link that has longdesc attribute of the current page and add active_page class to it
    and remove that class from previously active page link*/
    $('.page_link[longdesc=' + page_num +']').addClass('active_page').siblings('.active_page').removeClass('active_page');

    //update the current page input field
    $('#current_page').val(page_num);
}
(function() {
        $('#myinput').keyup(function() {
            $('.btn-src').attr('disabled', $(this).val().length >= 1? false : true);
        });
    })();