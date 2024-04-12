import { AuthorDataType } from "../authorsProvider/context";
import { CategoryType } from "../categoryProvider/context";


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