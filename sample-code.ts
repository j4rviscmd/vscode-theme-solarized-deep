/**
 * Sample code - Solarized Deep theme demonstration
 */

/** Application name constant */
const APP_NAME = "Solarized Deep Theme";
/** Current version of the application */
const VERSION = "0.1.0";

/**
 * User interface representing a user entity.
 *
 * @property id - Unique identifier for the user
 * @property name - Full name of the user
 * @property email - Email address for communication
 * @property isActive - Whether the user account is currently active
 */
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

/**
 * Manages user operations including CRUD operations and filtering.
 *
 * Provides methods to add users and retrieve active users from an in-memory
 * collection backed by an external API.
 */
class UserManager {
  /** Internal storage for user records */
  private users: User[] = [];

  /**
   * Creates a new UserManager instance.
   *
   * @param apiUrl - The base URL for the user API endpoint
   */
  constructor(private readonly apiUrl: string) {}

  /**
   * Adds a new user to the collection and persists it to the API.
   *
   * Sends a POST request to the configured API endpoint with the user data.
   * On success, adds the user to the local collection. Logs errors on failure.
   *
   * @param user - The user object to add
   * @returns Promise that resolves when the user is successfully added
   * @throws Will log but not throw errors if the API request fails
   */
  async addUser(user: User): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      this.users.push(user);
      console.log(`User ${user.name} added successfully`);
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  }

  /**
   * Retrieves all active users from the collection.
   *
   * Filters the internal user list to return only users where
   * {@link User.isActive} is true.
   *
   * @returns Array of active user objects
   */
  getActiveUsers(): User[] {
    return this.users.filter((user) => user.isActive);
  }

  /**
   * Gets the total number of users in the collection.
   *
   * @returns The count of all users stored in the manager
   */
  get userCount(): number {
    return this.users.length;
  }
}

// Example usage
const manager = new UserManager("https://api.example.com");

const newUser: User = {
  id: 1,
  name: "山田太郎",
  email: "yamada@example.com",
  isActive: true,
};

manager.addUser(newUser).then(() => {
  const activeUsers = manager.getActiveUsers();
  console.log(`Active users: ${activeUsers.length}`);
});
