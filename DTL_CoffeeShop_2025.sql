create database DTL_CoffeShop_2025

use DTL_CoffeShop_2025 
CREATE TABLE Dtl_Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(50) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    FullName NVARCHAR(100) NOT NULL,
    Role ENUM('Admin', 'Staff') NOT NULL,
    PhoneNumber VARCHAR(15),
    Email VARCHAR(100),
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Active', 'Inactive') DEFAULT 'Active'
);
CREATE TABLE Dtl_Customers (
    CustomerID INT PRIMARY KEY AUTO_INCREMENT,
    FullName NVARCHAR(100) NOT NULL,
    PhoneNumber VARCHAR(15) UNIQUE,
    Email VARCHAR(100),
    Address NVARCHAR(255),
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE Dtl_Categories (
    CategoryID INT PRIMARY KEY AUTO_INCREMENT,
    CategoryName NVARCHAR(100) NOT NULL,
    Description TEXT,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Active', 'Inactive') DEFAULT 'Active'
);
CREATE TABLE Dtl_Products (
    ProductID INT PRIMARY KEY AUTO_INCREMENT,
    ProductName NVARCHAR(100) NOT NULL,
    CategoryID INT,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    ImageURL VARCHAR(255),
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Active', 'Inactive') DEFAULT 'Active',
    FOREIGN KEY (CategoryID) REFERENCES Dtl_Categories(CategoryID)
);
CREATE TABLE Dtl_Orders (
    OrderID INT PRIMARY KEY AUTO_INCREMENT,
    CustomerID INT,
    UserID INT,
    OrderDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    TotalAmount DECIMAL(10, 2) NOT NULL,
    Status ENUM('Pending', 'Completed', 'Cancelled') DEFAULT 'Pending',
    Notes TEXT,
    FOREIGN KEY (CustomerID) REFERENCES Dtl_Customers(CustomerID),
    FOREIGN KEY (UserID) REFERENCES Dtl_Users(UserID)
);

CREATE TABLE Dtl_OrderDetails (
    OrderDetailID INT PRIMARY KEY AUTO_INCREMENT,
    OrderID INT,
    ProductID INT,
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(10, 2) NOT NULL,
    Subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Dtl_Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Dtl_Products(ProductID)
);

CREATE TABLE Dtl_Inventory (
    InventoryID INT PRIMARY KEY AUTO_INCREMENT,
    ProductID INT,
    Quantity INT NOT NULL,
    LastUpdated DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ProductID) REFERENCES Dtl_Products(ProductID)
);

CREATE TABLE Dtl_Promotions (
    PromotionID INT PRIMARY KEY AUTO_INCREMENT,
    PromotionName NVARCHAR(100) NOT NULL,
    Description TEXT,
    DiscountRate DECIMAL(5, 2) NOT NULL,
    StartDate DATETIME,
    EndDate DATETIME,
    Status ENUM('Active', 'Inactive') DEFAULT 'Active'
);

CREATE TABLE Dtl_Tables (
    TableID INT PRIMARY KEY AUTO_INCREMENT,
    TableName NVARCHAR(50) NOT NULL,
    Capacity INT NOT NULL,
    Status ENUM('Available', 'Occupied') DEFAULT 'Available'
);

CREATE TABLE Dtl_Reservations (
    ReservationID INT PRIMARY KEY AUTO_INCREMENT,
    CustomerID INT,
    TableID INT,
    ReservationDate DATETIME NOT NULL,
    NumberOfGuests INT NOT NULL,
    Status ENUM('Confirmed', 'Cancelled') DEFAULT 'Confirmed',
    Notes TEXT,
    FOREIGN KEY (CustomerID) REFERENCES Dtl_Customers(CustomerID),
    FOREIGN KEY (TableID) REFERENCES Dtl_Tables(TableID)
);