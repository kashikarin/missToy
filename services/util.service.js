export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    loadFromStorage,
    saveToStorage,
    animateCSS,
    elapsedTime,
    debounce,
    getTruthyValues,
    getFormattedDate
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color' ,'of nature', 'tuned', 'to', 'a live channel', 'All', 'this happened', 'more or less', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)]
        if (size >= 1 ) txt += ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function animateCSS(el, animation='bounce') {
    const prefix = 'animate__'
    return new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`
        el.classList.add(`${prefix}animated`, animationName)
        function handleAnimationEnd(event) {
            event.stopPropagation()
            el.classList.remove(`${prefix}animated`, animationName)
            resolve('Animation ended')
        }

        el.addEventListener('animationend', handleAnimationEnd, { once: true })
    })
}

function elapsedTime(pastMs) {
    const now = new Date()
    const secondsPast = Math.round((now - pastMs) / 1000)

    if (secondsPast < 60 * 5) return `just now` 
    
    const minutesPast = Math.floor(secondsPast / 60)
    if (minutesPast < 60) return `last hour` 

    const hoursPast = Math.floor(minutesPast / 60)
    if (hoursPast < 24)  return `today` 

    return `${Math.floor(hoursPast / 24)} days ago`

}

function debounce(func, timeout = 1000) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    }
}

function getTruthyValues(obj) {
    const truthyObj = {}
    for (const key in obj) {
        const val = obj[key]
        if (val || typeof val === 'boolean') {
            truthyObj[key] = val
        }
    }
    return truthyObj
}

function getFormattedDate(time) {
    const date = new Date(time)
    const formattedDate = date.toLocaleDateString()
    return formattedDate
}