// A constant for drawing the status bars
const PIXELS_PER_UNIT = 10;

// The hero object is global
var hero = {
    health: 50,
    magic: 50,
    size: 6,
    backpack: [],
    addToBackpack: function (potionObj) {
        // adds a potion to the backpack array
        this.backpack.push(potionObj);
    },
    adjustStat: function (statName, statMod) {
        // update one of this object's properties
        this[statName] += statMod;

        // ensure value never goes below 0
        if (this[statName] < 0) {
            this[statName] = 0;
        }
    },
    removeFromBackpack: function (potionIndex) {
        // splice() cuts out a portion of the array
        // starting at potionIndex, removing 1 item
        this.backpack.splice(potionIndex, 1);
    },
    getPotions: function () {
        // simply returns the backpack array
        return this.backpack;
    }
};

// An array of potion objects
var potionArray = [
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
var currentPotion;

// Clicking on the image opens the chest to reveal a potion
function openChest() {
    // Pick an array index randomly
    var index = Math.floor(Math.random() * potionArray.length);

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

// Prints the stat modification next to the correct stat bar
function drawStatMod(statName, statMod) {
    // Create an ID to locate the correct stat change span
    var spanId = "#" + statName + "Change";

    // How much did the stat change by?
    var changeAmountText = statMod;

    // Prepend a "+" in front of positive numbers
    if (changeAmountText > 0) {
        changeAmountText = "+" + changeAmountText;
    }

    // Put the text in the span
    $(spanId).text(changeAmountText);
}

// Add the potion to the hero's backpack
function savePotion() {
    // Put the potion into the hero's backpack array
    hero.addToBackpack(currentPotion);

    // Rehide the prompt area
    $("#prompt").hide();

    // Update the screen with the drawHero function
    drawHero();
}

// Adjust's the hero's stats according to the potion's properties
function drinkPotion() {
    // Adjust the hero's stat by the potion's modifier
    hero.adjustStat(currentPotion.stat, currentPotion.mod);

    // Update the correct stat amount change area
    drawStatMod(currentPotion.stat, currentPotion.mod);

    // Rehide the prompt area
    $("#prompt").hide();

    // Update the screen with the drawHero function
    drawHero();
}

function drinkSavedPotion(savedPotion, savedPotionIndex) {
    // adjust the right stat of the hero
    hero.adjustStat(savedPotion.stat, savedPotion.mod);

    // Clear out all of the stat bar +/- text areas
    $(".change").text("");

    // Update the correct stat amount change area
    drawStatMod(savedPotion.stat, savedPotion.mod);

    // Remove potion from backpack
    hero.removeFromBackpack(savedPotionIndex);

    drawHero();
}

// Draw the hero's stat bars and backpack contents
function drawHero() {
    // Draw the hero's current stats on the screen
    var healthText = "Health: " + hero.health;
    $("#health").width(PIXELS_PER_UNIT * hero.health).text(healthText);
    var magicText = "Magic: " + hero.magic;
    $("#magic").width(PIXELS_PER_UNIT * hero.magic).text(magicText);
    var sizeText = "Size: " + hero.size;
    $("#size").width(PIXELS_PER_UNIT * hero.size).text(sizeText);

    // Clear out the div for the hero's backpack
    $("#backpack").empty();

    // Get the hero's backpack array
    var heroPotions = hero.getPotions();

    // Loop through the hero's backpack array
    for (var index = 0; index < heroPotions.length; index++) {
        // The hero's backpack contains potion objects
        const aPotion = heroPotions[index];
        // The index of that potion
        const aPotionIndex = index;

        // Use the potion's attribute to find its image source
        var newImage = $("<img>").attr("src", aPotion.image);
        // Add a mouseover style
        newImage.addClass("savedPotion");

        /**
         * When a function is created inside another function,
         * the inner function has access to the outer function's
         * variables. This "snapshot" of the outer function is
         * called a closure.
         *
         * We can create our snapshot that contains two constants:
         * a potion object and that potion's index in the backpack
         * array. Every image gets a unique closure (snapshot)
         * that contains data about its particular potion.
         */

        // Add a click function using a closure
        newImage.click(function() {
            drinkSavedPotion(aPotion, aPotionIndex);
        });

        // Add the image to the div
        $("#backpack").append(newImage);
    }
}

function init() {
    // Add the click listener to the image
    $("#chest").click(openChest);

    // Add click listener to the "Drink" button
    $("#drinkButton").click(drinkPotion);

    // Add click listener to the "Save" button
    $("#saveButton").click(savePotion);

    // Draw the initial status bars
    drawHero();
}

$(init);