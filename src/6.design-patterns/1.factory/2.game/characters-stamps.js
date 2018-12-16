const stampit = require('stampit')

const Character = stampit({
  props: {
    name: null,
    health: 100
  },
  init({ name }) {
    this.name = name
  }
})

const Mover = stampit({
  methods: {
    move(x, y) {
      this.x = x
      this.y = y
      console.log(`${this.name} move to x: ${this.x}, y: ${this.y}`)
    }
  }
})

const Slasher = stampit({
  methods: {
    slash(direction) {
      console.log(`${this.name} slash: ${direction}`)
    }
  }
})

const Shooter = stampit({
  props: {
    bullets: 6
  },
  methods: {
    shoot(direction) {
      if (this.bullets > 0) {
        --this.bullets
        console.log(`${this.name} shoot: ${direction}`)
      }
    }
  }
})

const Runner = stampit.compose(
  Character,
  Mover
)
const Samurai = stampit.compose(
  Character,
  Mover,
  Slasher
)
const Sniper = stampit.compose(
  Character,
  Shooter
)
//🚀
const Gunslinger = stampit.compose(
  Character,
  Mover,
  Shooter
)
const WesternSamurai = stampit.compose(
  Gunslinger,
  Samurai
)

const gojiro = WesternSamurai('Gojiro Kiryu')
gojiro.move(1, 0)
gojiro.slash('left')
gojiro.shoot('right')
