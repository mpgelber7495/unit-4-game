var yourCharacter;

function createCharacterBox(character, characterClass = "") {
  var charachterHTML =
    '<div id="' +
    character["name"] +
    '"class="mx-1 character-holder ' +
    characterClass +
    ' d-flex flex-column align-items-center"> <p class="mb-0 character-name">' +
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
  $(".enemies-to-attack").toggle();
}
addCharactersToSelectionArea();

function addCharactersToAreaClass(character, areaClass, characterClass) {
  $(areaClass)[0].innerHTML += createCharacterBox(character, characterClass);
}

function selectCharacterByName(selectedCharacterName) {
  for (var i = 0; i < characters.length; i++) {
    if (characters[i]["name"] === selectedCharacterName) {
      return characters[i];
    }
  }
}

function addCharactersToEnemiesToAttackArea(selectedCharacterName) {
  for (var i = 0; i < characters.length; i++) {
    if (characters[i]["name"] !== selectedCharacterName) {
      addCharactersToAreaClass(
        characters[i],
        ".enemies-to-attack",
        "enemies-character-holder"
      );
    }
  }
}

$(".character-holder").click(function(event) {
  yourCharacterName = event.currentTarget.id;
  yourCharacter = selectCharacterByName(yourCharacterName);
  $(".select-character-row").toggle();
  $(".your-character-row").toggle();
  $(".enemies-to-attack").toggle();
  addCharactersToAreaClass(yourCharacter, ".your-character-row");
  addCharactersToEnemiesToAttackArea(yourCharacterName);
});

$(".character-holder").click(function(event) {
  console.log(event);
  console.log(event.currentTarget.id);
  var defenseCharacterName = event.currentTarget.id;
  defenseCharacter = selectCharacterByName(defenseCharacterName);
  console.log(defenseCharacterName);
  console.log("#" + defenseCharacterName);
});
