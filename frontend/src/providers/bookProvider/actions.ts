"use client";
import { createAction } from "redux-actions";
import { BookContextStateType, BookDataType, SearchBookType } from "./context";

export const BookActionEnums = {
    GetBooksRequest: "GET_BOOKS_REQUEST",
    GetBooksSuccess: "GET_BOOKS_SUCCESS",
    GetBooksError: "GET_BOOKS_ERROR",

    GetBookRequest: "GET_BOOK_REQUEST",
    GetBookSuccess: "GET_BOOK_SUCCESS",
    GetBookError: "GET_BOOK_ERROR",

    GetSearchBooksRequest: "GET_SEARCH_BOOKS_REQUEST",
    GetSearchBooksSuccess: "GET_SEARCH_BOOKS_SUCCESS",
    GetSearchBooksError: "GET_SEARCH_BOOKS_ERROR",

    PostBookRequest: "POST_BOOK_REQUEST",
    PostBookSuccess: "POST_BOOK_SUCCESS",
    PostBookError: "POST_BOOK_ERROR",

    SetSearchTerm: "SET_SEARCH_TERM"
}

/**
 * Sets the isPending to true
 * The results array is not there yet
 */
export const getBooksRequestAction = createAction<BookContextStateType>(
    BookActionEnums.GetBooksRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, booksObj: undefined, books: undefined })
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getBooksSuccessAction = createAction(
    BookActionEnums.GetBooksSuccess,
    (books: BookDataType[]) => ({ isSuccess: true, isPending: false, isError: false, books })
);

/**
 * Sets the isError to true but then all else to false
 */
export const getBooksErrorAction = createAction(
    BookActionEnums.GetBooksSuccess,
    () => ({ isSuccess: false, isPending: false, isError: true, books: undefined })
);

/**
 * Sets the isPending to true
 * The results array is not there yet
 */
export const getBookRequestAction = createAction(
    BookActionEnums.GetBookRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, book: undefined })
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getBookSuccessAction = createAction(
    BookActionEnums.GetBookSuccess,
    (book: BookDataType) => ({ isSuccess: true, isPending: false, isError: false, book })
);



/**
 * Sets the isError to true but then all else to false
 */
export const getBookErrorAction = createAction(
    BookActionEnums.GetBookError,
    () => ({ isSuccess: false, isPending: false, isError: true, book: undefined })
);

/**
 * Sets the searchTerm
 */
export const setSearchTermAction = createAction(
    BookActionEnums.SetSearchTerm,
    (searchTerm: string) => ({ searchTerm })
);

/**
 * Sets the isPending to true
 * The results array is not there yet
 */
export const getSearchBooksRequestAction = createAction(
    BookActionEnums.GetSearchBooksRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, searchTerm: "", searchBooks: undefined })
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getSearchBooksSuccessAction = createAction(
    BookActionEnums.GetSearchBooksSuccess,
    (searchBooks: SearchBookType) => ({ isSuccess: true, isPending: false, isError: false, searchBooks })
);

/**
 * Sets the isError to true but then all else to false
 */
export const getSearchBooksErrorAction = createAction(
    BookActionEnums.GetSearchBooksError,
    () => ({ isSuccess: false, isPending: false, isError: true, searchBooks: undefined })
);

/**
 * Sets the isPending to true
 * The results array is not there yet
 */
export const postBookRequestAction = createAction(
    BookActionEnums.PostBookRequest,
    () => ({ isSuccess: false, isPending: true, isError: false })
);

/**
 * Sets the isSuccess to true but then all else to false
 * after the book has been posted and saved to the database
 */
export const postBookSuccessAction = createAction(
    BookActionEnums.PostBookSuccess,
    (book: BookDataType) => ({ isSuccess: true, isPending: false, isError: false, book })
);

/**
 * Sets the isError to true but then all else to false
 */
export const postBookErrorAction = createAction(
    BookActionEnums.PostBookError,
    () => ({ isSuccess: false, isPending: false, isError: true, book: undefined })
);