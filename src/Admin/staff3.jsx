import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/navbar";

const Staff = () => {
  const [showModal, setShowModal] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null); // For storing selected teacher details
  const [formData, setFormData] = useState({
    teacher_fname: "",
    teacher_lname: "",
    teacher_email: "",
    allocated_standard: "",
    school_id:1,
    dob: "",
  });

  // Open Modal
  const openModal = () => {
    setShowModal(true);
  };

  // Close Modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedTeacher(null); // Clear selected teacher when modal closes
  };

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fetch teacher data from backend
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/admin/allteacher"); 
        if (response.status === 200) {
          setTeachers(response.data);
        } else {
          console.error("Failed to fetch teacher data.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchTeachers();
  }, []);

  // Convert the date to DD/MM/YYYY format
  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  // Submit form data to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert date to DD/MM/YYYY format before sending it
    const formattedData = {
      ...formData,
      dob: formatDate(formData.dob),
    };

    try {
      const response = await axios.post("http://localhost:3000/api/admin/addteacher", formattedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        setTeachers([...teachers, response.data]);
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

  // Handle "View More" button to display more info about a teacher
  const handleViewMore = (teacher) => {
    setSelectedTeacher(teacher);
    openModal();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-5">
        {/* Rest of the component */}
      </div>
    </>
  );
};

export default Staff;
