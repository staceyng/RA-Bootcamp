from random import randint


class Player:
    def __init__(self, name):
        self.hit_points = randint(10, 50)
        self.name = name

    def take_damage(self, damage):
        self.hit_points -= damage
        if self.hit_points <= 0:
            print(f"{self.name} is dead!")
            return False
        return True


class Game:
    def __init__(self):
        self.opponents = []
        self.opponent = None
        self.player = Player("player")

        opponents_count = int(input("how many opponents do you want to fight? "))

        for i in range(opponents_count):
            opponent_name = f"opp_{i+1}"
            self.opponents.append(Player(name=opponent_name))

        self.battle()

    def battle(self):
        self.opponent = self.opponents.pop()
        user_dice_roll = randint(1, 6)
        opponent_dice_roll = randint(1, 6)

        while self.opponent.take_damage(user_dice_roll) and self.player.take_damage(
            opponent_dice_roll
        ):
            print("both still alive")

        keep_going = input("keep fighting? y/n ")
        if keep_going == "y":
            if len(self.opponents) > 0:
                self.battle()
            else:
                print("no more opponents left to fight")
                return
        else:
            self.flee()

    def flee(self):
        print(f"player ended with {self.player.hit_points} hp")
        print(f"remaining opponents: {len(self.opponents)}")


if __name__ == "__main__":
    Game()
