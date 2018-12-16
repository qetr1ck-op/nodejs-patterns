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

const mover = <TBase extends Constructor<ICharacter>>(Base: TBase) =>
  class extends Base {
    x = 0
    y = 0
    move(x: number, y: number) {
      this.x = x
      this.y = y
      console.log(`${this.name} move x: ${x}, move y: ${y}`)
    }
  }

// 🍿
const slasher = <TBase extends Constructor<ICharacter>>(Base: TBase) =>
  class extends Base {
    slash(direction: string) {
      console.log(`${this.name} slash: ${direction}`)
    }
  }
// 🍿
const shooter = <TBase extends Constructor<ICharacter>>(Base: TBase) =>
  class extends Base {
    private bullets = 6
    shoot(direction: string) {
      if (this.bullets > 0) {
        --this.bullets
        console.log(`${this.name} shoot: ${direction}`)
      }
    }
  }

@mover
class Samurai extends Character {}
@shooter
class Sniper extends Character {}
@mover
@shooter
class Gunslinger extends Character {}
@slasher
class WersternSamurai extends Gunslinger {}

// 💩
const gojiro: any = new WersternSamurai('Gojiro Kiryu')
gojiro.move(1, 0)
gojiro.slash('left')
gojiro.shoot('right')
