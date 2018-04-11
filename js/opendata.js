$("#resultat").hide();
$("#anounce").hide();

$(document).ready(function() {

function ajaxGet(url, callback) {

var req = new XMLHttpRequest();

req.open("GET", url);

req.addEventListener("load", function () {

    if (req.status >= 200 && req.status < 400) {

        // Appelle la fonction callback en lui passant la réponse de la requête

        callback(req.responseText);

    } else {

        console.error(req.status + " " + req.statusText + " " + url);

    }

});

req.addEventListener("error", function () {

    console.error("Erreur réseau avec l'URL " + url);

});

req.send(null);

}
// Accès à la météo de Lyon avec la clé d'accès 50a65432f17cf542

// var reponse = new XMLHttpRequest();
// reponse.open('GET', "https://opendata.hauts-de-seine.fr/api/records/1.0/search/?dataset=archives-de-la-planete&sort=identifiant_fakir&facet=operateur&facet=themes&facet=lieu_retraite", false);
// reponse.send(null);
// var data = JSON.parse(reponse.responseText);
// console.log(data);




$("#oeuvre").one("click", function oeuvres() {

            $("#oeuvre").hide();
            //document.getElementById("oeuvre").innerHTML = technique;
            $("#question").hide();

            var nom = document.getElementById("nom").value;

            if (nom == "") {
                alert("Vous devez rentrer votre prénom pour que la formule fonctionne ;)");
                location.reload(); 
            } else { 

            var number = Math.floor(Math.random() * (100 - 80 + 1) ) + 80;
            var percent = document.createElement("P");                       // Create a <p> element
            var name = document.createTextNode(nom+", vous et votre oeuvre êtes compatibles à : "+number+"%");      // Create a text node
            percent.appendChild(name);                                          // Append the text to <p>
            document.getElementById("anounce").appendChild(percent); 

            var link = document.createElement("A");  
            link.setAttribute("class", "btn back");
            link.setAttribute("href", "index.html");
            var text_button = document.createTextNode("Recommencer");
            link.appendChild(text_button);  
            document.getElementById("anounce").appendChild(link);   


            var min = 0;
            var max = 15;
            
            ajaxGet("https://opendata.hauts-de-seine.fr/api/records/1.0/search/?dataset=archives-de-la-planete&sort=identifiant_fakir&facet=operateur&facet=themes&facet=lieu_retraite&rows="+max, function (reponse) {

                var oeuvre = JSON.parse(reponse);
                var index = Math.floor(Math.random()*max + 0.5); 
                console.log(index);    
                // Récupération de certains résultats
                var legende = oeuvre.records[index].fields.legende_revisee;
                var date = oeuvre.records[index].fields.date_de_prise_de_vue;
                var technique = oeuvre.records[index].fields.procede_technique;
                var image = oeuvre.records[index].fields.photo.id;
                var url = "https://opendata.hauts-de-seine.fr/explore/dataset/archives-de-la-planete/files/"+image+"/300"
                // var date = oeuvre.records;
                // Affichage des résultats
                // var conditionsElt = document.createElement("div");
                // conditionsElt.textContent = "Titre :" + oeuvre +
                //     "date :" + date;
                // var oeuvreElt = document.getElementById("oeuvre");
                // oeuvreElt.appendChild(conditionsElt);
                // console.log(oeuvres);

                var para = document.createElement("P");                       // Create a <p> element
                var t = document.createTextNode(legende+", "+date+", "+technique);      // Create a text node
                para.appendChild(t);                                          // Append the text to <p>
                document.getElementById("resultat").appendChild(para);           // Append <p> to <div> with id="myDIV" 

                /*var para1 = document.createElement("P");                       // Create a <p> element
                var t1 = document.createTextNode(date);      // Create a text node
                para1.appendChild(t1);                                          // Append the text to <p>
                document.getElementById("resultat").appendChild(para1);           // Append <p> to <div> with id="myDIV" 

                var para2 = document.createElement("P");                       // Create a <p> element
                var t2 = document.createTextNode(technique);      // Create a text node
                para2.appendChild(t2);                                          // Append the text to <p>
                document.getElementById("resultat").appendChild(para2); */ 

                // Append <p> to <div> with id="myDIV" 
                var im = document.createElement("IMG");  
                im.setAttribute("src", url);
                im.setAttribute("width", "60%");
                im.setAttribute("height", "auto");
                im.setAttribute("alt", legende); 
                document.getElementById("resultat").appendChild(im);                  // Create a <p> element     // Create a text node                                        // Append the text to <p>
                //document.getElementById("resultat").appendChild(image); 




                $("#anounce").show();
                $("#resultat").show();
                
                });

     }; 

});

} );
