"use client";

import { useState } from "react";

const coursesAndSemesters = {
  courses_sem1: ["ITC", "FOP", "English(1)", "Calculus", "Basic Electronics", "Islamic Studies"],
  courses_sem2: ["DLD", "OOP", "English(2)", "Probability & Statistics", "Urdu", "Pakistan Studies"],
  courses_sem3: ["CAO", "DSA", "English(3)", "Discrete Structures", "Differential Equations"],
  courses_sem4: ["DAA", "Theory of Automata", "Database Systems", "Linear Algebra", "University Elective II"],
  courses_sem5: ["Computer Networks", "Multi-variate Calculus", "Operating Systems", "ISE", "CS Elective 1"],
  courses_sem6: ["AI", "Compiler Construction", "Numerical Computing", "CS Elective 2", "Professional Practices"],
  courses_sem7: ["CS Elective 3", "CS Elective 4", "FYP 1", "University Elective III", "PDC"],
  courses_sem8: ["CS Elective 5", "University Elective IV", "FYP 2", "Information Security"],
};

export default function CGPACalculator() {
  const [semester, setSemester] = useState(1);
  const [marks, setMarks] = useState({});
  const [cgpa, setCgpa] = useState(null);

  const handleMarksChange = (course, value) => {
    setMarks((prev) => ({ ...prev, [course]: Number(value) }));
  };

  const calculateCGPA = () => {
    let totalGPA = 0, totalSubjects = 0;
    Object.values(marks).forEach((mark) => {
      if (mark >= 80) totalGPA += 4.0;
      else if (mark >= 70) totalGPA += 3.5;
      else if (mark >= 60) totalGPA += 3.0;
      else if (mark >= 55) totalGPA += 2.5;
      else if (mark >= 50) totalGPA += 2.0;
      else totalGPA += 0;
      totalSubjects++;
    });
    setCgpa(totalSubjects > 0 ? (totalGPA / totalSubjects).toFixed(2) : null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 p-6">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">CGPA Calculator</h1>
        
        <label className="block">
          <span className="text-gray-700 font-semibold">Select Semester:</span>
          <select
            className="block w-full mt-2 border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
            value={semester}
            onChange={(e) => setSemester(Number(e.target.value))}
          >
            {[...Array(8).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>{`Semester ${i + 1}`}</option>
            ))}
          </select>
        </label>
        
        <div className="space-y-4">
          {coursesAndSemesters[`courses_sem${semester}`].map((course) => (
            <div key={course} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm">
              <label className="text-gray-700 font-medium">{course}:</label>
              <input
                type="number"
                className="border border-gray-300 p-2 rounded w-24 focus:ring-2 focus:ring-blue-400"
                placeholder="Marks"
                onChange={(e) => handleMarksChange(course, e.target.value)}
              />
            </div>
          ))}
        </div>
        
        <button
          onClick={calculateCGPA}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl text-lg font-bold shadow-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 transform hover:-translate-y-1"
        >
          Calculate CGPA
        </button>
        
        {cgpa !== null && (
          <div className="text-xl font-bold text-center text-gray-800 mt-4 bg-green-100 p-3 rounded-lg">
            Your CGPA: <span className="text-green-600">{cgpa}</span>
          </div>
        )}
         <p className="text-center text-gray-400 text-sm mt-4">Prepared by  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Sumair Khan</span></p>
      </div>
    </div>
  );
}
