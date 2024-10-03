# Copyright (c) 2024, Josin and contributors
# For license information, please see license.txt


import frappe
from frappe import _

def execute(filters=None):
    columns = get_columns()
    data = get_data(filters)
    return columns, data

    
def get_columns():
    return [
        {
            "label": _("Date"),
            "fieldname": "creation",
            "fieldtype": "Date",
            "width": 180
		},
        {
            "label": _("Requested Date"),
            "fieldname": "date",
            "fieldtype": "Date",
            "width": 180
        },
        {
            "label": _("Service ID"),
            "fieldname": "service_id",
            "fieldtype": "Data",
            "width": 150
        },
        {
            "label": _("Status"),
            "fieldname": "status",
            "fieldtype": "Data",
            "width": 150
        },
        {
            "label": _("Customer"),
            "fieldname": "customer",
            "fieldtype": "Data",
            "width": 200
        },
        {
            "label": _("Total Amount"),
            "fieldname": "total_amount",
            "fieldtype": "Currency",
            "width": 120
        }
    ]

def get_data(filters):
    from_date = None
    to_date = None
    status_filter = None
    values = []

    if filters:
        if filters.get("type") == "Monthly":
            month = filters.get("month")
            year = filters.get("year")
            
            # Map month names to their corresponding numeric values
            month_mapping = {
                "January": 1,
                "February": 2,
                "March": 3,
                "April": 4,
                "May": 5,
                "June": 6,
                "July": 7,
                "August": 8,
                "September": 9,
                "October": 10,
                "November": 11,
                "December": 12
            }

            month_num = month_mapping.get(month)
            from_date = f"{year}-{month_num:02d}-01"
            to_date = frappe.utils.get_last_day(from_date)
            print(from_date,to_date)
        else:
            selected_date = filters.get("date")
            from_date = selected_date
            to_date = selected_date
        values.extend([from_date, to_date])

    query = """
        SELECT
            name AS service_id,
            requested_date AS date,
            customer,
            creation,
            status,
            CASE
                WHEN customer != 'Guest' THEN total_amount_for_regd
                ELSE amount_for_guest
            END AS total_amount
        FROM
            `tabService Request`
        WHERE
            requested_date BETWEEN %s AND %s
    """
    if status_filter:
        query += " AND status = %s"
    data = frappe.db.sql(query, values, as_dict=True)

    return data
