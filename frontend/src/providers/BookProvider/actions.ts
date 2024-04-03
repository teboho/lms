"use client";
import { createAction } from "redux-actions";
import { BookDataType, SearchBookType } from "./context";

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
export const getBooksRequestAction = createAction(
    BookActionEnums.GetBooksRequest,
    (): any => ({ isSuccess: false, isPending: true, isError: false, booksObj: [], book: undefined, books: undefined })
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getBooksSuccessAction = createAction(
    BookActionEnums.GetBooksSuccess,
    (books: BookDataType[]): any => ({ isSuccess: true, isPending: false, isError: false, books, book: undefined})
);

/**
 * Sets the isError to true but then all else to false
 */
export const getBooksErrorAction = createAction(
    BookActionEnums.GetBooksSuccess,
    (): any => ({ isSuccess: false, isPending: false, isError: true, books: undefined, book: undefined })
);

/**
 * Sets the isPending to true
 * The results array is not there yet
 */
export const getBookRequestAction = createAction(
    BookActionEnums.GetBookRequest,
    ():any => ({ isSuccess: false, isPending: true, isError: false, book: undefined, books: undefined })
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getBookSuccessAction = createAction(
    BookActionEnums.GetBookSuccess,
    (book: BookDataType):any => ({ isSuccess: true, isPending: false, isError: false, book, books: [] as BookDataType[] })
);



/**
 * Sets the isError to true but then all else to false
 */
export const getBookErrorAction = createAction(
    BookActionEnums.GetBookSuccess,
    () => ({ isSuccess: false, isPending: false, isError: true, book: undefined, books: undefined, searchTerm: "" })
);

/**
 * Sets the searchTerm
 */
export const setSearchTermAction = createAction(
    BookActionEnums.SetSearchTerm,
    (searchTerm: string): any => ({ searchTerm })
);

/**
 * Sets the isPending to true
 * The results array is not there yet
 */
export const getSearchBooksRequestAction = createAction(
    BookActionEnums.GetSearchBooksRequest,
    (): any => ({ isSuccess: false, isPending: true, isError: false, books: undefined, searchTerm: "", searchBooks: undefined })
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getSearchBooksSuccessAction = createAction(
    BookActionEnums.GetSearchBooksSuccess,
    (searchBooks: SearchBookType): any => ({ isSuccess: true, isPending: false, isError: false, books: undefined, searchBooks })
);

/**
 * Sets the isError to true but then all else to false
 */
export const getSearchBooksErrorAction = createAction(
    BookActionEnums.GetSearchBooksSuccess,
    (): any => ({ isSuccess: false, isPending: false, isError: true, books: undefined, searchTerm: "", searchBooks: undefined })
);

/**
 * Sets the isPending to true
 * The results array is not there yet
 */
export const postBookRequestAction = createAction(
    BookActionEnums.PostBookRequest,
    (): any => ({ isSuccess: false, isPending: true, isError: false, books: undefined, searchTerm: "", searchBooks: undefined })
);

/**
 * Sets the isSuccess to true but then all else to false
 * after the book has been posted and saved to the database
 */
export const postBookSuccessAction = createAction(
    BookActionEnums.PostBookSuccess,
    (book: BookDataType): any => ({ isSuccess: true, isPending: false, isError: false, book, books: undefined })
);

/**
 * Sets the isError to true but then all else to false
 */
export const postBookErrorAction = createAction(
    BookActionEnums.PostBookSuccess,
    (): any => ({ isSuccess: false, isPending: false, isError: true, book: undefined, books: undefined, searchTerm: "" })
);