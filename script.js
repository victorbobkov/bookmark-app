const modal = document.getElementById('modal')
const modalShow = document.getElementById('show-modal')
const modalClose = document.getElementById('close-modal')
const bookmarkForm = document.getElementById('bookmark-form')
const websiteNameEl = document.getElementById('website-name')
const websiteUrlEl = document.getElementById('website-url')
const bookmarksContainer = document.getElementById('bookmarks-container')

let bookmarks = []

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

// Fetch Bookmarks
const fetchBookmarks = () => {
   // Get bookmarks from localStorage if available
   if (localStorage.getItem('bookmarks')) {
      bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
   } else {
      // Create bookmarks array in localStorage
      bookmarks = [
         {
            name: 'Google',
            url: 'https://google.com'
         }
      ]
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
   }
   console.log(bookmarks)
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
   const bookmark = {
      name: nameValue,
      url: urlValue,
   }
   bookmarks.push(bookmark)
   localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
   fetchBookmarks()
   bookmarkForm.reset()
   websiteNameEl.focus()
}

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark)

// On Load, Fetch Bookmarks
fetchBookmarks()
