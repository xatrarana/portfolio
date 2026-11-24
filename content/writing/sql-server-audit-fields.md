---
title: SQL Server Audit field guide
card: SQL Server Audit, *field by field*
heading: SQL Server Audit, *field by field*
date: 2026-11-24
tags: Guide, SQL Server, Audit, Windows
stack: SQL Server · SSMS · T-SQL
summary: What Object Class, Object Schema, Object Name and Principal really mean in a Database Audit Specification, and how to track down audit events you never asked for.
---

# Understand the fields

## 1. The four fields

When creating a **Database Audit Specification** in SQL Server, you will see the following fields:

- **Object Class**
- **Object Schema**
- **Object Name**
- **Principal**

These fields define **what object** should be audited and **who** should be audited.

## 2. Database Structure

Suppose your database contains the following objects:

```diagram
Database
│
├── dbo
│     ├── Customers
│     ├── Orders
│     └── Users
│
├── Sales
│     ├── Products
│     └── Invoice
│
└── HR
      ├── Employee
      └── Payroll
```

- **Database**: the entire SQL database
- **Schema**: a folder-like container (`dbo`, `Sales`, `HR`)
- **Objects**: tables, views, stored procedures, functions and so on

## 3. Object Class

Object Class tells SQL Server **what type of object** you want to audit.

| Object Class | Description | Example |
| --- | --- | --- |
| DATABASE | Entire database | Audit every object in the database |
| SCHEMA | Entire schema | Audit everything inside `Sales` |
| OBJECT | Specific object | Audit only `dbo.Customers` |

### OBJECT: one object

| Field | Value |
| --- | --- |
| Object Class | OBJECT |
| Object Schema | dbo |
| Object Name | Customers |

This audits only `dbo.Customers`. It does not audit `dbo.Orders`, `dbo.Users` or `Sales.Products`.

### SCHEMA: everything in one schema

| Field | Value |
| --- | --- |
| Object Class | SCHEMA |
| Object Schema | Sales |

This audits everything under the **Sales** schema:

```text
Sales.Products
Sales.Invoice
```

Objects added to `Sales` later are covered too.

### DATABASE: the whole database

| Field | Value |
| --- | --- |
| Object Class | DATABASE |

No schema or object name is required. This audits all schemas, tables, views, procedures and functions.

> This can generate a very large number of audit events.

## 4. Object Schema

The schema is similar to a folder inside the database. In `dbo.Customers`, `dbo` is the schema and `Customers` is the table. In `Sales.Orders`, `Sales` is the schema and `Orders` is the table.

Commonly used schemas: `dbo`, `Sales`, `HR`, `Finance`, `Inventory`.

## 5. Object Name

Object Name is the exact database object you want to audit.

| Type | Example |
| --- | --- |
| Table | `Customers`, `Orders`, `Users` |
| View | `vCustomerOrders` |
| Stored procedure | `usp_CreateCustomer` |
| Function | `fn_GetCustomer` |

## 6. Principal

Principal specifies **who** should be audited.

| Principal | What gets recorded |
| --- | --- |
| `LabUser` | Only activity performed by **LabUser** |
| `public` | Activity from all database users |
| `db_owner` | Activity from members of the **db_owner** role |

# Examples

## 7. Four Worked Examples

### Example 1: every INSERT into one table

| Field | Value |
| --- | --- |
| Audit Action | INSERT |
| Object Class | OBJECT |
| Object Schema | dbo |
| Object Name | Customers |
| Principal | public |

> Audit every INSERT into `dbo.Customers` performed by any user.

### Example 2: UPDATEs by one user

| Field | Value |
| --- | --- |
| Audit Action | UPDATE |
| Object Class | OBJECT |
| Object Schema | dbo |
| Object Name | Customers |
| Principal | LabUser |

> Only audit UPDATE operations made by **LabUser** on **dbo.Customers**.

### Example 3: everything in the HR schema

| Field | Value |
| --- | --- |
| Audit Action | INSERT |
| Object Class | SCHEMA |
| Object Schema | HR |
| Object Name | *(Blank)* |
| Principal | public |

This audits `HR.Employee`, `HR.Payroll` and any table added to `HR` later.

### Example 4: every object in the database

| Field | Value |
| --- | --- |
| Audit Action | INSERT |
| Object Class | DATABASE |
| Object Schema | *(Blank)* |
| Object Name | *(Blank)* |
| Principal | public |

This audits INSERT operations on every table in the database.

# Production

## 8. Production Best Practices

### Authentication events

Use a **Server Audit Specification** for successful and failed logins, server role changes, permission changes, database creation, and backup and restore.

### Schema changes

Use the action groups `SCHEMA_OBJECT_CHANGE_GROUP` and `DATABASE_OBJECT_CHANGE_GROUP`. Leave Object Class, Object Schema, Object Name and Principal blank: these groups automatically apply to the relevant scope.

### CRUD operations

Audit only sensitive tables, for example INSERT on `dbo.Customers` by `public`, then repeat for UPDATE and DELETE.

> Avoid auditing SELECT unless there is a specific compliance or security requirement.

## 9. Recommended Configuration

| Purpose | Object Class | Schema | Object Name | Principal |
| --- | --- | --- | --- | --- |
| Audit one table | OBJECT | dbo | Customers | public |
| Audit one schema | SCHEMA | HR | *(Blank)* | public |
| Audit entire database | DATABASE | *(Blank)* | *(Blank)* | public |
| Audit one user | OBJECT | dbo | Customers | LabUser |

## 10. When to Leave the Fields Blank

Leave **Object Class**, **Object Schema**, **Object Name** and **Principal** blank when using audit action groups such as:

- `SCHEMA_OBJECT_CHANGE_GROUP`
- `DATABASE_OBJECT_CHANGE_GROUP`
- `DATABASE_PERMISSION_CHANGE_GROUP`
- `DATABASE_PRINCIPAL_CHANGE_GROUP`
- `DATABASE_ROLE_MEMBER_CHANGE_GROUP`
- `DATABASE_OWNERSHIP_CHANGE_GROUP`

These groups already define what SQL Server should audit.

## 11. Quick Cheat Sheet

| I want to audit… | Object Class | Schema | Object Name |
| --- | --- | --- | --- |
| One table | OBJECT | dbo | Customers |
| One schema | SCHEMA | Sales | *(Blank)* |
| Entire database | DATABASE | *(Blank)* | *(Blank)* |
| One stored procedure | OBJECT | dbo | usp_CreateCustomer |
| One view | OBJECT | dbo | vCustomers |

## 12. Rule of Thumb

- **OBJECT**: audit one object (table, view, procedure, function)
- **SCHEMA**: audit everything inside one schema
- **DATABASE**: audit everything in the database
- **Principal**: who is audited (`public`, a specific user, or a database role)

# Troubleshoot

## 13. Unexpected Audit Events

If you see **SELECT (or INSERT, UPDATE, DELETE) events that you never explicitly configured**, it is almost always because a broad **audit action group** is enabled somewhere, at either the Server Audit Specification or the Database Audit Specification level, and it is scoped `BY public`, so it applies to all logins and users.

> **Golden rule:** action groups (names ending in `_GROUP`) audit broadly and cannot be limited to one table. Individual audit actions (`SELECT`, `INSERT`, `UPDATE`, `DELETE`, `EXECUTE`, `REFERENCES`) can be scoped to a specific object and a specific principal.

## 14. Diagnostic Checklist

Run these in order.

### Step 1: check the Database Audit Specification

```sql
SELECT
    s.name AS audit_spec_name,
    d.audit_action_name,
    d.major_id,
    OBJECT_NAME(d.major_id) AS object_name,
    d.audited_principal_id,
    USER_NAME(d.audited_principal_id) AS principal_name,
    d.audited_result
FROM sys.database_audit_specification_details d
JOIN sys.database_audit_specifications s
    ON d.database_specification_id = s.database_specification_id;
```

- Look for `SELECT`, `INSERT`, `UPDATE` and `DELETE` rows.
- `major_id = 0` with `principal_name = public` means the rule is not scoped to a specific table or user, so it captures broadly.
- `_ACCESS_GROUP` entries here, such as `DATABASE_OBJECT_ACCESS_GROUP`, mean broad DML and SELECT capture at database scope.

### Step 2: check the Server Audit Specification (often the real source)

```sql
SELECT
    s.name AS server_audit_spec_name,
    d.audit_action_name,
    d.audited_principal_id,
    SUSER_NAME(d.audited_principal_id) AS principal_name,
    d.audited_result
FROM sys.server_audit_specification_details d
JOIN sys.server_audit_specifications s
    ON d.server_specification_id = s.server_specification_id;
```

- `SCHEMA_OBJECT_ACCESS_GROUP` audits SELECT, INSERT, UPDATE, DELETE and EXECUTE on all schema objects, in all databases, for all users. **This is the number one cause of unexplained SELECT events.**
- Also watch for `DATABASE_OBJECT_ACCESS_GROUP`.

### Step 3: confirm only one spec is active

```sql
SELECT name, audit_guid, is_state_enabled, create_date, modify_date
FROM sys.server_audit_specifications;

SELECT name, audit_guid, is_state_enabled, create_date, modify_date
FROM sys.database_audit_specifications;
```

Old or duplicate specs left enabled cause duplicate or conflicting audit noise.

### Step 4: read is_column_permission correctly

`is_column_permission:true` in raw audit events is **a symptom, not a cause**. SQL Server evaluates column-level permissions on every SELECT internally; it is only written to the audit log if an active group or action is already capturing that access. Fixing the group from step 1 or 2 resolves it.

## 15. The Fix Pattern

### Broad group at server level

```sql
-- 1. Disable before altering
ALTER SERVER AUDIT SPECIFICATION [SpecName]
WITH (STATE = OFF);

-- 2. Drop the broad group
ALTER SERVER AUDIT SPECIFICATION [SpecName]
DROP (SCHEMA_OBJECT_ACCESS_GROUP);   -- or DATABASE_OBJECT_ACCESS_GROUP

-- 3. Re-enable
ALTER SERVER AUDIT SPECIFICATION [SpecName]
WITH (STATE = ON);
```

### Broad action at database level

```sql
ALTER DATABASE AUDIT SPECIFICATION [SpecName]
WITH (STATE = OFF);

ALTER DATABASE AUDIT SPECIFICATION [SpecName]
DROP (SELECT ON DATABASE::YourDB BY PUBLIC);  -- or the group in question

ALTER DATABASE AUDIT SPECIFICATION [SpecName]
WITH (STATE = ON);
```

### Then add a scoped table and user rule instead

```sql
ALTER DATABASE AUDIT SPECIFICATION [SpecName]
WITH (STATE = OFF);

ALTER DATABASE AUDIT SPECIFICATION [SpecName]
ADD (SELECT ON dbo.TableName BY [SpecificUserName]);

ALTER DATABASE AUDIT SPECIFICATION [SpecName]
WITH (STATE = ON);
```

Repeat `ADD (...)` for each additional table and user pair.

## 16. Points to Remember On Site

| # | Point to remember |
| --- | --- |
| 1 | **Groups vs actions:** a `_GROUP` suffix means broad and cannot be scoped to one object. Individual actions (SELECT, INSERT, UPDATE, DELETE, EXECUTE, REFERENCES) can be scoped with `ON object BY principal`. |
| 2 | **Check both levels:** a group in either the Server or the Database Audit Specification can cause unexpected captures. Fixing only one may not solve the issue. |
| 3 | **`BY PUBLIC` means everyone.** Always confirm whether a rule is scoped `BY PUBLIC` or `BY [specific user]`. |
| 4 | **`major_id = 0` means database or schema wide**, not tied to one object. A real object-scoped rule shows a `major_id` that maps to an object name via `OBJECT_NAME()`. |
| 5 | **`SCHEMA_OBJECT_ACCESS_GROUP`** is the most common cause of SELECT events with no rule for them. Many audit setup scripts use it as an easy "audit everything" shortcut. |
| 6 | Audit specs must be set `STATE = OFF` before you can `ADD` or `DROP` actions or groups, then `STATE = ON` again afterwards. |
| 7 | Don't blindly drop `FAILED_LOGIN_GROUP`, `SUCCESSFUL_LOGIN_GROUP`, `BACKUP_RESTORE_GROUP`, `AUDIT_CHANGE_GROUP` or `SERVER_PERMISSION_CHANGE_GROUP`. They are legitimate, low-noise security groups and are usually fine to keep. |
| 8 | On a server with several databases, removing a server-level `_ACCESS_GROUP` means you need explicit database audit specs **in each database** you want to monitor. The server group was covering all of them at once. |
| 9 | Always re-query `sys.server_audit_specification_details` and `sys.database_audit_specification_details` after changes to confirm the scoped rule is in place and the broad one is gone. |
| 10 | Check the audit **target** (file, Windows Application log or Security log) in `sys.server_audits` before assuming a config problem. Sometimes the audit works and is just being read from the wrong place. |

## 17. Combined Diagnostic Query

Run this and look for `_ACCESS_GROUP` or `public`:

```sql
SELECT 'SERVER' AS level, s.name AS spec_name, d.audit_action_name,
       NULL AS object_name, SUSER_NAME(d.audited_principal_id) AS principal
FROM sys.server_audit_specification_details d
JOIN sys.server_audit_specifications s
    ON d.server_specification_id = s.server_specification_id

UNION ALL

SELECT 'DATABASE' AS level, s.name, d.audit_action_name,
       OBJECT_NAME(d.major_id), USER_NAME(d.audited_principal_id)
FROM sys.database_audit_specification_details d
JOIN sys.database_audit_specifications s
    ON d.database_specification_id = s.database_specification_id;
```

## 18. Mental Model

```diagram
Unexpected SELECT/INSERT/UPDATE/DELETE showing up in audit?
        │
        ├── Check Server Audit Specification
        │      └── Look for *_ACCESS_GROUP
        │          (SCHEMA_OBJECT_ACCESS_GROUP / DATABASE_OBJECT_ACCESS_GROUP)
        │
        ├── Check Database Audit Specification
        │      └── Look for SELECT/INSERT/UPDATE/DELETE
        │          with major_id = 0 and principal = public
        │
        └── Fix: DROP the broad group/action
                 → ADD a scoped (object + named principal) rule instead
```

# Appendix

## 19. Disable the SQL Server Telemetry Service

SQL Server installs a telemetry (CEIP) service that sends usage data to Microsoft. On locked-down servers you may want it off.

### Method 1: Services

1. Press **Win + R**, type `services.msc` and press Enter.
2. Find **SQL Server CEIP Service** or **SQL Server Telemetry**.
3. Right-click the service and choose **Properties**.
4. Click **Stop**.
5. Set **Startup type** to **Disabled**.
6. Click **Apply**, then **OK**.

### Method 2: PowerShell (as Administrator)

List the telemetry services:

```powershell
Get-Service *telemetry*
```

Stop them and keep them from starting again:

```powershell
Get-Service *telemetry* | Stop-Service -Force
Get-Service *telemetry* | Set-Service -StartupType Disabled
```

Confirm:

```powershell
Get-Service *telemetry* | Select-Object Name, Status, StartType
```

```output
Status: Stopped    StartType: Disabled
```
