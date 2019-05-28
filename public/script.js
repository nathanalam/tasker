var json = null;
var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://www.google.com/', true);
xhr.withCredentials = true;
xhr.onreadystatechange = function() {
    if (xhr.readyState === 2) {
        console.log(this.response);
    }
}
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(json);