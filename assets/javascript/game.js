var yourCharacter;

function createCharacterBox(character) {
  var charachterHTML =
    '<div id="' +
    character["name"] +
    '"class="mx-1 character-holder d-flex flex-column align-items-center"> <p class="mb-0 character-name">' +
    character["name"] +
    '</p> <img class="character-image w-100" src="' +
    character["imageURL"] +
    '" alt="character image"/><p class="mb-0 character-health-points">' +
    character["healthPoints"] +
    "</p> </div>";
  return charachterHTML;
}

function addCharactersToSelectionArea() {
  for (var i = 0; i < characters.length; i++) {
    $(".select-character-holder")[0].innerHTML += createCharacterBox(
      characters[i]
    );
  }
  $(".your-character-row").toggle();
}
addCharactersToSelectionArea();

$(".character-holder").click(function(event) {
  yourCharacter = event.currentTarget.id;
  $(".select-character-row").toggle();
  $(".your-character-row").toggle();
});
