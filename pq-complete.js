$(document).ready(function () {
    // Add the click listener to the image
    $("#chest").on("click", openChest);

    // Add click listener to the "Drink" button
    $("#drinkButton").on("click", drinkPotion);

    // Add click listener to the "Save" button
    $("#saveButton").on("click", savePotion);

    // Draw the initial status bars
    drawHero();
});

// A constant for drawing the status bars
const PIXELS_PER_UNIT = 10;

// The hero object is global
let hero = {
    health: 50,
    magic: 50,
    size: 6,
    backpack: []
};

// An array of potion objects
let potionArray = [
    {image: "img/blue1.png", name: "Sparkling Blue", stat: "magic", mod: 5},
    {image: "img/red1.png", name: "Bubbling Red", stat: "health", mod: 5},
    {image: "img/green1.png", name: "Tall Green", stat: "size", mod: 1},
    {image: "img/orange1.png", name: "Thick Orange", stat: "magic", mod: -10},
    {image: "img/orange2.png", name: "Glowing Orange", stat: "size", mod: -1},
    {image: "img/pink1.png", name: "Steaming Pink", stat: "magic", mod: 1},
    {image: "img/pink2.png", name: "Smooth Pink", stat: "health", mod: 1},
    {image: "img/poison1.png", name: "Dark Green", stat: "health", mod: -10},
    {image: "img/purple1.png", name: "Boiling Purple", stat: "size", mod: 1}
];

// Needs to be global
let currentPotion;


// Clicking on the image opens the chest to reveal a potion
function openChest() {
    // Pick an array index randomly
    let index = Math.floor(Math.random() * potionArray.length);

    // Use the index to select a random potion
    currentPotion = potionArray[index];

    // Update the prompt area with the current potion
    $("#potionName").text(currentPotion.name);
    $("#currentPotionImg").attr("src", currentPotion.image);

    // Clear out stat changes from previous potion, if any
    $(".change").text("");

    // Make the prompt area visible
    $("#prompt").show();
}

// Add the potion to the hero's backpack
function savePotion() {
    // Put the potion into the hero's backpack array
    hero.backpack.push(currentPotion);

    // Rehide the prompt area
    $("#prompt").hide();

    // Update the screen with the drawHero function
    drawHero();
}

// Adjust's the hero's stats according to the potion's properties
function drinkPotion() {
    // Adjust the hero's stat by the potion's modifier
    hero[currentPotion.stat] += currentPotion.mod;

    // If the stat becomes negative, set it to zero
    if (hero[currentPotion.stat] < 0) {
        hero[currentPotion.stat] = 0;
    }

    // Update the correct stat change area
    let spanId = "#" + currentPotion.stat + "Change";

    // How much did the stat change by?
    let changeText = currentPotion.mod;

    // Prepand a "+" in front of positive numbers
    if (changeText > 0) {
        changeText = "+" + changeText;
    }

    // Put the text in the span
    $(spanId).text(changeText);

    // Rehide the prompt area
    $("#prompt").hide();


    // Update the screen with the drawHero function
    drawHero();
}

// Draw the hero's stat bars and backpack contents
function drawHero() {
    // Draw the hero's current stats on the screen
    let healthText = "Health: " + hero.health;
    $("#health").width(PIXELS_PER_UNIT * hero.health).text(healthText);
    let magicText = "Magic: " + hero.magic;
    $("#magic").width(PIXELS_PER_UNIT * hero.magic).text(magicText);
    let sizeText = "Size: " + hero.size;
    $("#size").width(PIXELS_PER_UNIT * hero.size).text(sizeText);

    // Clear out the div for the hero's backpack
    $("#backpack").empty();

    // Loop through the hero's backpack array
    for (let index = 0; index < hero.backpack.length; index++) {
        // The hero's backpack contains potion objects
        let aPotion = hero.backpack[index];
        // Use the potion's attribute to find its image source
        let newImage = $("<img>").attr("src", aPotion.image);
        // Add the image to the div
        $("#backpack").append(newImage);
    }
}
