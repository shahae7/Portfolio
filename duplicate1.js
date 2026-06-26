function employeeDetails() {
  const employee = {
    id: 101,
    name: "John",
    department: "IT",
    salary: 50000,
    location: "Chennai"
  };

  console.log(employee.id);
  console.log(employee.name);
  console.log(employee.department);
  console.log(employee.salary);
  console.log(employee.location);

  if (employee.salary > 40000) {
    console.log("Eligible for Bonus");
  } else {
    console.log("Not Eligible");
  }

  console.log("Employee Details Processed");
}

employeeDetails();
