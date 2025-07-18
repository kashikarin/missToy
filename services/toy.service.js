
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

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
    // getRandomToy,
    getDefaultQueryOptions,
    // getExistingLabels,
    getQueryOptionsFromSearchParams
}

function query(queryOptions = {}) {   
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            let multiplier = queryOptions.sortOrder 
            if (queryOptions.sortOrder === "") multiplier = 1
            if (queryOptions.name) {
                const regExp = new RegExp(queryOptions.name, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }

            if (Array.isArray(queryOptions.labels) && queryOptions.labels.length) {
                toys = toys.filter(toy => queryOptions.labels.every(filteredLabel => toy.labels.includes(filteredLabel)))
            }

            if (queryOptions.status !== 'all') {
                toys = toys.filter(toy => (toy.status ? toy.status : !toy.status))
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
    return { name: '', status: '', labels: [], sortField: '', sortOrder: "" }
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
        if (field === sortOrder && searchParams.get(field) === "") queryOptions[field] = 1
    }
    return queryOptions
}

function getToyLabels(){
    return Promise.resolve(gToyLabels)
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = []
        const labels = ['On Wheels', 'Box Game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
        const names = ['Talking Doll', 'Remote Control Car', 'Scooter', 'Play Doh', 'Puzzle', 'Cards Game']
        for (let i = 0; i < 20; i++) {
            const toyName = names[utilService.getRandomIntInclusive(0, names.length - 1)]
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
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}

function _createToy(name, labels) {
    const toy = getEmptyToy(name, labels)
    toy._id = utilService.makeId()
    toy.createdAt = toy.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    toy.price = utilService.getRandomIntInclusive(50, 250)
    toy.imageUrl = `/toy-images/${name.replaceAll(" ", "").replace(/[0-9]/g, '')}.png`

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