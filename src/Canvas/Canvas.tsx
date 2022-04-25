import { Layer } from './Layer'
import { Loop } from './Loop'

interface Rect {
  x: number
  y: number
  width: number
  height: number
  vx: number
  vy: number
  color: string
}

function getRandomColor(): string {
  return '#' + (0x1000000 + Math.floor(Math.random() * 0x1000000)).toString(16).slice(1)
}

export class Canvas {
  layer: Layer
  rectsArr: Array<Rect>

  constructor(container: HTMLElement) {
    this.layer = new Layer(container)
    this.rectsArr = new Array(10)
                    .fill(0)
                    .map(e => this.addRect(100, getRandomColor()))

    new Loop(this.update.bind(this), this.display.bind(this))
  }
  addRect(velocity: number, color: string): Rect {
    return {
      x: Math.ceil(Math.random() * this.layer.w),
      y: Math.ceil(Math.random() * this.layer.h),
      width: 10,
      height: 10,
      vx: Math.ceil(Math.random() * 2 * velocity - velocity),
      vy: Math.ceil(Math.random() * 2 * velocity - velocity),
      color: color
    }
  }
  update(correction: number): void {
    for (const rect of this.rectsArr) {
      if (rect.x <= 0 && rect.vx < 0 || rect.x + rect.width > this.layer.w && rect.vx > 0) {
        rect.vx = -rect.vx
      }
      if (rect.y <= 0 && rect.vy < 0 || rect.y + rect.height > this.layer.h && rect.vy > 0) {
        rect.vy = -rect.vy
      }
      rect.x += rect.vx * correction
      rect.y += rect.vy * correction
    }
  }
  display(): void {
    this.layer.context.clearRect(0, 0, this.layer.w, this.layer.h);

    this.rectsArr.forEach(e => {
      this.layer.context.fillStyle = e.color
      this.layer.context.fillRect(e.x, e.y, e.width, e.height)
    })
  }
}