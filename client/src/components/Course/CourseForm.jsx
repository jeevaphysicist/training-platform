import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { handleCreateCourse, handleUpdateCourse } from '../../API/api';
import { toast } from 'react-toastify';

const CourseForm = ({ addCourse, updateCourse, editCourse }) => {
  const [course, setCourse] = useState({ name: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // console.log("edit course",editCourse);
    if (editCourse) {
      setCourse(editCourse);
    } else {
      setCourse({ name: '' });
    }
  }, [editCourse]);

  const validate = () => {
    const newErrors = {};
    if (!course.name) newErrors.name = 'Course name is required';
    return newErrors;
  };

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (editCourse) {
        // Update existing course        
        const response = await handleUpdateCourse(editCourse._id,course);
        updateCourse(response.data);
        toast.success('Course Updated Succesfully');

        
      } else {
        // Add new course
        const response = await handleCreateCourse(course);
        addCourse(response.data);
        toast.success('Course Created Succesfully');
      }
      setCourse({ name: '' });
      setErrors({});
    } catch (error) {
      toast.error('Something went wrong!');
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="mb-4 border p-5 rounded-lg shadow-md">
      <h2 className="text-xl mb-4">{editCourse ? 'Edit Course' : 'Add Course'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor='name' className="block mb-1">Course Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={course.name}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {editCourse ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default CourseForm;
