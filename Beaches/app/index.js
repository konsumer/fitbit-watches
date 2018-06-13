import clock from 'clock'
import document from 'document'

clock.granularity = 'seconds'

const hourHand = document.getElementById('hours')
const minHand = document.getElementById('mins')
const secHand = document.getElementById('secs')

// Returns an angle (0-360) for the current hour in the day, including minutes
const hoursToAngle = (hours, minutes) => ((360 / 12) * hours) + ((360 / 12 / 60) * minutes)

// Returns an angle (0-360) for minutes
const minutesToAngle = (minutes) => (360 / 60) * minutes

// Returns an angle (0-360) for seconds
const secondsToAngle = (seconds) => (360 / 60) * seconds

// Rotate the hands every tick
clock.ontick = () => {
  const today = new Date()
  const hours = today.getHours() % 12
  const mins = today.getMinutes()
  const secs = today.getSeconds()
  hourHand.groupTransform.rotate.angle = hoursToAngle(hours, mins)
  minHand.groupTransform.rotate.angle = minutesToAngle(mins)
  secHand.groupTransform.rotate.angle = secondsToAngle(secs)
}
