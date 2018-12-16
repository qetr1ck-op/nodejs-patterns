import { pipe } from 'rambda'

interface ICharacter {
  health: number
  name: string
}
//🍿
type Constructor<T = {}> = new (...args: any[]) => T

class Character implements ICharacter {
  health = 100
  constructor(public name: string) {}
}
//🍿
const Mover = <TBase extends Constructor<ICharacter>>(Base: TBase) =>
  class extends Base {
    constructor(...args: any[]) {
      super(...args)
    }
    x = 0
    y = 0
    move(x: number, y: number) {
      this.x = x
      this.y = y
      console.log(`${this.name} move x: ${x}, move y: ${y}`)
    }
  }
//🍿
const Slasher = <TBase extends Constructor<ICharacter>>(Base: TBase) =>
  class extends Base {
    slash(direction: string) {
      console.log(`${this.name} slash: ${direction}`)
    }
  }
//🍿
const Shooter = <TBase extends Constructor<ICharacter>>(Base: TBase) =>
  class extends Base {
    private bullets = 6
    shoot(direction: string) {
      if (this.bullets > 0) {
        --this.bullets
        console.log(`${this.name} shoot: ${direction}`)
      }
    }
  }

// 💩
const Samurai = Slasher(Mover(Character))
const Sniper = Shooter(Character)
const Gunslinger = Shooter(Mover(Character))
const WersternSamurai = Slasher(Gunslinger)

const gojiro = new WersternSamurai('Gojiro Kiryu')
gojiro.move(1, 0)
gojiro.slash('left')
gojiro.shoot('right')
