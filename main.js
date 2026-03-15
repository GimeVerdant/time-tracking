// Fetch data
fetch('./data.json')
  .then(response => response.json())
  .then(data => {

    // Loop through each activity and update its card with the current and previous hours

    function updateCards(timeframe) {
      data.forEach(activity => {
        const cardClass = activity.title.toLowerCase().replaceAll(' ', '-')
        const card = document.querySelector(`.report__card--${cardClass}`)
        card.querySelector('.report__current').textContent = `${activity.timeframes[timeframe].current}hrs`
        card.querySelector('.report__previous').textContent = `Previous - ${activity.timeframes[timeframe].previous}hrs`
      })
    }

    // Set data to weekly on load
    updateCards('weekly')

    // Update data on click
    document.querySelectorAll('.profile__item').forEach(item => {
      item.addEventListener('click', () => {
        const timeframe = item.textContent.trim().toLowerCase()
        document.querySelectorAll('.profile__item').forEach(i => {
          i.classList.remove('profile__item--active')
          i.setAttribute('aria-selected', 'false')
          i.setAttribute('tabindex', '-1')
        })
        item.classList.add('profile__item--active')
        item.setAttribute('aria-selected', 'true')
        item.setAttribute('tabindex', '0')
        updateCards(timeframe)
      })
    })

  })
