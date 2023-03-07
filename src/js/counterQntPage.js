import SearchInputParams from "./headerSearchParams";

export default function countQntOfPages() {
    const qntOfHits = Math.ceil(SearchInputParams.hits/SearchInputParams.qntOfCards);
    return qntOfHits >= 100
    ? 7
    : qntOfHits;
}