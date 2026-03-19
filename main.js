// Fetch data
fetch('./data.json')
  .then(response => response.json())
  .then(data => {

    // Loop through each activity and update its card with the current and previous hours

    function updateCards(timeframe) {
      data.forEach(activity => {
        const cardClass = activity.title.toLowerCase().replaceAll(' ', '-')
        const card = document.querySelector(`.report__card--${cardClass}`)
        const previousLabels = { daily: 'Yesterday', weekly: 'Last Week', monthly: 'Last Month' }
        card.querySelector('.report__current').textContent = `${activity.timeframes[timeframe].current}hrs`
        card.querySelector('.report__previous').textContent = `${previousLabels[timeframe]} - ${activity.timeframes[timeframe].previous}hrs`
      })
    }

    // Set data to weekly on load
    updateCards('weekly')

    // Update data on click
    document.querySelectorAll('.profile__tab').forEach(button => {
      button.addEventListener('click', () => {
        const timeframe = button.textContent.trim().toLowerCase()

        // Reset all tabs
        document.querySelectorAll('.profile__tab').forEach(b => {
          b.setAttribute('aria-selected', 'false')
          b.setAttribute('tabindex', '-1')
          b.closest('.profile__item').classList.remove('profile__item--active')
        })

        // Set active tab
        button.setAttribute('aria-selected', 'true')
        button.setAttribute('tabindex', '0')
        button.closest('.profile__item').classList.add('profile__item--active')

        // Update panel label and card data
        document.getElementById('report-panel').setAttribute('aria-labelledby', `tab-${timeframe}`)
        updateCards(timeframe)
      })
    })

  })
