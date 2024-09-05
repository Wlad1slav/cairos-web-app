'use client';

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {TablePaginationProps} from "@/lib/types";

function TablePagination({page, totalPages}: TablePaginationProps) {
    return (
        <Pagination>
            <PaginationContent>
                {page - 1 !== 0 && <PaginationItem>
                    <PaginationPrevious href={`?page=${page - 1}`}/>
                </PaginationItem>}

                { Array.from(Array(totalPages).keys()).map((_, i) => (
                    <PaginationItem key={i}>
                        <PaginationLink href={`?page=${i+1}`} isActive={i+1 === page}>{i+1}</PaginationLink>
                    </PaginationItem>
                )) }
                {page !== totalPages && <PaginationItem>
                    <PaginationNext href={`?page=${page + 1}`}/>
                </PaginationItem>}
            </PaginationContent>
        </Pagination>
    );
}

export default TablePagination;