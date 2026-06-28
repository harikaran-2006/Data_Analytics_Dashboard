import pandas as pd
import psycopg2
import matplotlib.pyplot as plt

# ----------------------------
# Database Connection
# ----------------------------

conn = psycopg2.connect(
    host="localhost",
    database="analytics",
    user="postgres",
    password="YOUR_PASSWORD",
    port="5432"
)

# ----------------------------
# Read Sales Data
# ----------------------------

query = "SELECT * FROM sales"

df = pd.read_sql(query, conn)

print("\n========== SALES DATA ==========\n")
print(df)

# ----------------------------
# KPI Calculations
# ----------------------------

total_sales = df["amount"].sum()
average_sales = df["amount"].mean()
total_orders = len(df)

print("\n========== KPI ==========\n")

print(f"Total Sales      : ₹{total_sales:,.2f}")
print(f"Average Sales    : ₹{average_sales:,.2f}")
print(f"Total Orders     : {total_orders}")

# ----------------------------
# Category-wise Sales
# ----------------------------

category_sales = df.groupby("category")["amount"].sum()

print("\n========== CATEGORY SALES ==========\n")
print(category_sales)

# ----------------------------
# Monthly Sales
# ----------------------------

df["sale_date"] = pd.to_datetime(df["sale_date"])

monthly_sales = (
    df.groupby(df["sale_date"].dt.strftime("%b"))["amount"]
      .sum()
)

print("\n========== MONTHLY SALES ==========\n")
print(monthly_sales)

# ----------------------------
# Export to CSV
# ----------------------------

df.to_csv("sales_report.csv", index=False)

print("\nCSV Report Generated Successfully!")

# ----------------------------
# Bar Chart
# ----------------------------

plt.figure(figsize=(7,5))

plt.bar(category_sales.index,
        category_sales.values)

plt.title("Sales by Category")

plt.xlabel("Category")

plt.ylabel("Sales Amount")

plt.tight_layout()

plt.show()

# ----------------------------
# Pie Chart
# ----------------------------

plt.figure(figsize=(6,6))

plt.pie(
    category_sales.values,
    labels=category_sales.index,
    autopct="%1.1f%%"
)

plt.title("Category Distribution")

plt.show()

# ----------------------------
# Line Chart
# ----------------------------

plt.figure(figsize=(8,5))

plt.plot(
    monthly_sales.index,
    monthly_sales.values,
    marker="o"
)

plt.title("Monthly Sales")

plt.xlabel("Month")

plt.ylabel("Sales")

plt.grid(True)

plt.show()

# ----------------------------
# Close Connection
# ----------------------------

conn.close()

print("\nDatabase Connection Closed")
