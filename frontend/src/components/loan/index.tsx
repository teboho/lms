import { LoanType } from "@/providers/loanProvider/context";
import React from "react";

const Loan = ({ item }: { item: LoanType }) => {
    const cost = item.isOverdue ? 0.25 : 0.0;

    return (
        <div>
            <h3>BookId: {item.bookId}</h3>
            <p>Date created : {item.dateCreated}</p>
            <p>BookID : {item.bookId}</p>
            <p>Due Date : {item.dateDue}</p>
            <p>Returned : {item.dateReturned}</p>
            <p>Overdue : {item.isOverdue ? "Yes" : "No"}</p>
            <p>Cost : ${cost}</p>
        </div>
    );
};


export default Loan;