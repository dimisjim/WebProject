function getAjaxRequest() {

}

function loadJSONDoc(xhttp, url, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
            var data = JSON.parse(httpRequest.responseText);
            if (callback) callback(data);
            document.getElementById("p1").innerHTML = data.paragraph1;
            document.getElementById("p2").innerHTML = data.paragraph2;
            document.getElementById("p3").innerHTML = data.paragraph3;
            document.getElementById("p4").innerHTML = data.paragraph4;
            document.getElementById("p5").innerHTML = data.paragraph5;
            document.getElementById("p6").innerHTML = data.paragraph6;
            document.getElementById("p7").innerHTML = data.paragraph7;
            document.getElementById("p8").innerHTML = data.paragraph8;
        }
    }
  };
  httpRequest.open('GET', url);
  httpRequest.send();
}
