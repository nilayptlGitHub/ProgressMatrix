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
  const token = Cookies.get('auth_Token');
  // console.log(token);


  useEffect(() => {
    
    let data = JSON.stringify({
      "teacherId": 100
    });

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/teacher/allstudent',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: data,
      withCredentials: true
    };

    axios.request(config)
      .then((response) => {
        setStudents(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });

  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <Th>Sr. No</Th>
            <Th>Roll No</Th>
            <Th>Name</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.rollno}>
              <Td>{index + 1}</Td>
              <Td>{student.rollno}</Td>
              <Td>{`${student.firstName} ${student.lastName}`}</Td>
              <Td>
                <Button onClick={() => handleShowMore(student)}>Show More</Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
  );
};

export default TryData;
