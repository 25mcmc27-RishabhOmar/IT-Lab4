let booksJSON = [];

$(document).ready(function(){

$.ajax({
url:"books.xml",
dataType:"xml",

success:function(data){

let genres=new Set();

$(data).find("book").each(function(){

let book={
title:$(this).find("title").text(),
author:$(this).find("author").text(),
genre:$(this).find("genre").text(),
price:parseFloat($(this).find("price").text()),
date:$(this).find("date").text()
};

booksJSON.push(book);
genres.add(book.genre);

});

genres.forEach(function(g){
$("#genreFilter").append(`<option value="${g}">${g}</option>`);
});

renderTable(booksJSON);

}

});

$("#genreFilter,#authorFilter,#minPrice,#maxPrice").on("input change",function(){
applyFilters();
});

});


function renderTable(data){

let tbody=$("#bookTable tbody");
tbody.empty();

data.forEach(function(book){

let row=`
<tr>
<td>${book.title}</td>
<td>${book.author}</td>
<td><span class="badge bg-primary">${book.genre}</span></td>
<td>₹${book.price}</td>
<td>${book.date}</td>
</tr>
`;

tbody.append(row);

});

}


function applyFilters(){

let genre=$("#genreFilter").val();
let author=$("#authorFilter").val().toLowerCase();
let min=parseFloat($("#minPrice").val())||0;
let max=parseFloat($("#maxPrice").val())||Infinity;

let filtered=booksJSON.filter(function(book){

return (genre==="all"||book.genre===genre) &&
(book.author.toLowerCase().includes(author)) &&
(book.price>=min && book.price<=max);

});

renderTable(filtered);

}