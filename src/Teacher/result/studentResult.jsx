import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const Th = styled.th`
  background-color: #f2f2f2;
  padding: 12px;
  text-align: left;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const Button = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  cursor: pointer;
`;

const TryData = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [subjectCodes, setSubjectCodes] = useState([]);
  const token = Cookies.get('auth_Token');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        let config = {
          method: 'get',
          maxBodyLength: Infinity,
          url: 'http://localhost:3000/api/teacher/allstudent',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          withCredentials: true
        };
        
        const response = await axios.request(config);
        const studentData = response.data;
        console.log(studentData);
        

        // Extract all unique subject codes from the students' grades
        const allSubjectCodes = new Set();
        studentData.forEach(student => {
          student.grades.forEach(grade => {
            allSubjectCodes.add(grade.subjectId);
          });
        });

        setSubjectCodes(Array.from(allSubjectCodes));
        setStudents(studentData);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    fetchStudents();
  }, [token]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <Th>Sr. No</Th>
            <Th>Roll No</Th>
            <Th>Name</Th>
            {/* Render subject codes as headers */}
            {subjectCodes.map((subjectCode, index) => (
              <Th key={index}>{subjectCode}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.rollno}>
              <Td>{index + 1}</Td>
              <Td>{student.rollno}</Td>
              <Td>{`${student.firstName} ${student.lastName}`}</Td>
              {subjectCodes.map((subjectCode) => {
                const grade = student.grades.find(
                  (grade) => grade.subjectId === subjectCode
                );
                return (
                  <Td key={subjectCode}>
                    {grade ? grade.marksObtained : '-'}
                  </Td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TryData;
