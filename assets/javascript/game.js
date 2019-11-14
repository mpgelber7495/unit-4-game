var charactersInstant = newCharactersArr();
var yourCharacter;
var isEnemyEngaged = false;
var yourCharacterOriginalAttackPower;
var enemyCharacter;
var isBattleGroundLaunched = false;
var countOfDefeatedEnemies = 0;
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
    '" alt="character image"/><p class="mb-0 character-health-points" id="' +
    character["name"] +
    '-health-points">' +
    character["healthPoints"] +
    " </p> </div>";
  return charachterHTML;
}

$("#restart-button").toggle();

function addCharactersToSelectionArea() {
  for (var i = 0; i < charactersInstant.length; i++) {
    $(".select-character-holder")[0].innerHTML += createCharacterBox(
      charactersInstant[i]
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
  for (var i = 0; i < charactersInstant.length; i++) {
    if (charactersInstant[i]["name"] === selectedCharacterName) {
      return charactersInstant[i];
    }
  }
}

function addCharactersToEnemiesToAttackArea(selectedCharacterName) {
  for (var i = 0; i < charactersInstant.length; i++) {
    if (charactersInstant[i]["name"] !== selectedCharacterName) {
      addCharactersToAreaClass(
        charactersInstant[i],
        ".enemies-to-attack-holder",
        "enemy"
      );
    }
  }
}

// Listen for the selection of yourCharacter and move the rest of the characters to the enemies to attack area
function yourCharacterEventListener() {
  $(".character-holder").click(function(event) {
    if (!yourCharacter) {
      yourCharacterName = event.currentTarget.id;
      yourCharacter = selectCharacterByName(yourCharacterName);
      $(".select-character-holder").html("");
      $(".select-character-row").toggle();
      $(".your-character-row").toggle();
      $(".enemies-to-attack").toggle();
      addCharactersToAreaClass(yourCharacter, ".your-character-holder");
      addCharactersToEnemiesToAttackArea(yourCharacterName);
      yourCharacterOriginalAttackPower = yourCharacter["attackPower"];
    }
  });
}
yourCharacterEventListener();

// Listen for you to select an enemy if isEnemyEngaged is false
$(".enemies-to-attack").on("click", ".enemy", function(event) {
  if (!isEnemyEngaged) {
    var enemyCharacterName = $(this).attr("id");
    enemyCharacter = selectCharacterByName(enemyCharacterName);
    $(this).remove();
    addCharactersToAreaClass(
      enemyCharacter,
      ".battle-ground-container",
      "engaged-enemy"
    );
    if (!isBattleGroundLaunched) {
      $(".battle-ground").toggle();
      isBattleGroundLaunched = true;
    }
    isEnemyEngaged = true;
  }
});

function enemiesFight(yourCharacter, engagedEnemy) {
  var enemyNewHealth =
    engagedEnemy["healthPoints"] - yourCharacter["attackPower"];
  var yourCharacterNewHealth =
    yourCharacter["healthPoints"] - engagedEnemy["attackPower"];
  var yourCharacterNewAttackPower =
    yourCharacter["attackPower"] + yourCharacterOriginalAttackPower;
  engagedEnemy["healthPoints"] = enemyNewHealth;
  yourCharacter["healthPoints"] = yourCharacterNewHealth;
  yourCharacter["attackPower"] = yourCharacterNewAttackPower;
  refreshCharacterHealthPointsOnDOM(yourCharacter);
  refreshCharacterHealthPointsOnDOM(engagedEnemy);
  if (enemyNewHealth <= 0) {
    $("#" + engagedEnemy["name"]).remove();
    countOfDefeatedEnemies++;
    isEnemyEngaged = false;

    if (countOfDefeatedEnemies === charactersInstant.length - 1) {
      $("#restart-button").toggle();
    }
  }
  if (yourCharacterNewHealth <= 0) {
    $("#restart-button").toggle();
    $("#" + yourCharacter["name"] + "-health-points").text(0);
  }
}

function refreshCharacterHealthPointsOnDOM(character) {
  var newHealthPoints = character["healthPoints"];
  var characterID = "#" + character["name"] + "-health-points";
  $(characterID).text(newHealthPoints);
}

function restartGame() {
  charactersInstant = newCharactersArr();
  $("#restart-button").toggle();
  $(".select-character-row").toggle();
  // $(".your-character-row").toggle();
  // $(".enemies-to-attack").toggle();
  $(".your-character-holder").html("");
  yourCharacter = undefined;
  isEnemyEngaged = false;
  yourCharacterOriginalAttackPower;
  enemyCharacter;
  isBattleGroundLaunched = false;
  countOfDefeatedEnemies = 0;
  addCharactersToSelectionArea();
  yourCharacterEventListener();
}
