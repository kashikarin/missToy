
import { storageService } from './async-storage.service.js'
import { getRandomIntInclusive, loadFromStorage, makeId, saveToStorage } from './util.service.js'

const STORAGE_KEY = 'toyDB'
_createToys()

const gToyLabels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

export const toyService = {
    query,
    getById,
    getToyLabels,
    save,
    remove,
    getEmptyToy,
    getDefaultQueryOptions,
    normalizeQueryOptions,
    getToyImageUrl,
    getQueryOptionsFromSearchParams
}

async function query(queryOptions = {}) {   
    return await storageService.query(STORAGE_KEY)
        .then(toys => {
            let multiplier = queryOptions.sortOrder 
            // if (queryOptions.sortOrder === "") multiplier = 1
            
            if (queryOptions.name) {
                const regExp = new RegExp(queryOptions.name, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }

            if (Array.isArray(queryOptions.labels) && queryOptions.labels.length) {
                toys = toys.filter(toy => queryOptions.labels.every(filteredLabel => toy?.labels?.includes(filteredLabel)))
            }

            if (queryOptions.status !== '') {
                if (queryOptions.status === true) toys = toys.filter(toy => toy.status === true)
            }

            if (queryOptions.sortField === 'name') {
                toys = toys.sort((a, b) => (multiplier === 1)? a.name.localeCompare(b.name) : b.name.localeCompare(a.name))
            }

            if (queryOptions.sortField === 'price') {
                toys = toys.sort((a, b) =>  (a.price - b.price) * multiplier)
            }

            if (queryOptions.sortField === 'createdAt') {
                toys = toys.sort((a, b) =>  (b.createdAt - a.createdAt) * multiplier)
            }
            return toys
        })
}


function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        toy.updatedAt = Date.now()
        return storageService.put(STORAGE_KEY, toy)
    } else {
        toy.createdAt = toy.updatedAt = Date.now()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy(name = '', labels = []) {
    return { name, labels, status: true }
}

function getDefaultQueryOptions() {
    return { name: '', status: true, labels: [], sortField: '', sortOrder: 1 }
}

function normalizeQueryOptions(rawOptions) {
  return {
    ...rawOptions,
    status:
      rawOptions.status === '' || rawOptions.status === undefined
        ? true
        : rawOptions.status === 'true',
    sortOrder: 
        rawOptions.sortOrder === '' || rawOptions.sortOrder === undefined
            ? 1
            : Number(rawOptions.sortOrder),
  }
}

// async function getExistingLabels(queryOptions){
//     const toys = await query(queryOptions)
//     if (!toys || !toys.length) return []
//     let labelsMap = {}
//     for (let i=0; i<toys.length; i++) {
//         for (let j=0; j<toys[i].labels?.length; j++){
//             if (!labelsMap[toys[i].labels[j]]) labelsMap[toys[i].labels[j]] = 1
//         }
//     }
//     return Object.keys(labelsMap)  
// }

function getQueryOptionsFromSearchParams(searchParams) {
    const defaultQueryOptions = getDefaultQueryOptions()
    const queryOptions = {}
    for (const field in defaultQueryOptions) {
        queryOptions[field] = searchParams.get(field) || ''
        if (field === 'sortOrder' && searchParams.get(field) === "") queryOptions[field] = 1
    }
    return normalizeQueryOptions(queryOptions)
}

function getToyLabels(){
    return Promise.resolve(gToyLabels)
}

function getToyImageUrl(name){ 
    let toyName
    if (name.toLowerCase().includes('puzzle')) toyName = 'Puzzle'
    else if ((name.toLowerCase().includes('play doh')) || (name.toLowerCase().includes('play-doh'))) toyName = 'PlayDoh'
    else if ((name.toLowerCase().includes('cards game')) || (name.toLowerCase().includes('cards-game'))) toyName = 'CardsGame'
    else if ((name.toLowerCase().includes('remote control car')) || (name.toLowerCase().includes('remote-control-car'))) toyName = 'RemoteControlCar'
    else if (name.toLowerCase().includes('scooter')) toyName = 'Scooter'
    else if ((name.toLowerCase().includes('talking doll')) || (name.toLowerCase().includes('talking-doll'))) toyName = 'TalkingDoll'
    else toyName = 'NoImageToDisplay'

     
    return `toy-images/${toyName}.png`
}

function _createToys() {
    let toys = loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = []
        const labels = ['on wheels', 'box game', 'art', 'baby', 'doll', 'puzzle', 'outdoor', 'battery powered']
        const names = ['Talking Doll', 'Remote Control Car', 'Scooter', 'Play Doh', 'Puzzle', 'Cards Game']
        for (let i = 0; i < 20; i++) {
            const toyName = names[getRandomIntInclusive(0, names.length - 1)]
            let toyLabels = []
            switch(toyName) {
                case names[0]: 
                    toyLabels.push(labels[3], labels[4], labels[7]) 
                    break
                case names[1]:
                    toyLabels.push(labels[0], labels[7]) 
                    break
                case names[2]:
                    toyLabels.push(labels[6]) 
                    break
                case names[3]:
                    toyLabels.push(labels[2]) 
                    break
                case names[4]:
                    toyLabels.push(labels[1], labels[5]) 
                    break
                case names[5]:
                    toyLabels.push(labels[1]) 
                    break
                default: break
            }
            toys.push(_createToy(toyName + (i + 1), toyLabels))
        }
        saveToStorage(STORAGE_KEY, toys)
    }
}

function _createToy(name, labels) {
    const toy = getEmptyToy(name, labels)
    toy._id = makeId()
    toy.createdAt = toy.updatedAt = Date.now() - getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    toy.price = getRandomIntInclusive(50, 250)
    toy.imageUrl = `${import.meta.env.BASE_URL}toy-images/${name.replaceAll(" ", "").replace(/[0-9]/g, '')}.png`


    return toy
}

// const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
//                  'Outdoor', 'Battery Powered']
// const toy = {
    // _id: 't101',
    // name: 'Talking Doll',
    // price: 123,
    // labels: ['Doll', 'Battery Powered', 'Baby'],
    // createdAt: 1631031801011,
    // inStock: true,
// }