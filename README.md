# Task-Management-Application
**Task Manager Application**  
This full-stack Task Manager application allows users to create, view, edit, and delete tasks. Built with **Angular** (frontend) and **Spring Boot** (backend), it uses **MySQL** for data storage. 

**Prerequisites**  
- Java 17+, Node.js 18+, Angular CLI  
- MySQL installed locally 
- Maven (for backend)  

**Installation & Setup**  
1. Clone the repository:  
   `git clone [repository-url]`  
2. **Backend Setup**:  
   - Navigate to `/backend`.  
   - Configure database settings in `src/main/resources/application.properties` (e.g., DB URL, username, password).  
   - Build with Maven: `mvn clean install`  
   - Run: `mvn spring-boot:run` (backend starts at `http://localhost:8080`).  
3. **Frontend Setup**:  
   - Navigate to `/frontend`.  
   - Install dependencies: `npm install`  
   - Run: `ng serve` (frontend starts at `http://localhost:4200`).  

**Database Configuration**  
- MySQL are defined in the backend’s `application.properties`. By default, Spring Boot auto-generates the schema using JPA.  



  - MySQL  
  - Spring Boot backend  
  - Angular frontend  
- Access the app at `http://localhost:4200`.  

**Project Structure**  
- **Backend**: Follows layered architecture (controllers, services, repositories). Uses DTOs for data transfer.  
- **Frontend**: Components for task list, form, and routing. Services handle API calls via `HttpClient`.  

**Testing**  
- Backend: Run `mvn test` for unit/integration tests.  
- Frontend: Run `ng test` for Angular component tests.  


