# MongoDB, TypeScript, and Node.js Data Management Project

## Description

This project is a system made to create surveys and register users survey results, implemented using MongoDB as the database and developed in TypeScript with Node.js. The source code follows SOLID principles (Single Responsibility, Open/Closed, Interface Segregation, Dependency Inversion), adopting an object-oriented approach.

Furthermore, TDD (Test-Driven Development) concepts were applied to ensure code quality from the outset. Tests were created before actual implementation, ensuring that each component of the system meets predefined requirements.

The project's design adheres to DDD (Domain-Driven Design) principles, aiming for an architecture that reflects the complexities of the domain. This results in a more modular, scalable codebase tailored to the specific needs of the business.

## Technologies Used

- **MongoDB:** A NoSQL database used for efficient data storage and retrieval.
  
- **TypeScript:** A programming language adding types to JavaScript, enhancing robustness and code maintenance.

- **Node.js:** A server-side JavaScript runtime used to develop scalable and efficient applications.

- **Jest** A tool used for creating unit and integration tests for the application.

- **Swagger:**  A tool designed for documenting API paths and responses.

- **Eslint:** A tool designed to maintain consistent code patterns by analyzing and enforcing predefined or configurable rules .

## Applied SOLID Principles

1. **Single Responsibility Principle:** Each class has a single responsibility, making the code more cohesive and understandable.

2. **Open/Closed Principle:** Software entities should be open for extension but closed for modification, promoting system extensibility without altering existing code.

3. **Interface Segregation Principle:** A class should not be forced to implement interfaces it does not use; instead, it should prefer more specific interfaces.

4. **Dependency Inversion Principle:** High-level modules should not depend on low-level modules. Both should depend on abstractions. Additionally, abstractions should not depend on details; instead, details should depend on abstractions.

## Test-Driven Development (TDD)

Development was guided by tests, ensuring each functionality is validated by automated tests before being integrated into the main code. This provides greater confidence in the software's integrity and facilitates early error detection.

## Domain-Driven Design (DDD)

The project's architecture reflects the nuances and complexities of its domain. DDD concepts, such as aggregates, entities, and value objects, were applied to create a code structure that better represents and meets the business's specific requirements.

