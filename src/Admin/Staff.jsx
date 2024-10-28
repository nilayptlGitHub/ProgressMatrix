import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUserProfile } from '../redux/userSlice';



const Staff = () => {
  const token = Cookies.get('auth_Token');
  const [showModal, setShowModal] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const profile = useSelector(selectUserProfile);
  const schoolId = profile.schoolData.school_id;
  const [formData, setFormData] = useState({
    teacher_fname: "",
    teacher_lname: "",
    teacher_email: "",
    allocated_standard: "",
    dob: "",
    school_id: schoolId,
  });

  // Open Modal
  const openModal = () => {
    setShowModal(true);
  };

  // Close Modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Convert the date to DD/MM/YYYY format
  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
  
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/admin/allteacher',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true
    };

    axios.request(config)
      .then((response) => {
        setTeachers(response.data);
        // console.log(response.data);
        
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      dob: formatDate(formData.dob), 
    };
    console.log(formattedData);
    

    try {
      const response = await fetch("http://localhost:3000/api/admin/addteacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(formattedData)
      });

      if (response.ok) {
        const newTeacher = await response.json();
        setTeachers([...teachers, newTeacher]);
        setShowModal(false);
        setFormData({
          teacher_fname: "",
          teacher_lname: "",
          teacher_email: "",
          allocated_standard: "",
          dob: "",
        });
      } else {
        alert("Failed to add teacher");
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };



  return (
    <>
      <div className="container mx-auto mt-5">
        {/* Flexbox container to align the button to the right */}
        <div className="flex justify-end mb-4">
          <button className="btn btn-primary" onClick={openModal}>
            Add Teacher
          </button>
        </div>
        {/* Table for displaying teacher data */}
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Sr. No.</th>
              <th className="border border-gray-300 px-4 py-2">Teacher ID</th>
              <th className="border border-gray-300 px-4 py-2">Teacher Name</th>
              <th className="border border-gray-300 px-4 py-2">
                Assigned Class
              </th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr key={teacher.teacher_id}>
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {teacher.teacher_id}
                </td>
                <td className="border border-gray-300 px-4 py-2">{`${teacher.teacher_fname} ${teacher.teacher_lname}`}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {teacher.allocated_standard}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="btn btn-info">View More</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for adding teacher */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-5 rounded shadow-lg w-1/2">
              <h2 className="text-xl mb-4">Add Teacher</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="teacher_fname"
                    value={formData.teacher_fname}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="teacher_lname"
                    value={formData.teacher_lname}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    name="teacher_email"
                    value={formData.teacher_email}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label>Allocated Standard</label>
                  <input
                    type="number"
                    name="allocated_standard"
                    value={formData.allocated_standard}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                    min="1"
                    max="10"
                    placeholder="Enter a number between 1 and 10"
                  />
                </div>
                <div className="mb-3">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="btn btn-success mr-2">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Staff;