import React from "react";
import logo from "./logo.svg";
import "./App.css";
import users from "./users";

const TableHead = () => {
  return (
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Campus</th>
        <th>Role</th>
        <th>Link</th>
      </tr>
    </thead>
  );
};
const Student = props => {
  const students = props.allStudents.map((student, index) => {
    return (
      <tbody>
        <tr key={index}>
          <td>{student.firstName}</td>
          <td>{student.lastName}</td>
          <td>{student.campus}</td>
          <td>{student.role}</td>
          <td>
            <a href={student.linkedin}>
              <img src="../linkedin.png" alt="link to linkedin" />
            </a>
          </td>
        </tr>
      </tbody>
    );
  });

  return (
    <table>
      <TableHead />
      {students}
    </table>
  );
};

class App extends React.Component {
  state = {
    students: [...users],
    search: "",
    isTeacher: false,
    isStudent: false,
    campus: "Paris"
  };
  handleChange = event => {
    console.log("handled!");
    this.setState({
      search: event.target.value
    });
  };
  handleChecked = event => {
    console.log("handle checkboxes");
    console.log(event.target);
    this.setState(
      {
        [event.target.name]: event.target.checked
      },
      () => console.log("after update: ", this.state)
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("submitted!");
    console.log(this.state.search);
    if (!this.state.search && !this.state.isTeacher && !this.state.isStudent) {
      this.setState({
        students: [...users],
        campus: event.target.value
      });
    } else {
      const filteredList = [...this.state.students]
        .filter(el => {
          if (
            el.firstName.includes(this.state.search) ||
            el.lastName.includes(this.state.search)
          ) {
            return true;
          }
          return false;
        })
        .filter(el => {
          if (this.state.isStudent) {
            return el.role === "student";
          }
          if (event.target.isTeacher) {
            return el.role == "teacher";
          }
          return false;
        })
        .filter(el => {
          if (el.campus == this.state.campus) {
            return true;
          }
          return false;
        });

      this.setState({
        students: filteredList
      });
    }
  };

  render() {
    return (
      <div className="App">
        <h1>IronBook</h1>
        <form onSubmit={this.handleSubmit}>
          <label type="text" name="search" htmlFor="search"></label>
          <input
            onChange={this.handleChange}
            name="search"
            id="search"
            value={this.state.search}
          ></input>
          <br />
          <label htmlFor="teacher">Teacher</label>
          <input
            onChange={this.handleChecked}
            id="teacher"
            type="checkbox"
            name="isTeacher"
            checked={this.state.isTeacher}
          ></input>
          <label htmlFor="student">Student</label>
          <input
            onChange={this.handleChecked}
            id="student"
            type="checkbox"
            name="isStudent"
            checked={this.state.isStudent}
          ></input>

          <label htmlFor="city">Campus: </label>
          <select
            onClick={this.handleChange}
            id="city"
            value={this.state.campus}
          >
            <option name="paris" value="paris">
              Paris
            </option>
            <option name="berlin" value="berlin">
              Berlin
            </option>
            <option name="lisbon" value="lisbon">
              Lisbon
            </option>
          </select>

          <button
            // style={{ display: "none" }}
            type="submit"
          >
            Search
          </button>
        </form>
        <Student allStudents={this.state.students} />
      </div>
    );
  }
}

export default App;
