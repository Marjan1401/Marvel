var charactersElement = document.querySelector('.container');
var characterURL="http://gateway.marvel.com/v1/public/characters?ts=1&apikey=0f50323c12c8027547bcb4b32205f86f&hash=79a67077179f1a5a162d6c88ec18ea9b";


function getMarvel(){
 if (localStorage.Marvel) {
   return Promise.resolve(JSON.parse(localStorage.Marvel));
 }


return fetch(characterURL)
.then(response => response.json())
.then(data =>{
 localStorage.Marvel =JSON.stringify(data);
 return data;
 //  console.log(data);
});
}

var hidenCharacter = {
  1010846 :true
};


function addCharacterToPage(Marvel) {
  console.log(Marvel.data.results);
  Marvel.data.results.forEach(result => {
    if(!hidenCharacter[result.id]){
     console.log(result.thumbnail.path + '/portrait_fantastic.jpg');
   var characterImage = result.thumbnail.path + '/portrait_fantastic.jpg';
   var characterElement = document.createElement('div');
   var imageElement = document.createElement('img');
 
   imageElement.src =characterImage;
 
   var linkElement = document.createElement('a');
   linkElement.setAttribute('href', result.urls.filter(url => url.type == 'detail')[0].url);
   linkElement.setAttribute('target', '_blank');
   linkElement.appendChild(imageElement);
 
   charactersElement.appendChild(linkElement);
   characterElement.appendChild(linkElement);
 
   var characterName = result.name;
   var charaterNameElement = document.createElement('h3');
   charaterNameElement.textContent = characterName;
   characterElement.appendChild(charaterNameElement);
 
   charactersElement.appendChild(characterElement);
 }
  });
}



$(function(){

 setTimeout(() => {
   $("#loading").css("display", "none");
 }, 2000);
 

});
getMarvel()
.then(addCharacterToPage);
