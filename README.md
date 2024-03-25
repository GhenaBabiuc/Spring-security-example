# Spring Security Example Application

This project is a sample Spring Boot application demonstrating the use of Spring Security for authentication and authorization.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
- Java JDK 17
- Maven 3.x
- An instance of PostgreSQL running on your local machine or a remote server

### Setting Up the Database

Create a PostgreSQL database named `spring_security_example`. Ensure that the credentials for accessing the database are updated in the `application.properties` file located in `src/main/resources`. The properties to check are:

- `spring.datasource.username`
- `spring.datasource.password`

### Configuring Liquibase

Run the following Maven command to update your database schema using Liquibase:

```sh
mvn liquibase:update
```

### Building the Project

To build the project, execute the following command in the root directory:

```sh
mvn clean install
```

This command compiles the project and runs any tests, producing a JAR file if successful.

### Running the Application

To start the application, you can use the Spring Boot Maven plugin with the following command:

```sh
mvn spring-boot:run
```

Alternatively, you can run the `SpringSecurityExampleApplication` class directly from your IDE.

## Project Structure

The project is structured as follows:

- `config` - Contains configuration files, including `SecurityConfig` for security configurations and `JwtRequestFilter` for JWT processing.
- `controller` - Contains `MainController` for general endpoints and `UserController` for user-specific actions.
- `model` - Contains domain entities such as `User` and `Role`, and Data Transfer Objects (DTOs) in the `dto` sub-package.
- `repositories` - Contains `UserRepository` and `RoleRepository` for database interactions.
- `service` - Contains service layer classes such as `UserService`, `RoleService`, and `AuthService`.
- `util` - Utility classes like `JwtTokenUtils` for JWT operations.
- `SpringSecurityExampleApplication` - The main class to bootstrap the application.

## Liquibase Migrations

SQL migrations are located under `src/main/resources/liquibase/sql`.