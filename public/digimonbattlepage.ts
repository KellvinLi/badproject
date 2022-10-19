// Declaration of Class and its methods
class Player {
    private strength: number;
    private name: string;
    constructor(strength: number, name: string) {
        this.strength = strength;
        this.name = name;
        this.strength;
    }

    attack(monster: Monster) {
        let attackMultiplier = Math.random() > 0.8 ? 2 : 1;
        monster.injure(this.strength * attackMultiplier);
        console.log(
            `Player ${this.name} attacks a monster (HP: ${monster.getHp()})   ${attackMultiplier === 1 ? "" : "[CRITICAL]"} `
        );
        if (!monster.isAlive()) {
            this.gainExperience(monster.getExp());
        }
    }
    getName() {
        return this.name;
    }

    gainExperience(exp: number) {
        this.strength += exp;
    }
}

class Monster {
    // Think of how to write
    constructor(private hp: number, private exp: number) {
        this.exp;
    }

    injure(strength: number) {
        if (this.hp - strength < 0) {
            this.hp = 0;
        } else {
            this.hp -= strength;
        }
    }

    // getter / setter
    getHp(): number {
        return this.hp;
    }
    setHp(newHp: number): void {
        this.hp = newHp;
    }
    isAlive(): boolean {
        return this.hp > 0;
    }
    getExp(): number {
        return this.exp;
    }
}

export function play() {
    const player = new Player(20, "Peter");
    const monster = new Monster(100, 1000); // <-

    while (monster.isAlive()) {
        player.attack(monster);
    }
}