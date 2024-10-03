// Copyright (c) 2024, Josin and contributors
// For license information, please see license.txt


frappe.query_reports["Service Log"] = {
	"filters": [
        {
            "fieldname": "type",
            "label": __("Type"),
            "fieldtype": "Select",
            "options": ["Monthly", "Daily"],
            "default": "Monthly",
            "reqd": 1,
            "on_change": function() {
                const type = frappe.query_report.get_filter_value('type');
                if (type === "Monthly") {
                    frappe.query_report.toggle_filter_display('month', false);
                    frappe.query_report.toggle_filter_display('date', true);
                    frappe.query_report.toggle_filter_display('year', false);
                } 
                else if (type === "Daily") {
                    frappe.query_report.toggle_filter_display('month', true);
                    frappe.query_report.toggle_filter_display('date', false);
                    frappe.query_report.toggle_filter_display('year', true);

                }
            }
        },
		{
			"fieldname": "year",
            "label": __("Year"),
            "fieldtype": "Select",
            "options": ["2024","2023","2022","2021","2020"],
			"reqd": 1,
            "default": frappe.datetime.str_to_user(frappe.datetime.nowdate()).split("-")[0], 
            "hidden": 0
		},
        {
            "fieldname": "month",
            "label": __("Month"),
            "fieldtype": "Select",
            "options": [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ],
            "reqd": 1,
            "default": frappe.datetime.str_to_user(frappe.datetime.nowdate()).split("-")[1],  
            "hidden": 0  
        },
        {
            "fieldname": "date",
            "label": __("Date"),
            "fieldtype": "Date",
            "reqd": 1,
            "default": frappe.datetime.get_today(),
            "hidden": 1 
        },
		{
            "fieldname": "status",
            "label": __("Status"),
            "fieldtype": "Select",
			"options": ["Pending","In Progress","Assigned","Completed"],
            "reqd": 0
        },
        {
            "fieldname": "car",
            "label": "Car",
            "fieldtype": "Link",
            "options": "Car",
            "reqd": 0
        }
        
        
	]
};


