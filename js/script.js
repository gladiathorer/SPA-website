var homeHtml = "index.html";

var insertHtml = function (selector, html){
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};


var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
    .replace(new RegExp(propToReplace, "g"), propValue);
  return string;
}


var showLoading = function (selector) {
  var html = '<div class="spinner-grow text-success" role="status"><span class="visually-hidden">Loading...</span></div>';
  insertHtml(selector,html);
};


document.addEventListener("DOMContentLoaded", function (event){

$ajaxUtils.sendGetRequest(
  'json/db.json',
  function (articles){
    //articles object
    $ajaxUtils.sendGetRequest('snippets/card.html',
      function (cardHtml){
        var cardsHtml = buildCardsHtml(articles,cardHtml);
        insertHtml("#main-content",cardsHtml);
      },false);
    
  });

});
var buildCardsHtml = function (articles, cardHtml){
  newHtml = '';
  for (var i = 0; i < articles.length; i++){
          html = cardHtml;
          html = insertProperty(html,"card-title",articles[i].cardtitle);
          html = insertProperty(html, "imgsrc", articles[i].imgsrc);
          html = insertProperty(html, "card-content", articles[i].cardcontent);
          html = insertProperty(html, "last-updated", articles[i].lastupdated);
          newHtml += html;
        }
        return newHtml;
};
