function newCharactersArr() {
  return [
    {
      name: "Mike",
      healthPoints: 140,
      attackPower: 6,
      counterAttackPower: 20,
      imageURL: "./assets/images/mike_image.png"
    },
    {
      name: "Rafi",
      healthPoints: 140,
      attackPower: 6,
      counterAttackPower: 20,
      imageURL: "./assets/images/rafi_image.png"
    },
    {
      name: "Paul",
      healthPoints: 140,
      attackPower: 6,
      counterAttackPower: 20,
      imageURL: "./assets/images/paul_image.png"
    },
    {
      name: "John",
      healthPoints: 140,
      attackPower: 6,
      counterAttackPower: 20,
      imageURL: "./assets/images/john_image.png"
    }
  ];
}

var attackNames = [
  "funk-hauser kicked",
  "curb stomped",
  "slam dunked",
  "defenistrated",
  "dumpling manned",
  "quantized",
  "radeghasted",
  "exfoliated",
  "quentin tarantino'd",
  "posed a strongly worded argument to",
  "karate chopped",
  "gave a bad haircut to",
  "pterodactyl'd",
  "gave a stern talking to",
  "lectured",
  "parma-steved",
  "soccum-bopped",
  "will ferrell'd",
  "arm wrestled",
  "chinchilla'd",
  "hexed",
  "cried to",
  "falcon punched",
  "new jersey'd",
  "baltimore'd",
  "sub-leased",
  "medical-schooled",
  "chicken pot-pie'd",
  "scrap booked with",
  "split chilli on",
  "vented about work to",
  "defrauded"
];

var crown = $('<img id="crown" class="w-100 position-relative">');
crown.attr("src", "../assets/images/crown.png");
