chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    console.log(tabs[0].url);
    var output = tabs[0].url ;               //Fetching the url of active tab
     var xhttp = new XMLHttpRequest();
     var json = {
     	"longUrl" : output
     }
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    	//Fetching the id of shortUrl by using JSON.parse from this.responseText
    	var short =JSON.parse(this.responseText).id;   
    	//To display it in popup.html pass that varible in display id.        
        document.getElementById("display").innerHTML = short;

     //Copy button comes only when the shortUrl is being fetched by the API
    document.getElementById("copy_btn").style.display= 'inline-block';

    var copyBtn = document.querySelector('#copy_btn');
		copyBtn.addEventListener('click', function(event) {              
			event.preventDefault();
    		var urlField = document.querySelector('#display');
    	//we use this range method for p tags
   		// create a Range object
  			var range = document.createRange();  
  		// set the Node to select the "range"
  			range.selectNode(urlField);
  		// add the Range to the set of window selections
  			window.getSelection().addRange(range);
    		var copied = document.execCommand('copy'); 
		})
	}
  };
  //Extracting your Google API key and pass it in the google shortener API
  xhttp.open("POST",  "https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyAWAksq3c8028oIzu1szZUqk8avAas6elY", true);
  xhttp.setRequestHeader("Content-type", "application/json");
  //We always use stringify to send the output variable.
  xhttp.send(JSON.stringify(json));
});