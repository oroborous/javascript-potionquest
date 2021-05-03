$(document).ready(function () {
    $("button").on("click", getTreasure);

    displayHero();
});

let hero = {
    name: "Stacy the Bold",
    health: 42,
    maxHealth: 50,
    magic: 17,
    maxMagic: 25,
    backpack: [],
    getDisplayHealth: function () {
        let percent = Math.round(this.health / this.maxHealth * 100);
        return `${this.health} / ${this.maxHealth} (${percent}%)`;
    },
    getDisplayMagic: function () {
        let percent = Math.round(this.magic / this.maxMagic * 100);
        return `${this.magic} / ${this.maxMagic} (${percent}%)`;
    },
    addTreasure: function (item) {
        this.backpack.push(item);
    },
    adjustHealth: function (amount) {
        amount = Math.min(this.maxHealth, this.health + amount);
        amount = Math.max(0, amount);
        this.health = amount;
    },
    adjustMagic: function (amount) {
        amount = Math.min(this.maxMagic, this.magic + amount);
        amount = Math.max(0, amount);
        this.magic = amount;
    }
};

function getTreasure() {
    // Which button was clicked?
    let clickedButton = $(this);

    // Get the text between the tags
    // (.text() works like a getter method)
    let itemDescription = clickedButton.text();

    // hero.backpack.push(itemDescription);
    hero.addTreasure(itemDescription);

    switch (itemDescription) {
        case "Cursed mirror":
            // hero.magic = Math.max(0, hero.magic - 5);
            hero.adjustMagic(-5);
            break;
        case "Lightning gem":
            // hero.magic = Math.min(hero.maxMagic, hero.magic + 5);
            hero.adjustMagic(5);
            break;
        case "Vial of poison":
            // hero.health = Math.max(0, hero.health - 5);
            hero.adjustHealth(-5);
            break;
        case "Bandages":
            // hero.health = Math.min(hero.maxHealth, hero.health + 5);
            hero.adjustHealth(5);
            break;
    }

    displayHero();
}

function displayHero() {
    $("td#heroName").text(hero.name);
    $("td#currentHealth").text(hero.getDisplayHealth());
    $("td#currentMagic").text(hero.getDisplayMagic());
    $("td#backpackContents").text(hero.backpack.join(", "));
}
