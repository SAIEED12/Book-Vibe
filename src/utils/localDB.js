const getAllReadListFromLocalDB = () => {
    const allReadList = localStorage.getItem("readList")
    if (allReadList) return JSON.parse(allReadList)
    return []
}

const addReadListToLoacalDb = (book) => {
    const allBooks = getAllReadListFromLocalDB();
    const isAlreadyExist = allBooks.find(bk => bk.bookId === book.bookId)
    if (!isAlreadyExist) {
        allBooks.push(book)
        localStorage.setItem("readList", JSON.stringify(allBooks))
    }
}

const getAllWishListFromLocalDB = () => {
    const allWishList = localStorage.getItem("wishList")
    if (allWishList) return JSON.parse(allWishList)
    return []
}

const addWishListToLocalDb = (book) => {
    const allBooks = getAllWishListFromLocalDB();
    const isAlreadyExist = allBooks.find(bk => bk.bookId === book.bookId)
    if (!isAlreadyExist) {
        allBooks.push(book)
        localStorage.setItem("wishList", JSON.stringify(allBooks))
    }
}

export { getAllReadListFromLocalDB, addReadListToLoacalDb, getAllWishListFromLocalDB, addWishListToLocalDb }