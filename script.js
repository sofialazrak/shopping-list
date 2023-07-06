const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')
const filter = document.getElementById('filter')

const addItem = (e) => {
    e.preventDefault();

    const newItem = itemInput.value;

    // Validate input
    if (newItem === '') {
        alert('Please add an item')
        return // So nothing below this is executed
    }
    // Create List Item
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(newItem))

    const button = createButton('remove-item btn-link text-red')
    li.appendChild(button)

    itemList.appendChild(li)

    checkUI()

    itemInput.value = ''
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

const removeItem = (e) => {
    if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm('Are you sure ?')) {
            e.target.parentElement.parentElement.remove()
            checkUI()
        }
    }
}

const clearItems = () => {
    while (itemList.firstChild) {
        itemList.removeChild(itemList.firstChild)
    }
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
    const items = itemList.querySelectorAll('li')
    if (items.length === 0) {
        clearBtn.style.display = 'none'
        filter.style.display = 'none'
    } else {
        clearBtn.style.display = 'block'
        filter.style.display = 'block'
    }
}

// Event Listeners
itemForm.addEventListener('submit', addItem)
itemList.addEventListener('click', removeItem)
clearBtn.addEventListener('click', clearItems)
filter.addEventListener('input', filterItems)

checkUI()