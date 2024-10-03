## Taxi Service System

Taxi Management App
******************
Overview

This custom app provides functionality for managing a taxi service system within ERPNext. It includes workflows for driver and car registrations, service routes, service requests, service history logs, and invoicing. Below are the key components of the app.

Installation
To install and migrate this custom app, follow the standard Frappe/ERPNext procedures for app installation.

Doctypes
1. Driver Registration
This doctype manages the registration of new drivers. It includes a multi-step workflow that requires approval from:
HR Manager
Drivers Union
License Authority
Only users with the appropriate roles (HR Manager, Drivers Union, License Authority) are allowed to approve driver registrations at each step.

2. Car
The Car doctype is used to register new cars in the system. The registration process follows a workflow where,
Manager must first approve the car.
Government Official (with the Govt Personal role) then completes the registration process.

3. Service Route
This doctype is used to define the available service routes for the taxi service. Information captured includes,
Route Name
Start Point
Endpoint
Duration
Cost (separate for registered and non-registered users)

4. Service Request
Customers can create service requests. If a registered customer creates a request, their information is auto-fetched from the customer list. For non-registered customers, the system will treat them as guests.

* Web View
A simple web view is available for users to browse the available service routes. The web view can be accessed at: "{BASE_URL}/service-route"
Users can click on any route to view more detailed information.

* Service Request via Web View
From the detailed view of a service route, users can click on the "Request a Service" button to initiate a new service request. After submitting the request, The manager receives an email notification.
The manager can then assign the service request to a driver.
Drivers will also receive email notifications once assigned (email notifications require proper email setup in the system).
There is a worrkflow for service request also.
Manager will assign service to driver, Driver will start service and the status will change to in progress. then the driver completes the service , status will become completed


* Service History Log
The app includes a custom report named Service Log, which allows filtering by:
Period (Monthly/Daily)
Date/Month
Car
Status
This report provides a detailed log of services completed by each car.

* Invoicing
Once a driver completes a service, they can submit the service request as "Completed." A "Make Invoice" button will appear, allowing the driver to generate a draft invoice.

* Invoicing Details:
The driver can review and edit the invoice before submitting it.
If the user is linked to a customer in the customer list (a custom field is used for this link), the invoice will be associated with that customer.
Otherwise, the invoice will be linked to a default customer named Walking Customer.
A basic print format named Customer Sales Invoice is available for printing.

#### License

mit