const modal = document.getElementById('modal')
const modalShow = document.getElementById('show-modal')
const modalClose = document.getElementById('close-modal')
const bookmarkForm = document.getElementById('bookmark-form')
const websiteNameEl = document.getElementById('website-name')
const websiteUrlEl = document.getElementById('website-url')
const bookmarksContainer = document.getElementById('bookmarks-container')

// Modal Event Listeners
modalShow.addEventListener('click', () => {
   modal.classList.add('show-modal')
   websiteNameEl.focus()
})
modalClose.addEventListener('click', () => modal.classList.remove('show-modal'))
window.addEventListener('click', (e) => {
   e.target === modal ? modal.classList.remove('show-modal') : false
})

// Validate Form
const validate = (nameValue, urlValue) => {
   const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g
   const regEx = new RegExp(expression)
   if (!nameValue || !urlValue) {
      alert('Please submit values for both fields.')
      return false
   }
   if (!urlValue.match(regEx)) {
      alert('Please provide a valid web address')
      return false
   }
   // Valid
   return true
}

// Handle Data from Form
const storeBookmark = (e) => {
   e.preventDefault()
   const nameValue = websiteNameEl.value
   let urlValue = websiteUrlEl.value
   if (!urlValue.includes('http://', 'https://')) {
      urlValue = `https://${urlValue}`
   }
   if (!validate(nameValue, urlValue)) {
      return false
   }
}

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark)
