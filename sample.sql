-- Create the Users table
CREATE TABLE Users (
                       id SERIAL PRIMARY KEY,
                       username VARCHAR(50) NOT NULL UNIQUE,
                       email VARCHAR(100) NOT NULL UNIQUE,
                       password VARCHAR(100) NOT NULL,
                       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Categories table
CREATE TABLE Categories (
                            id SERIAL PRIMARY KEY,
                            name VARCHAR(100) NOT NULL UNIQUE,
                            description TEXT,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Products table
CREATE TABLE Products (
                          id SERIAL PRIMARY KEY,
                          name VARCHAR(100) NOT NULL,
                          description TEXT,
                          price DECIMAL(10, 2) NOT NULL,
                          category_id INT REFERENCES Categories(id) ON DELETE SET NULL,
                          stock_quantity INT DEFAULT 0,
                          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the Orders table
CREATE TABLE Orders (
                        id SERIAL PRIMARY KEY,
                        user_id INT REFERENCES Users(id) ON DELETE CASCADE,
                        total DECIMAL(10, 2) NOT NULL,
                        order_status VARCHAR(50) NOT NULL,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the OrderItems table (many-to-many relationship between Orders and Products)
CREATE TABLE OrderItems (
                            id SERIAL PRIMARY KEY,
                            order_id INT REFERENCES Orders(id) ON DELETE CASCADE,
                            product_id INT REFERENCES Products(id) ON DELETE CASCADE,
                            quantity INT NOT NULL CHECK (quantity > 0),
                            price_per_unit DECIMAL(10, 2) NOT NULL,
                            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            UNIQUE(order_id, product_id)
);

-- Example indexes for performance
CREATE INDEX idx_products_name ON Products(name);
CREATE INDEX idx_users_email ON Users(email);
CREATE INDEX idx_orders_user_id ON Orders(user_id);

-- Insert data into Users
INSERT INTO Users (username, email, password)
VALUES
    ('john_doe', 'john@example.com', 'password123'),
    ('jane_doe', 'jane@example.com', 'securepass'),
    ('alice_smith', 'alice@example.com', 'mypassword');

-- Insert data into Categories
INSERT INTO Categories (name, description)
VALUES
    ('Electronics', 'Devices and gadgets'),
    ('Books', 'Printed and digital books'),
    ('Clothing', 'Men and women clothing');

-- Insert data into Products
INSERT INTO Products (name, description, price, category_id, stock_quantity)
VALUES
    ('Smartphone', 'A high-end smartphone', 699.99, 1, 50),  -- Electronics
    ('Laptop', 'Gaming laptop', 1299.99, 1, 20),             -- Electronics
    ('Novel', 'A popular fiction novel', 19.99, 2, 100),     -- Books
    ('T-shirt', 'A basic white t-shirt', 9.99, 3, 200),      -- Clothing
    ('Jeans', 'A pair of blue jeans', 39.99, 3, 150);        -- Clothing

-- Insert data into Orders
INSERT INTO Orders (user_id, total, order_status)
VALUES
    (1, 719.98, 'Processing'),   -- Order for user with ID 1
    (2, 1349.98, 'Shipped'),     -- Order for user with ID 2
    (3, 49.98, 'Delivered');     -- Order for user with ID 3

-- Insert data into OrderItems
INSERT INTO OrderItems (order_id, product_id, quantity, price_per_unit)
VALUES
    (1, 1, 1, 699.99),   -- Order 1 contains 1 Smartphone
    (1, 3, 1, 19.99),    -- Order 1 contains 1 Novel
    (2, 2, 1, 1299.99),  -- Order 2 contains 1 Laptop
    (2, 4, 5, 9.99),     -- Order 2 contains 5 T-shirts
    (3, 5, 2, 39.99);    -- Order 3 contains 2 pairs of Jeans
