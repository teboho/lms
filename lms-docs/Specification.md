# Library Management System

## Purpose

The purpose of a Library Management System project is to 
 - modernize library operations, 
 - improve user experiences, 
 - promote inclusivity and accessibility, 
 - enable data-driven decision-making, 
 - ensure security and privacy, and 
 - facilitate integration and collaboration within the library community. 
 
By achieving these objectives, an LMS helps libraries fulfill their mission of providing equitable access to information and knowledge for all users.

## Requirements

The actors of the system are the librarian (Manager) and the patrons (Patron).
We also need an Assistant on the system.
A librarian should be able to do all that an assistant can do.

1. An existing Manager should be able to register other Managers.
1. A manager should be able to assign a user as an assistant.
1. A Patron must be able to register an account.
1. The system must verify the registering user using a copy of their ID.
1. All users must be able to sign in to the system to access the system via the account.
1. All users must be able to change their password, protected by Two-Factor-Authentication.
1. A Manager/Assistant must be able to load new books into the system.
1. A Manager/Assistant must be able to edit book details.
1. The system must be able to categorise a book as physical, electronic or both.
1. A Manager/Assistant must be able to view availability of a book.
1. A Manager/Assistant must be able to view the location of a book.
1. A Manager/Assistant must be able to manage the price of a book loan. 
1. The system must be able to calculate the overdue fee of a book loan.
1. A Patron must be able to search for and view availability of a book.
1. A Patron must be able to search for and view location of a book.
1. A Patron must be able to read book online.
1. A Patron must be able to loan out a physical book.
1. A Patron must be able to pay for a physical book loan and overdue fee.
1. The system must be able to determine popular books.
1. The system must be able promote library events.
1. The system must track a user's previous reads.
1. The system must be able to recommend next read based on their previous reads.
1. The system must be able callibrate a user's preferences based on survey.
1. A Manager/Assistant must be able to send messages to Patrons.
1. The system must accomodate disabled users.
1. The system must be able to facilitate for Reader Groups.
1. The system must be able to recommend potential Reader Groups to Patrons.
1. The system must be able to integrate with an existing online book catalog and/or library.
---  
Possibly 
1. Search libraries near me
2. Use maps api to navigate me there

## Use Cases

![Use Cases](/assets/UCD.svg) *Use Cases (Roughly)*

## Domain Model

![Domain Model](/assets/ERD_aka_Domain_Model.svg)

To be expanded

- Users
- Managers
- Patrons
- Books
- Categories
- PatronHistory
- PatronPreferences
- Payments
- Loans

<!-- Might need enums in the code for the usertype -->