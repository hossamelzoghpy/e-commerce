export interface QueryString{
readonly sort?:string;
readonly limit?:number;
readonly page?:number;
readonly fields?:string;
readonly search?:string;
[key:string]:any;
}

export interface SearchQuery{
    $or?:Array<{[key:string]:RegExp}>;
    [key:string]:any;
}

export interface PaginationQuery{
    totalPages?:number;
    currentPage?:number;
    next?:number;
    prev?:number;
    limit?:number;
}