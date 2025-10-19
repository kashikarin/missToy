# 🧸 MissToy
### The perfect new toy is right here.

## Description
missToy is a modern toy store web app that allows the store owner to manage toys and customers to browse, search, and discover the perfect toy.
It features an intuitive design, responsive layout, and a smooth management experience for adding, editing, and removing toys.

## Main Features

- 🔍 **Search & Filter:**  
Users can search toys by name or filter them by category or availability.

- ➕ **Add New Toy:**  
Store owners can easily add a new toy to the catalog by filling out a form (name, price, stock status).

- 🗑️ **Delete Toy:**  
Remove existing toys from the store inventory with a single click.

- ✏️ **Update Toy Details:**  
Edit toy details such as name, price, or stock availability.

- 🎨 **Responsive & Theme-Friendly:**  
The app is fully responsive on both desktop and mobile.  
Users can switch between **Dark** and **Light** color themes.

## Toy Object Structure
Each toy in the system is represented as an object in the following format:

```js
{
  _id: 'PTXZFW',
  name: 'Play Doh3',
  price: 91,
  labels: ["art"],
  createdAt: 1760571851320,
  updatedAt: 1760648685420
  status: true,
  imageUrl: "toy-images/PlayDoh.png"
}

## Services
```js
export const toyService = {
    query,
    getById,
    getToyLabels,
    save,
    remove,
    getEmptyToy,
    getDefaultQueryOptions,
    getToyImageUrl,
    getQueryOptionsFromSearchParams
}

Explanations: 
- query(queryOptions) – retrieves a filtered and sorted list of toys
- getById(toyId) – fetches details of a specific toy
- getToyLabels() - dynamically retrieves all existing toy labels from the current toy dataset, so filtering options reflect only the toys currently in stock or matching the query
- getEmptyToy(name, labels) - creates a basic empty toy for creating a new toy
- remove(toyId) – deletes a toy
- save(toy) – adds or updates a toy
- getDefaultQueryOptions() - returns a set of default settings for a toy filter query. The function creates an object with initial values ​​for filtering and sorting.
- normalizeQueryOptions(rawOptions) - ensure that all filter and sort values ​​in the toy filter are in a correct and clear format before running.
- getQueryOptionsFromSearchParams(searchParams) - read the filter and sort parameters from a URL and convert them into a queryOptions object ready to be used in the query() function.
- getToyImageUrl(name) - returns an image url according to the name of the toy.

## App logic & state management
MissToy is a frontend-only React application powered by Redux for state management.
All user interactions (such as adding, editing, deleting, or filtering toys) trigger Redux actions, which update the store and automatically re-render the UI.

### Redux Structure
The app uses two main reducers to manage its global state:

#### 🧩 `toyReducer`
Handles everything related to toys:
- **State fields:**  
  - `toys` – the current list of toys (filtered or full)  
  - `queryOptions` – current search, filter, and sort settings  
- **Actions:**  
  - `SET_TOYS` – set the full toy list  
  - `REMOVE_TOY` – remove a toy by ID  
  - `ADD_TOY` – add a new toy  
  - `UPDATE_TOY` – update an existing toy’s data  
  - `SET_QUERYOPTIONS` – update current filter and sort options  

#### ⚙️ `systemReducer`
Handles app-wide system settings:
- **State fields:**  
  - `colorTheme` – current theme (`'light'` or `'dark'`)  
  - `isLoading` – whether data is currently being fetched  
  - `isMobile` – screen size detection (`true` if width < 1000px)  
- **Actions:**  
  - `SET_COLOR_THEME` – toggle between light/dark modes  
  - `SET_ISLOADING` – control loading spinner visibility  
  - `SET_MOBILE` / `SET_DESKTOP` – update responsive state  

### Combined Store
Both reducers are combined in the Redux store (e.g. via `combineReducers`),  
allowing the app to maintain a **clean separation** between toy data and system state.







