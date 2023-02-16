import React, {FC} from 'react';
import cl from "./Pagination.module.css";

interface IPagination {
    totalPages: number;
    page: number;
    changePage: Function;
}

export const getPagesArray = (totalPages: number) => {
    const result = [];
    for (let i = 0; i < totalPages; i++) {
        result.push(i + 1)
    }
    return result;
}

const Pagination: FC<IPagination> = ({totalPages, page, changePage}) => {
    const pagesArray = getPagesArray(totalPages);

    return (
        <div className={cl["pages"]}>
            {
                pagesArray.map(p =>
                    <span
                        onClick={() => changePage(p)}
                        key={p}
                        className={page === p ? [cl["page"], cl["page_current"]].join(" ") : cl["page"]}
                    >
                        {p}
                    </span>
                )
            }
        </div>
    );
};

export default Pagination;