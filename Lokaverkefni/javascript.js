var container = document.getElementById("container"); //Bý til container þar sem ég set allt
var ourRequest = new XMLHttpRequest(); //bý til XLMHttpRequest
ourRequest.open('GET', 'http://apis.is/concerts');//Sæki upplýsingarnar af apis.is
ourRequest.onload = function(){ 
    var myData = JSON.parse(ourRequest.responseText);    
    renderHTML(myData); // senda upplýsingarnar til renderHTML function
    onAfterRenderHTML(myData);
}
ourRequest.send();

function renderHTML(data) {  
    var htmlString = ""; // bý til breytu htmlstring
    moment.locale("is"); //Breyti tímasetningu í íslenskan tíma    
    
    var eventHalls = []; //bý til eventHalls array
    for(i = 0; i < data.results.length; i++) { //set eventHallName í eventHalls array
            eventHalls.push(data.results[i].eventHallName);
    }
    
    // Bý til div sem inniheldur text input og takka fyrir leitina
    htmlString += "<div id=\"input-submit\">"
    htmlString += "<input type=\"text\" id=\"searchName\" name=\"searchName\" placeholder=\"Leita af event\" />";
    htmlString += "<input type=\"submit\" id=\"searchSubmit\" value=\"Leita\" />";
    htmlString += "</div>"
    
    jQuery.unique(eventHalls); // nota jquery til að passa að sömu staðsetningarnar komi ekki oftar en einu sinni
    
    // Bý til dropdown selector
    htmlString += "<select name=\"concertSelector\" id=\"concertSelector\">";
    htmlString += "<option value=\"Allt\">Veldu Staðsetningu</option>"
    for(i = 0; i < eventHalls.length; i++) {
        htmlString += "<option value=\"" + eventHalls[i] + "\">" + eventHalls[i] + "</option>";    
    }
    htmlString += "</select>"; // enda select
   
    //Bý til div til að setja allar upplýsingarnar inn í
    htmlString += "<div class=\"theList\">";
    //Fer í gegnum json gögnin og set þau í html streng
    for (i = 0; i < data.results.length; i++) {        
        htmlString +=  "<div><img src=\"" + data.results[i].imageSource + "\" alt=\"poster\"/><p>" + data.results[i].eventDateName +" | "+ data.results[i].name + " | "+ moment(data.results[i].dateOfShow).format("LLLL") + " | " + data.results[i].eventHallName + "</p></div>";
    }
    htmlString += "</div>" // enda theList div
    
    container.insertAdjacentHTML('beforeend', htmlString); // set í container
    
};

function onAfterRenderHTML(data) {
    var htmlString = "";
    $('#concertSelector').change(function() {
        var selectedValue = $('#concertSelector').val(); // tek value úr concertSelector og set það í breytuna selectedValue
        htmlString = "";
        htmlString += "<div class=\"theList\">";
        for (i = 0; i < data.results.length; i++) { 
            if(data.results[i].eventHallName == selectedValue) { //ef selectedValue er sama og eventHallName þá sýni ég bara það
                htmlString +=  "<div><img src=\"" + data.results[i].imageSource + "\" alt=\"poster\"/><p>" + data.results[i].eventDateName +" | "+ data.results[i].name + " | "+ moment(data.results[i].dateOfShow).format("LLLL") + " | " + data.results[i].eventHallName + "</p></div>";    
            }
        else if (selectedValue == "Allt") // annars ef ég set aftur á default þá sýni ég aftur allt
             {
               htmlString +=  "<div><img src=\"" + data.results[i].imageSource + "\" alt=\"poster\"/><p>" + data.results[i].eventDateName +" | "+ data.results[i].name + " | "+ moment(data.results[i].dateOfShow).format("LLLL") + " | " + data.results[i].eventHallName + "</p></div>";
             }
        }
        htmlString += "</div>"
        $("div.theList").replaceWith(htmlString);
    });
    
    $( "#searchSubmit" ).click(function() { // þegar ég ýti á takkann
        var query = $( "#searchName" ).val().trim().toLowerCase(); //tek upplýsingarnar úr searchName text input, og trimma whitespace og set í lowercase
        htmlString = "";
        htmlString += "<div class=\"theList\">";
        for (i = 0; i < data.results.length; i++) {
            var str = data.results[i].eventDateName.trim().toLowerCase(); //set eventDateName í lowercase og trimma whitespace. Set svo í str breytu
            var n = str.search(query); //ber saman það sem er í text input og eventDateName
            
            if(n >= 0) {
                htmlString +=  "<div><img src=\"" + data.results[i].imageSource + "\" alt=\"poster\"/><p>" + data.results[i].eventDateName +" | "+ data.results[i].name + " | "+ moment(data.results[i].dateOfShow).format("LLLL") + " | " + data.results[i].eventHallName + "</p></div>"; 
            }
        }
        htmlString += "</div>"
        $("div.theList").replaceWith(htmlString);
    });
}

