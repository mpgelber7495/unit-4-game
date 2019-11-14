// 1. create responses for when someone wins and dies
// 2. Create alerts and responses for game over or game Won
// 4. Switch up the stats on characters
// 5. Styling

var charactersInstant = newCharactersArr();
var yourCharacter;
var isEnemyEngaged = false;
var yourCharacterOriginalAttackPower;
var enemyCharacter;
var isBattleGroundLaunched = false;
var countOfDefeatedEnemies = 0;
var gameIsOver = false;
var didWinOrLossJustOccur = false;
function createCharacterBox(character, characterClass = "") {
  var { name, imageURL, healthPoints } = character;
  return `<div id="${name}" class="mx-3 character-holder ${characterClass} d-flex flex-column align-items-center"> 
    <p class="mb-0 character-name">${name}</p>
    <img class="character-image w-100" src="${imageURL}" alt="character image"/>
    <p class="mb-0 character-health-points" id="${name}-health-points">${healthPoints}</p> </div>`;
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
  if (isEnemyEngaged === false && gameIsOver === false) {
    var enemyCharacterName = $(this).attr("id");
    enemyCharacter = selectCharacterByName(enemyCharacterName);
    $(this).remove();
    $(".battle-ground-container").html("");
    addCharactersToAreaClass(
      enemyCharacter,
      ".battle-ground-container",
      "engaged-enemy"
    );
    $("#fight-description-holder").html("");
    if (!isBattleGroundLaunched) {
      $(".battle-ground").toggle();
      isBattleGroundLaunched = true;
    }
    isEnemyEngaged = true;
  }
});

function enemiesFight(yourCharacter, engagedEnemy) {
  if (gameIsOver === false && engagedEnemy["healthPoints"] > 0) {
    var enemyNewHealth =
      engagedEnemy["healthPoints"] - yourCharacter["attackPower"];
    var yourCharacterNewHealth =
      yourCharacter["healthPoints"] - engagedEnemy["attackPower"];
    var yourCharacterNewAttackPower =
      yourCharacter["attackPower"] + yourCharacterOriginalAttackPower;
    engagedEnemy["healthPoints"] = enemyNewHealth;
    yourCharacter["healthPoints"] = yourCharacterNewHealth;
    yourCharacter["attackPower"] = yourCharacterNewAttackPower;
    fightDescription(yourCharacter, engagedEnemy);
    refreshCharacterHealthPointsOnDOM(yourCharacter);
    refreshCharacterHealthPointsOnDOM(engagedEnemy);
    if (enemyNewHealth <= 0) {
      $("#" + engagedEnemy["name"]).remove();
      $(".battle-ground-container").html(
        "<p class='select-enemy-alert'>Select another enemy!</p>"
      );
      countOfDefeatedEnemies++;
      isEnemyEngaged = false;

      if (countOfDefeatedEnemies === charactersInstant.length - 1) {
        isEnemyEngaged = false;
        gameIsOver = true;
        $("#restart-button").toggle();
        gameWon();
      }
    }
    if (yourCharacterNewHealth <= 0) {
      $("#restart-button").toggle();
      $("#" + yourCharacter["name"] + "-health-points").text(0);
      gameIsOver = true;
      gameLost();
    }
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
  $(".your-character-holder").html("");
  $(".battle-ground-container").html("");
  if (didWinOrLossJustOccur === true) {
    $(".battle-ground").toggle();
    $(".enemies-to-attack").toggle();
    $("#main-heading-holder").text("Your Character");
  }
  yourCharacter = undefined;
  isEnemyEngaged = false;
  yourCharacterOriginalAttackPower;
  enemyCharacter;
  isBattleGroundLaunched = false;
  countOfDefeatedEnemies = 0;
  gameIsOver = false;
  addCharactersToSelectionArea();
  yourCharacterEventListener();
}

function fightDescription(yourCharacter, engagedEnemy) {
  var fightText =
    yourCharacter["name"] +
    " " +
    attackNames[Math.floor(Math.random() * attackNames.length)] +
    " " +
    engagedEnemy["name"] +
    " causing " +
    yourCharacter["attackPower"] +
    " in damage! <br> " +
    engagedEnemy["name"] +
    " retaliated and " +
    attackNames[Math.floor(Math.random() * attackNames.length)] +
    " " +
    yourCharacter["name"] +
    " causing " +
    engagedEnemy["attackPower"] +
    " in damage - OUCH!";
  $("#fight-description-holder").html(fightText);
}

function gameWon() {
  $(".battle-ground").toggle();
  $(".enemies-to-attack").toggle();
  didWinOrLossJustOccur = true;
  $("#main-heading-holder").html(yourCharacter["name"] + " WON!!");
  $("#" + yourCharacter["name"]).append(crown);
}

function gameLost() {
  $(".battle-ground").toggle();
  $(".enemies-to-attack").toggle();
  didWinOrLossJustOccur = true;
  $("#main-heading-holder").html("YIKES - you lost!!!");
  $("#" + yourCharacter["name"]).append(cross);
}
