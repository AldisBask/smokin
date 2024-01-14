document.addEventListener('DOMContentLoaded', function () {
  const timerTextElement = document.getElementById('timer-text');
  const timerElement = document.getElementById('timer');

  function updateTimer() {
    const now = moment();
    const currentTime = now.format('HH:mm:ss');

    const events = [
      { start: '07:20:00', message: 'Laiks baudīt tabaku!' },
      { start: '07:35:00', message: 'Laiks baudīt tabaku!' },
      { start: '09:00:00', message: 'Laiks baudīt tabaku!' },
      { start: '10:00:00', message: 'Laiks baudīt tabaku!' },
      { start: '11:00:00', message: 'Laiks baudīt tabaku!' },
      { start: '12:10:00', message: 'Laiks baudīt tabaku!' },
      { start: '13:35:00', message: 'Laiks baudīt tabaku!' },
      { start: '15:00:00', message: 'Laiks baudīt tabaku!' },
      { start: '16:00:00', message: 'Laiks baudīt tabaku!' },
      { start: '17:05:00', message: 'Laiks baudīt tabaku!' }
    ];

    let currentEvent = null;

    for (const event of events) {
      if (now.isBetween(moment(event.start, 'HH:mm:ss'), moment(event.start, 'HH:mm:ss').add(1, 'minutes'))) {
        currentEvent = event;
        break;
      }
    }

    if (currentEvent) {
      timerTextElement.textContent = currentEvent.message;
      startCountdown(moment(currentEvent.start, 'HH:mm:ss').add(1, 'minutes'));
    } else {
      const nextEvent = getNextEvent(now, events);
      timerTextElement.textContent = `Līdz tabakas izstrādājumu baudīšanai atlicis:`;
      startCountdown(moment(nextEvent.start, 'HH:mm:ss'));
    }
  }

  function startCountdown(eventEnd) {
    const now = moment();
    const duration = moment.duration(eventEnd.diff(now));
    const timerInterval = 1000; // 1 second interval

    function updateDisplay() {
      const formattedTime = moment.utc(duration.asMilliseconds()).format('HH:mm:ss');
      timerElement.textContent = formattedTime;
    }

    const countdownInterval = setInterval(function () {
      updateDisplay();
      duration.subtract(timerInterval, 'milliseconds');

      if (duration.asMilliseconds() < 0) {
        clearInterval(countdownInterval);
        updateTimer();
      }
    }, timerInterval);

    // Update display immediately to avoid showing the first second
    updateDisplay();
  }

  function getNextEvent(currentTime, events) {
    const futureEvents = events
      .filter(event => moment(event.start, 'HH:mm:ss').isAfter(currentTime))
      .sort((a, b) => moment(a.start, 'HH:mm:ss') - moment(b.start, 'HH:mm:ss'));

    return futureEvents.length > 0 ? futureEvents[0] : events[0];
  }

  // Start the timer when the page loads
  updateTimer();
});
