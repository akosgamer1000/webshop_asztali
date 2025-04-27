## 1. Authentication Module

### 1.1 Login Functionality

| Test Case | Input | Expected Result | Actual Result | Status | Time |
|:----------|:------|:----------------|:--------------|:-------|:-----|
| Invalid Password | Email: barmiAron2@example.com<br>Password: asd<br>Role: admin | Invalid credentials | Invalid credentials | ✅ | 12:52 |
| Valid Credentials | Email: barmiAron2@example.com<br>Password: **Dsa1234.**<br>Role: admin | Successful login | Successful login | ✅ | 12:54 |
| Invalid Email | Email: barmiAron15@example.com<br>Password: **Dsa1234.**<br>Role: admin | Invalid credentials | Invalid credentials | ✅ | 12:56 |
| Non-admin Access | Email: barmiAron5@example.comm<br>Password: **Asd1234.**<br>Role: user | Please log in with an admin user | Please log in with an admin user | ✅ | 13:01 |
| Logout | - | Successful | Successful | ✅ | 16:58 |

## 2. Product Management

### 2.1 Product Viewing and Search

| Test Case | Input | Expected Result | Actual Result | Status | Time |
|:----------|:------|:----------------|:--------------|:-------|:-----|
| View All Products | - | Loads all products | Loads all products | ✅ | 13:04 |
| View Single Product | - | Displays product data | Displays product data | ✅ | 13:06 |
| Search by Name | "Intel" | Filters results | Filters results | ✅ | 15:29 |
| Search by Manufacturer | "Intel" | Filters results | Filters results | ✅ | 15:29 |
| Search by Type | "processor" | Filters results | Filters results | ✅ | 15:30 |

### 2.2 Product Price Modifications

| Test Case | Input | Expected Result | Actual Result | Status | Time |
|:----------|:------|:----------------|:--------------|:-------|:-----|
| Percentage Increase Exceeding Limit | 110% | Percentage must be between -100 and 100 | Percentage must be between -100 and 100 | ✅ | 13:08 |
| Valid Price Increase | 10% on base price 604.99 | 664.99 | 664.99 | ✅ | 13:23 |
| Zero/Negative Price Prevention | -100% | Price cannot be zero or negative | Price cannot be zero or negative | ✅ | 13:26 |
| Percentage Decrease Exceeding Limit | -101% | Percentage must be between -100 and 100 | Percentage must be between -100 and 100 | ✅ | 13:27 |
| Valid Price Decrease | -50% on base price 224.99 | 112.99 | 112.99 | ✅ | 13:31 |

### 2.3 Product Stock Management

| Test Case | Input | Expected Result | Actual Result | Status | Time |
|:----------|:------|:----------------|:--------------|:-------|:-----|
| Stock Increase | Base: 10, Add: +10 | 20 | 20 | ✅ | 13:33 |
| Stock Decrease | Base: 20, Remove: -10 | 10 | 10 | ✅ | 13:34 |
| Invalid Stock Reduction | Base: 10, Remove: -20 | Cannot remove more than the available quantity | Cannot remove more than the available quantity | ✅ | 13:35 |

### 2.4 Product URL Management

| Test Case | Input | Expected Result | Actual Result | Status | Time |
|:----------|:------|:----------------|:--------------|:-------|:-----|
| URL Change | Original: "https://example.com/image.jpg"<br>New: "https://example1.com/image.jpg" | "https://example1.com/image.jpg" | "https://example1.com/image.jpg" | ✅ | 13:57 |

### 2.5 Product Creation

| Test Case | Input | Expected Result | Actual Result | Status | Time |
|:----------|:------|:----------------|:--------------|:-------|:-----|
| Empty Field Validation | Any empty field | HTML field error | HTML field error | ✅ | 17:07 |
| Invalid Image URL | URL: hello.jpg | Image URL must be valid format (http/https) ending with image extension | Image URL must be valid format (http/https) ending with image extension | ✅ | 17:33 |
| Negative Value Validation | -1 in number field | Must be higher or equal to 0 | Must be higher or equal to 0 | ✅ | 17:38 |
| Successful Product Creation | All fields filled, all numbers ≥ 0 | Created successfully | Created successfully | ✅ | 17:37 |

## 3. Order Management

### 3.1 Order Search and View

| Test Case | Input | Expected Result | Actual Result | Status | Time |
|:----------|:------|:----------------|:--------------|:-------|:-----|
| Search by ID | 1 | Filters results | Filters results | ✅ | 15:31 |
| Search by Status | "Pending" | Filters results | Filters results | ✅ | 15:31 |
| View Order Details | - | Displays details | Displays details | ✅ | 15:37 |

### 3.2 Order Status Management

| Test Case | Input | Expected Result | Actual Result | Status | Time |
|:----------|:------|:----------------|:--------------|:-------|:-----|
| Change Status: Pending to In Progress | - | Status changed | Status changed | ✅ | 15:34 |
| Change Status: In Progress to Delivered | - | Status changed | Status changed | ✅ | 15:36 |
| Cancel Order | - | Order cancelled | Order cancelled | ✅ | 15:37 |

## 4. User Management

### 4.1 User Search and View

| Test Case | Input | Expected Result | Actual Result | Status | Time |
|:----------|:------|:----------------|:--------------|:-------|:-----|
| Load All Users | - | Users loaded | Users loaded | ✅ | 15:42 |
| Search by Name | "Áron" | User found | User found | ✅ | 15:44 |
| Search by Email | "barmiAron2" | User found | User found | ✅ | 15:45 |
| View User Details | - | Details displayed | Details displayed | ✅ | 15:49 |

### 4.2 User Creation and Deletion

| Test Case | Input | Expected Result | Actual Result | Status | Time |
|:----------|:------|:----------------|:--------------|:-------|:-----|
| Invalid Email Format (Missing @) | Name: Bence<br>Email: email<br>Password: **Dsa1234.**<br>Address: fff<br>Role: user | HTML error: @ required | HTML error: @ required | ✅ | 16:02 |
| Invalid Email Format (Incomplete) | Name: Bence<br>Email: email@gmail<br>Password: **Dsa1234.**<br>Address: fff<br>Role: user | Invalid email format | Invalid email format | ✅ | 16:05 |
| Weak Password | Name: Bence<br>Email: email@gmail.com<br>Password: **dsa1234**<br>Address: fff<br>Role: user | Password must be strong: min 8 chars, 1 lowercase, 1 uppercase, 1 number, 1 symbol | Password must be strong: min 8 chars, 1 lowercase, 1 uppercase, 1 number, 1 symbol | ✅ | 16:11 |
| Duplicate Email | Name: Bence<br>Email: barmiAron2@example.com<br>Password: **Dsa1234.**<br>Address: fff<br>Role: user | User with this email already exists | User with this email already exists | ✅ | 16:24 |
| Successful User Creation | Name: Bence<br>Email: email@gmail.com<br>Password: **Dsa1234.**<br>Address: fff<br>Role: user | User added | User added | ✅ | 16:14 |
| User Deletion | - | User deleted | User deleted | ✅ | 16:01 |

### 4.3 Profile Management

| Test Case | Input | Expected Result | Actual Result | Status | Time |
|:----------|:------|:----------------|:--------------|:-------|:-----|
| View Profile | - | Profile displayed | Profile displayed | ✅ | 16:35 |
| Incorrect Current Password | Current: asd<br>New: Dsa1234. | Wrong old password | Wrong old password | ✅ | 16:46 |
| Weak New Password (Length) | Current: **Asd1234.**<br>New: dsa1234. | Password must be at least 8 characters long | Password must be at least 8 characters long | ✅ | 16:51 |
| Weak New Password (Complexity) | Current: **Asd1234.**<br>New: dsa1234. | Password must include lowercase, uppercase, number, and special character | Password must include lowercase, uppercase, number, and special character | ✅ | 16:51 |
| Successful Password Change | Current: **Asd1234.**<br>New: Dsa1234. | Success | Success | ✅ | 16:56 |
| Save Settings | - | Settings saved | Settings saved | ✅ | 16:58 |