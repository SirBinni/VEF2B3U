//console.log(myData.results[0].eventDateName); //dæmi um hvernig skal ná í efni

var container = document.getElementById("container");
var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'http://apis.is/concerts');
ourRequest.onload = function(){
    var myData = JSON.parse(ourRequest.responseText);    
    renderHTML(myData); // senda upplýsingarnar til renderHTML function
}
ourRequest.send();

function renderHTML(data) {  // breyta upplýsingum í HTML og setja það í <p> tag
    var htmlString = "";
    
    for (i = 0; i < data.results.length; i++) {        
        htmlString += "<p>" + data.results[i].eventDateName +" "+ data.results[i].name +" "+ data.results[i].dateOfShow+ "</p>";
    }    
    container.insertAdjacentHTML('beforeend', htmlString);
}

$(function() {
  $('div > p').css('border','solid 2px gray'); //velja öll <p> tög sem eru í <div> tagi 
    alert("hallo");
})

