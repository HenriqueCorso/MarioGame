

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 1.5

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 100
    }
    this.velocity = {
      x: 0,
      y: 0
    }
    this.width = 30
    this.height = 30
  }
  draw() {
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity


  }
}

class Platform {
  constructor({ x, y }) {
    this.position = {
      x,
      y
    }
    this.width = 200
    this.height = 20
  }

  draw() {
    c.fillStyle = "green"
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}

let player = new Player()

let platforms = [
  new Platform({ x: 0, y: 500 }),
  new Platform({ x: 900, y: 500 }),
  new Platform({ x: 100, y: 500 }),
  new Platform({ x: 400, y: 500 }),
  new Platform({ x: 200, y: 100 }),
  new Platform({ x: 500, y: 200 }),
  new Platform({ x: 700, y: 300 }),
  new Platform({ x: 900, y: 200 }),
  new Platform({ x: 1100, y: 100 }),
  new Platform({ x: 1300, y: 300 }),
  new Platform({ x: 1500, y: 400 }),
  new Platform({ x: 1700, y: 100 }),
  new Platform({ x: 2000, y: 300 }),
  new Platform({ x: 2300, y: 400 })
]

const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
}

let scrollOffset = 0

function init() {
  player = new Player()

  platforms = [
    new Platform({ x: 0, y: 500 }),
    new Platform({ x: 900, y: 500 }),
    new Platform({ x: 100, y: 500 }),
    new Platform({ x: 400, y: 500 }),
    new Platform({ x: 200, y: 100 }),
    new Platform({ x: 500, y: 200 }),
    new Platform({ x: 700, y: 300 }),
    new Platform({ x: 900, y: 200 }),
    new Platform({ x: 1100, y: 100 }),
    new Platform({ x: 1300, y: 300 }),
    new Platform({ x: 1500, y: 400 }),
    new Platform({ x: 1700, y: 100 }),
    new Platform({ x: 2000, y: 300 }),
    new Platform({ x: 2400, y: 400 })
  ]


  scrollOffset = 0
}

function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  player.update()
  platforms.forEach(platform => {
    platform.draw()
  })


  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = 5
  } else if (keys.left.pressed && player.position.x > 100) {
    player.velocity.x = -5
  } else {
    player.velocity.x = 0

    if (keys.right.pressed) {
      scrollOffset += 5
      platforms.forEach(platform => {
        platform.position.x -= 5
      })

    } else if (keys.left.pressed) {
      scrollOffset -= 5
      platforms.forEach(platform => {
        platform.position.x += 5
      })

    }
  }


  // platform collision detection
  platforms.forEach(platform => {
    if (player.position.y + player.height <= platform.position.y &&
      player.position.y + player.height + player.velocity.y >= platform.position.y &&
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width
    ) {
      player.velocity.y = 0
    }
  })

  // win condition
  if (scrollOffset > 2000) {
    alert('You WIN')
  }

  //lose condition
  if (player.position.y > canvas.height) {
    init()
  }
}

animate()

addEventListener('keydown', ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      keys.left.pressed = true
      break

    case 83:
      break

    case 68:
      keys.right.pressed = true
      break

    case 87:
      player.velocity.y -= 20
      break
  }

})

addEventListener('keyup', ({ keyCode }) => {
  switch (keyCode) {
    case 65:
      keys.left.pressed = false
      break

    case 83:
      break

    case 68:
      keys.right.pressed = false
      break

    case 87:
      player.velocity.y -= 20
      break
  }

})