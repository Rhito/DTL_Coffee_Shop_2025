-- Xóa cơ sở dữ liệu nếu đã tồn tại
DROP DATABASE IF EXISTS DTL_CoffeeShop_2025;

-- Tạo cơ sở dữ liệu mới
CREATE DATABASE DTL_CoffeeShop_2025;
USE DTL_CoffeeShop_2025;

-- Bảng Người Dùng (Users)
CREATE TABLE Dtl_Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Username VARCHAR(50) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    FullName VARCHAR(255) NOT NULL,
    Role ENUM('Admin', 'Employem', 'Customer') NOT NULL default 'Customer',
    PhoneNumber VARCHAR(15) UNIQUE,
    Email VARCHAR(255) UNIQUE,
    Address TEXT,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    Status ENUM('Active', 'Inactive') DEFAULT 'Active'
);

-- Bảng Danh Mục Sản Phẩm (Categories)
CREATE TABLE Dtl_Categories (
    CategoryID INT PRIMARY KEY AUTO_INCREMENT,
    CategoryName VARCHAR(255) NOT NULL UNIQUE,
    Description TEXT,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    Status ENUM('Active', 'Inactive') DEFAULT 'Active'
);

-- Bảng Sản Phẩm (Products)
CREATE TABLE Dtl_Products (
    ProductID INT PRIMARY KEY AUTO_INCREMENT,
    ProductName VARCHAR(255) NOT NULL,
    CategoryID INT,
    Description TEXT,
    Price DECIMAL(10,2) NOT NULL CHECK (Price > 0),
    ImageURL VARCHAR(255),
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    Status ENUM('Active', 'Inactive') DEFAULT 'Active',
    FOREIGN KEY (CategoryID) REFERENCES Dtl_Categories(CategoryID) ON DELETE SET NULL
);

-- Bảng Đơn Hàng (Orders)
CREATE TABLE Dtl_Orders (
    OrderID INT PRIMARY KEY AUTO_INCREMENT,
    CustomerID INT,
    UserID INT,
    OrderDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    TotalAmount DECIMAL(10,2) NOT NULL CHECK (TotalAmount >= 0),
    Status ENUM('Pending', 'Completed', 'Cancelled') DEFAULT 'Pending',
    Notes TEXT,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (CustomerID) REFERENCES Dtl_Users(UserID) ON DELETE SET NULL,
    FOREIGN KEY (UserID) REFERENCES Dtl_Users(UserID) ON DELETE SET NULL
);

-- Bảng Chi Tiết Đơn Hàng (Order Details)
CREATE TABLE Dtl_OrderDetails (
    OrderDetailID INT PRIMARY KEY AUTO_INCREMENT,
    OrderID INT,
    ProductID INT,
    Quantity INT NOT NULL CHECK (Quantity > 0),
    UnitPrice DECIMAL(10,2) NOT NULL CHECK (UnitPrice >= 0),
    Discount DECIMAL(5,2) DEFAULT 0 CHECK (Discount BETWEEN 0 AND 100),
    Subtotal DECIMAL(10,2) GENERATED ALWAYS AS (Quantity * UnitPrice * (1 - Discount / 100)) STORED,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (OrderID) REFERENCES Dtl_Orders(OrderID) ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Dtl_Products(ProductID) ON DELETE CASCADE
);

-- Bảng Kho Hàng (Inventory)
CREATE TABLE Dtl_Inventory (
    InventoryID INT PRIMARY KEY AUTO_INCREMENT,
    ProductID INT UNIQUE,
    Quantity INT NOT NULL CHECK (Quantity >= 0),
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ProductID) REFERENCES Dtl_Products(ProductID) ON DELETE CASCADE
);

-- Bảng Khuyến Mãi (Promotions)
CREATE TABLE Dtl_Promotions (
    PromotionID INT PRIMARY KEY AUTO_INCREMENT,
    PromotionName VARCHAR(255) NOT NULL UNIQUE,
    Description TEXT,
    DiscountRate DECIMAL(5,2) NOT NULL CHECK (DiscountRate BETWEEN 0 AND 100),
    StartDate DATETIME NOT NULL,
    EndDate DATETIME NOT NULL,
    Status ENUM('Active', 'Inactive') DEFAULT 'Active',
    CHECK (EndDate > StartDate)
);

-- Bảng Bàn (Tables)
CREATE TABLE Dtl_Tables (
    TableID INT PRIMARY KEY AUTO_INCREMENT,
    TableName VARCHAR(50) NOT NULL UNIQUE,
    Capacity INT NOT NULL CHECK (Capacity > 0),
    Status ENUM('Available', 'Occupied') DEFAULT 'Available',
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Bảng Đặt Chỗ (Reservations)
CREATE TABLE Dtl_Reservations (
    ReservationID INT PRIMARY KEY AUTO_INCREMENT,
    CustomerID INT,
    TableID INT,
    ReservationDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    NumberOfGuests INT NOT NULL CHECK (NumberOfGuests > 0),
    Status ENUM('Confirmed', 'Cancelled') DEFAULT 'Confirmed',
    Notes TEXT,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (CustomerID) REFERENCES Dtl_Users(UserID) ON DELETE SET NULL,
    FOREIGN KEY (TableID) REFERENCES Dtl_Tables(TableID) ON DELETE CASCADE
);

-- Dữ liệu mẫu
INSERT INTO Dtl_Users (Username, PasswordHash, FullName, Role, PhoneNumber, Email, Address, Status) VALUES
('admin', 'hashed_password_1', 'Nguyễn Văn Admin', 'Admin', '0911111111', 'admin@gmail.com', 'Hà Nội', 'Active'),
('staff1', 'hashed_password_2', 'Trần Thị Nhân Viên 1', 'Staff', '0922222222', 'staff1@gmail.com', 'TP.HCM', 'Active'),
('customer1', 'hashed_password_3', 'Lê Thị Khách Hàng', 'Customer', '0933333333', 'customer1@gmail.com', 'Đà Nẵng', 'Active');

INSERT INTO Dtl_Categories (CategoryName, Description, Status) VALUES
('Cà phê', 'Các loại cà phê truyền thống và đặc biệt', 'Active'),
('Trà', 'Các loại trà thơm ngon', 'Active');

INSERT INTO Dtl_Products (ProductName, CategoryID, Description, Price, ImageURL, Status) VALUES
('Cà phê đen', 1, 'Cà phê đen truyền thống', 25000, 'coffee_black.jpg', 'Active'),
('Trà đào', 2, 'Trà đào thơm ngon', 35000, 'peach_tea.jpg', 'Active');

