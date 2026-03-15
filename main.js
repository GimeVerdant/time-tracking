fetch('./data.json')
  .then(response => response.json())
  .then(data => {

    function updateCards(timeframe) {
      data.forEach(activity => {
        const cardClass = activity.title.toLowerCase().replaceAll(' ', '-')
        const card = document.querySelector(`.report__card--${cardClass}`)
        card.querySelector('.report__current').textContent = `${activity.timeframes[timeframe].current}hrs`
        card.querySelector('.report__previous').textContent = `Previous - ${activity.timeframes[timeframe].previous}hrs`
      })
    }

    updateCards('weekly')

    document.querySelectorAll('.profile__item').forEach(item => {
      item.addEventListener('click', () => {
        const timeframe = item.textContent.toLowerCase()
        document.querySelectorAll('.profile__item').forEach(i => i.classList.remove('profile__item--active'))
        item.classList.add('profile__item--active')
        updateCards(timeframe)
      })
    })

  })
