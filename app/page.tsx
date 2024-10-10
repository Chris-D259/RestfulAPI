"use client"
import { Student } from "@prisma/client";
import React from "react";
import { useState, useEffect } from "react";

export default function Home() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    fetchStudents();
  }, []);
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const studentId = parseInt((document.getElementById("studentId") as HTMLInputElement).value);
    const studentName = (document.getElementById("studentName") as HTMLInputElement).value;
    const course = (document.getElementById("course") as HTMLInputElement).value;
    const presentDate = new Date((document.getElementById("presentDate") as HTMLInputElement).value).toISOString();
    const response = await fetch("/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentId, studentName, course, presentDate }),
    });
    if (response.ok) {
      console.log("Student added successfully");
      fetchStudents();
    } else {
      console.error("Failed to add student");
    }
  }
  const fetchStudents = async () => {
    const response = await fetch("/api/students");
    if (response.ok) {
      const students = await response.json();
      setStudents(students);
      console.log(students);
    } else {
      console.error("Failed to fetch students");
    }
  }
  return (
    <main className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md" >
        <div className="mb-4">
          <label htmlFor="studentId" className="block text-gray-700 font-bold mb-2">Student ID:</label>
          <input type="text" id="studentId" name="studentID" required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="studentName" className="block text-gray-700 font-bold mb-2">Name:</label>
          <input type="text" id="studentName" name="studentName" required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="course" className="block text-gray-700 font-bold mb-2">Course:</label>
          <input type="text" id="course" name="course" required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="mb-4">
          <label htmlFor="presentDate" className="block text-gray-700 font-bold mb-2">Date:</label>
          <input type="date" id="presentDate" name="presentDate" required className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700" >Submit</button>
      </form>

      <div className="mt-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Students List</h2>
        <ul className="bg-white p-6 rounded-lg shadow-md">
          {students.length > 0 ? (
            students.map((student: Student) => (
              <li key={student.id} className="mb-4">
                <p><strong>ID:</strong> {student.studentId}</p>
                <p><strong>Name:</strong> {student.studentName}</p>
                <p><strong>Course:</strong> {student.course}</p>
                <p><strong>Date:</strong> {new Date(student.presentDate).toLocaleDateString()}</p>
              </li>
            ))
          ) : (
            <p>No students found.</p>
          )}
        </ul>
      </div>
    </main>
  );
}
