# Copyright (c) 2024, Josin and contributors
# For license information, please see license.txt
from frappe.model.document import Document
import frappe
from frappe.website.website_generator import WebsiteGenerator
from frappe.utils import flt



class ServiceRequest(Document):
	pass

@frappe.whitelist()
def create_invoice(customer, rate, service_request):
    """
    Creates a Sales Invoice based on the service request
    """
    try:
        invoice = frappe.get_doc({
            "doctype": "Sales Invoice",
            "customer": customer,
            "items": [
                {
                    "item_code": "Service Charge",
                    "qty": 1,
                    "rate": flt(rate),
                    "description": f"Service provided for Service Request: {service_request}"
                }
            ],
            "remarks": f"Invoice generated for Service Request: {service_request}",
        })
        
        invoice.insert()
        
        return invoice.name
    except Exception as e:
        frappe.throw(f"Error creating invoice: {str(e)}")
