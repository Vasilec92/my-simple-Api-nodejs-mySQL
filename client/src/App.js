import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [newEmail, setNewEmail] = useState("");

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          first_name: first_name,
          last_name: last_name,
          email: email,
          phone: phone,
        },
      ]);
    });
  };

  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeEmail = (id) => {
    Axios.put("http://localhost:3001/update", { email: newEmail, id: id }).then(
      (response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id == id
              ? {
                  first_name: val.first_name,
                  last_name: val.last_name,
                  email: newEmail,
                  phone: val.phone,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setFirst_name(event.target.value);
          }}
        />
        <label>Last name:</label>
        <input
          type="text"
          onChange={(event) => {
            setLast_name(event.target.value);
          }}
        />
        <label>Email:</label>
        <input
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label>Phone:</label>
        <input
          type="text"
          onChange={(event) => {
            setPhone(event.target.value);
          }}
        />

        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Show Employees</button>

        {employeeList.map((val, key) => {
          return (
            <div key={key} className="employee">
              <div>
                <h3>Name: {val.first_name}</h3>
                <h3>Age: {val.last_name}</h3>
                <h3>email: {val.email}</h3>
                <h3>phone: {val.phone}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="update email"
                  onChange={(event) => {
                    setNewEmail(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateEmployeeEmail(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
