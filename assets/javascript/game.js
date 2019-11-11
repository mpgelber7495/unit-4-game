function createCharacterBox(character) {
  var charachterHTML =
    '<div class="mx-1 character-holder d-flex flex-column align-items-center"> <p class="mb-0 character-name">' +
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
    console.log($(".select-character-holder"));
    console.log(createCharacterBox(characters[i]));
    $(".select-character-holder")[0].innerHTML += createCharacterBox(
      characters[i]
    );
  }
}
addCharactersToSelectionArea();
