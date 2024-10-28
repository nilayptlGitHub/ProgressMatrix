import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllStudents } from '../redux/StudentDataSlice';
import styled from 'styled-components';
import Cookies from 'js-cookie';
// import { selectUserID } from '../redux/userSlice';

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

// const Modal = styled.div`
//   display: ${props => props.show ? 'block' : 'none'};
//   position: fixed;
//   z-index: 1;
//   left: 0;
//   top: 0;
//   width: 100%;
//   height: 100%;
//   overflow: auto;
//   background-color: rgba(0,0,0,0.4);
// `;

// const ModalContent = styled.div`
//   background-color: #fefefe;
//   margin: 15% auto;
//   padding: 20px;
//   border: 1px solid #888;
//   width: 80%;
// `;

// const CloseButton = styled.span`
//   color: #aaa;
//   float: right;
//   font-size: 28px;
//   font-weight: bold;
//   cursor: pointer;
// `;

function AllStudentData() {
  // const dispatch = useDispatch();
  // const studentData = useSelector(state => state.studentData);

  const [AllStudent , setAllStudent] = useState([]);
  useEffect(() => {
    
    let data = JSON.stringify({
      "teacherId": 100
    });
    const token = Cookies.get('auth_Token');
    console.log(token);
    

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
        setAllStudent(response.data);
        // console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, []);

  // console.log('Student Data:', studentData); 

  // const { students, loading, error } = studentData || { students: [], loading: false, error: null };
  // const [selectedStudent, setSelectedStudent] = useState(null);
  // const teacherId = useSelector(selectUserID);
  // console.log('Teacher ID:', teacherId);

  // useEffect(() => {
  //   if (teacherId) {
  //     dispatch(fetchAllStudents(teacherId));
  //   }
  // }, [dispatch, teacherId]);

  // const calculateAge = (AllStudent.dob) => {
  //   const today = new Date();
  //   const birthDate = new Date(AllStudent.dob);
  //   let age = today.getFullYear() - birthDate.getFullYear();
  //   const monthDiff = today.getMonth() - birthDate.getMonth();
  //   if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
  //     age--;
  //   }
  //   return age;
  // };

  // const handleShowMore = useCallback((student) => {
  //   setSelectedStudent(student);
  // }, []);

  // const handleCloseModal = useCallback(() => {
  //   setSelectedStudent(null);
  // }, []);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Class Student List</h2>
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
          {AllStudent.map((student, index) => (
            <tr key={student.roll_no}>
              <Td>{index + 1}</Td>
              <Td>{student.rollNumber}</Td>
              <Td>{`${student.firstName} ${student.lastName}`}</Td>
              <Td>
                <Button onClick={() => handleShowMore(student)}>Show More</Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* <Modal show={selectedStudent !== null}>
        <ModalContent>
          <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
          {selectedStudent && (
            <div>
              <h3>Student Details</h3>
              <p><strong>Roll No:</strong> {selectedStudent.rollNumber}</p>
              <p><strong>First Name:</strong> {selectedStudent.firstName}</p>
              <p><strong>Last Name:</strong> {selectedStudent.lastName}</p>
              <p><strong>Parent Name:</strong> {selectedStudent.parentName}</p>
              <p><strong>Standard:</strong> {selectedStudent.standard}</p>
              <p><strong>Date of Birth:</strong> {selectedStudent.dateOfBirth}</p>
              <p><strong>Age:</strong> {calculateAge(selectedStudent.dateOfBirth)}</p>
              <p><strong>Parent's Contact:</strong> {selectedStudent.parentContact}</p>
              <p><strong>Address:</strong> {selectedStudent.address}</p>
            </div>
          )}
        </ModalContent>
      </Modal>  */}
    </div>
  );
}

export default AllStudentData;