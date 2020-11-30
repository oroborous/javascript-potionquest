$(document).ready(function () {
    $("button").click(getTreasure);

    var hero = {
        name: "Stacy the Bold",
        health: 50,
        maxHealth: 50,
        magic: 25,
        maxMagic: 25,
        backpack: [],
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

    displayHero();

    function getTreasure() {
        var clickedButton = $(this);

        var itemDescription = clickedButton.text();

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
        $("#heroName").text(hero.name);
        $("#currentHealth").text(hero.health);
        $("#currentMagic").text(hero.magic);
        $("#backpackContents").text(hero.backpack.join(", "));
    }
});