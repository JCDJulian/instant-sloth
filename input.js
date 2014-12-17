// Popup code
$(document).ready(function() {
  $("img").click(function() {
  	console.log("test");
    var sloth = $(this).attr('src');
    console.log(sloth);
    var script = 'var form = document.activeElement.value;'+ 'console.log(form);' + 'document.activeElement.value = (form + "'+sloth+'") ;';
    chrome.tabs.executeScript({code : script});
  });
});