import { AuthorDataType } from "../AuthorsProvider/context";
import { CategoryType } from "../CategoryProvider/context";

export interface CreateBookType {
    name: string;
    description: string;
    type: number;
    year: number;
    imageURL: string;
    isbn: string;

    author: AuthorDataType;
    category: CategoryType;
    
    count: number;
}