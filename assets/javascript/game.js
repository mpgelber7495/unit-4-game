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
  $(".battle-ground").toggle();
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
        ".enemies-to-attack-holder",
        "enemy"
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
  addCharactersToAreaClass(yourCharacter, ".your-character-row-holder");
  addCharactersToEnemiesToAttackArea(yourCharacterName);
});

$(".enemies-to-attack").on("click", ".enemy", function(event) {
  console.log("this", $(this));
  var defenseCharacterName = $(this).attr("id");
  defenseCharacter = selectCharacterByName(defenseCharacterName);
  $(this).remove();
  addCharactersToAreaClass(
    defenseCharacter,
    ".battle-ground-container",
    "engaged-enemy"
  );
  $(".battle-ground").toggle();
});
