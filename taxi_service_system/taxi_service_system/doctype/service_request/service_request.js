// // Copyright (c) 2024, Josin and contributors
// // For license information, please see license.txt


frappe.ui.form.on('Service Request', {
    refresh(frm) {
        frm.add_custom_button(__("Make Invoice"), function() {
            frappe.db.get_value("Customer", { "custom_user": frm.doc.customer }, "name")
                .then((result) => {
                    let customer_name;
                    let rate;
                    if (result && result.message && result.message.name) {
                        customer_name = result.message.name;
                    } else {
                        customer_name = "Walking Customer";
                    }

                    if (frm.doc.customer !== "Guest") {
                        rate = frm.doc.total_amount_for_regd;
                    } else {
                        rate = frm.doc.amount_for_guest;
                    }
                    frappe.call({
                        method: "taxi_service_system.taxi_service_system.doctype.service_request.service_request.create_invoice",
                        args: {
                            customer: customer_name,
                            rate: rate,
                            service_request: frm.doc.name
                        },
                        callback: function(response) {
                            if (response.message) {
                                frappe.set_route('Form', 'Sales Invoice', response.message);
                            }
                        }
                    });
                })
                .catch((error) => {
                    console.error(error);
                    frappe.msgprint(__("There was an error while creating the invoice."));
                });
        });
    }
});
