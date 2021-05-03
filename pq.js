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
let hero = {};

// An array of potion objects
let potionArray = [
    {image: "img/blue1.png", name: "Sparkling Blue", stat: "magic", mod: 5}
];

// Needs to be global
let currentPotion;

// Clicking on the image opens the chest to reveal a potion
function openChest() {

}

// Add the potion to the hero's backpack
function savePotion() {

}

// Adjust's the hero's stats according to the potion's properties
function drinkPotion() {

}

// Draw the hero's stat bars and backpack contents
function drawHero() {

}