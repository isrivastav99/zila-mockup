import React, { useState, useEffect } from "react";
import "./App.css";
import Loader from "./components/Loader";
import * as XLSX from "xlsx";

function App() {
  const [items, setItems] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const sheetName = wb.SheetNames[0];
        const sheet = wb.Sheets[sheetName];
        console.log(sheet);
        const data = XLSX.utils.sheet_to_json(sheet, { raw: false });
        resolve(data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      console.log(d);
      setItems(d);
    });
  };
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">S no.</th>
            <th scope="col">Name</th>
            <th scope="col">Date of Birth</th>
            <th scope="col">Age</th>
            <th scope="col">Salary</th>
            <th scope="col">Tax</th>
          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={d.Sno}>
              <td>{d.Sno}</td>
              <td>{d.Name}</td>
              <td>{d.Dob}</td>
              <td>{d.Age}</td>
              <td>{d.Salary}</td>
              <td>{d.Tax}</td>
            </tr>
          ))}
        </tbody>
        <tbody></tbody>
      </table>
    </div>
  );
}

export default App;
