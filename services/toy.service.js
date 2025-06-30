
import { storageService } from './async-storage.service.js'
// import { userService } from './user.service.js'
import { getRandomIntInclusive } from './util.service.js'

const STORAGE_KEY = 'toyDB'
// const PAGE_SIZE = 3
_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    // getRandomToy,
    getDefaultFilter
}

function query(filterSort = {}) {   
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            if (filterSort.name) {
                const regExp = new RegExp(filterSort.name, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }

            if (filterSort.label) {
                const regExp = new RegExp(filterSort.label, 'i')
                toys = toys.filter(toy => {
                    const toyLabels = toy.labels.map(label => label.toLocaleLowerCase()) 
                    return toyLabels.include(filterSort.label.toLocaleLowerCase())
                })
            }

            if (filterSort.inStock !== 'all') {
                toys = toys.filter(toy => (toy.inStock ? toy.inStock : !toy.inStock))
            }

            if (filterSort.sorting === 'name') {
                toys = toys.sort((a, b) => a.name.localeCompare(b.name))
            }

            if (filterSort.sorting === 'price') {
                toys = toys.sort((a, b) =>  b.price - a.price)
            }

            if (filterSort.sorting === 'createdAt') {
                toys = toys.sort((a, b) =>  b.createdAt - a.createdAt)
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
        return storageService.put(STORAGE_KEY, toy)
    } else {
        //* when switching to backend - remove the next line
        toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function save(toy) {
    if (toy._id) {
        // TODO - updatable fields
        toy.updatedAt = Date.now()
        return storageService.put(STORAGE_KEY, toy)
    } else {
        todo.createdAt = todo.updatedAt = Date.now()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy(name = '', labels = []) {
    return { name, labels, inStock: true }
}

// function getRandomToy() {
//     return {
//         name: 'Susita-' + (Date.now() % 1000),
//         Labels: getRandomIntInclusive(1000, 9000),
//     }
// }

function getDefaultFilter() {
    return { name: '', inStock: '', label: '', sort: '' }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = []
        const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
        const names = ['Talking Doll', 'Remote Control Car', 'Scooter', 'Play Doh', 'Puzzle', 'Cards Game']
        for (let i = 0; i < 20; i++) {
            const toyName = names[utilService.getRandomIntInclusive(0, names.length - 1)]
            let toyLabels = []
            switch(toyName) {
                case names[0]: 
                    toyLabels.push(labels[3], labels[4], labels[7]) 
                case names[1]:
                    toyLabels.push(labels[0], labels[7]) 
                case names[2]:
                    toyLabels.push(labels[6]) 
                case names[3]:
                    toyLabels.push(labels[2]) 
                case names[4]:
                    toyLabels.push(labels[1], labels[5]) 
                case names[5]:
                    toyLabels.push(labels[1]) 

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
    toy.price = getRandomIntInclusive(50, 250)
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