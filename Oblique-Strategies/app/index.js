import clock from 'clock'
import document from 'document'
import { preferences } from 'user-settings'
import strategies from './strategies'

let showStrategy = false

clock.granularity = 'minutes'

const elTime = document.getElementById('time')
const elStrategy = document.getElementById('strategy')
const elBackground = document.getElementById('background')

const pad = (n, width, z = '0') => {
  n += ''
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n
}

clock.ontick = (evt) => {
  if (!showStrategy) {
    const today = evt.date
    let hours = today.getHours()
    if (preferences.clockDisplay === '12h') {
      hours = hours % 12 || 12
    }
    hours = pad(hours, 2, ' ')
    let mins = pad(today.getMinutes(), 2, '0')
    elTime.text = `${hours}:${mins}`
    elStrategy.style.display = "none"
    elTime.style.display = "inline"
  }
}

elBackground.onclick = (evt) => {
  showStrategy = !showStrategy
  if (showStrategy) {
    elStrategy.text = strategies[ Math.floor(strategies.length * Math.random()) ]
    elStrategy.style.display = "inline"
    elTime.style.display = "none"
  }
  clock.ontick({date: new Date()})
}
