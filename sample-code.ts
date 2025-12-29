/**
 * Sample code - Solarized Deep theme demonstration
 */

// Constants
const APP_NAME = "Solarized Deep Theme";
const VERSION = "0.1.0";

// Interface
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

// Class definition
class UserManager {
  private users: User[] = [];

  constructor(private readonly apiUrl: string) {}

  /**
   * Add a user
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
   * Get active users
   */
  getActiveUsers(): User[] {
    return this.users.filter((user) => user.isActive);
  }

  // Get user count
  get userCount(): number {
    return this.users.length;
  }
}

// Usage example
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
