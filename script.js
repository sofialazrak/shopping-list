const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')
const filter = document.getElementById('filter')
const formBtn = itemForm.querySelector('button')
let isEditMode = false

const displayItems = () => {
    const itemsFromStorage = getItemsFromStorage()
    itemsFromStorage.forEach(item => {
        addItemToDOM(item)
    })
    checkUI()
}

const onAddItemSubmit = (e) => {
    e.preventDefault();

    const newItem = itemInput.value;

    // Validate input
    if (newItem === '') {
        alert('Please add an item')
        return // So nothing below this is executed
    }

    // Check for edit mode
    if (isEditMode) {
        const itemToEdit = itemList.querySelector('.edit-mode')
        removeItemFromStorage(itemToEdit.textContent)
        itemToEdit.classList.remove('edit-mode')
        itemToEdit.remove()
        isEditMode = false
    } else {
        if (checkIfItemExists(newItem)) {
            alert('That item already exists!')
            return;
        }
    }

    // Create item DOM element
    addItemToDOM(newItem)

    // Add item to local storage
    addItemtoStorage(newItem)

    checkUI()

    itemInput.value = ''
}

const addItemToDOM = (item) => {
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(item))

    const button = createButton('remove-item btn-link text-red')
    li.appendChild(button)

    itemList.appendChild(li)
}

const addItemtoStorage = (item) => {
    const itemsFromStorage = getItemsFromStorage()

    // Add new Item to array
    itemsFromStorage.push(item)

    // Convert to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

const getItemsFromStorage = () => {
    let itemsFromStorage
    if (localStorage.getItem('items') === null) {
        itemsFromStorage = []
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))
    }
    return itemsFromStorage
}

const createButton = (classes) => {
    const button = document.createElement('button')
    button.className = classes
    const icon = createIcon('fa-solid fa-xmark')
    button.appendChild(icon)
    return button
}

const createIcon = (classes) => {
    const icon = document.createElement('i')
    icon.className = classes
    return icon
}

const onClickItem = (e) => {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement)
    } else {
        setItemToEdit(e.target)
    }
}

const checkIfItemExists = (item) => {
    const itemsFromStorage = getItemsFromStorage()
    return itemsFromStorage.includes(item)
}

const setItemToEdit = (item) => {
    isEditMode = true
    itemList.querySelectorAll('li')
        .forEach(item => {
            item.classList.remove('edit-mode')
        })
    item.classList.add('edit-mode')
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item'
    formBtn.style.backgroundColor = '#228B22'
    itemInput.value = item.textContent
}

const removeItemFromStorage = (item) => {
    let itemsFromStorage = getItemsFromStorage()

    // Filter out item to be removed
    itemsFromStorage = itemsFromStorage.filter(i => i !== item)

    // Re-set to localstorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}
const removeItem = (item) => {
    if (confirm('Are you sure ?')) {
        // Remove item from DOM
        item.remove()

        //Remove item from storage
        removeItemFromStorage(item.textContent)
    }
}

const clearItems = () => {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }

    // Clear from local Storage
    localStorage.removeItem('items')

    checkUI()
}

const filterItems = (e) => {
    const text = e.target.value.toLowerCase()
    const items = document.querySelectorAll('li')
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase()
        if (itemName.indexOf(text) === -1) {
            item.style.display = 'none'
        } else {
            item.style.display = 'flex'
        }
    })
}


const checkUI = () => {

    itemInput.value = ''

    const items = itemList.querySelectorAll('li')
    if (items.length === 0) {
        clearBtn.style.display = 'none'
        filter.style.display = 'none'
    } else {
        clearBtn.style.display = 'block'
        filter.style.display = 'block'
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item'
    formBtn.style.backgroundColor = "#333"

    isEditMode = false
}

// Initialize App
const init = () => {
    itemForm.addEventListener('submit', onAddItemSubmit)
    itemList.addEventListener('click', onClickItem)
    clearBtn.addEventListener('click', clearItems)
    filter.addEventListener('input', filterItems)
    document.addEventListener('DOMContentLoaded', displayItems)

    checkUI()
}

init()