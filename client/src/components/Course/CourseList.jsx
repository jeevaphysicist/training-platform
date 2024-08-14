import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { handleDeleteCourse, handleGetCourse } from '../../API/api';

const CourseList = ({ getcourses ,deleteCourse, setEditCourse }) => {
  const [courses, setCourses] = useState([]);
 

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await handleGetCourse();
        setCourses(response.data);
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
      }
    };

    fetchCourses();
  }, [getcourses]);

  const handleDelete = async (id) => {
    try {
      const response = await handleDeleteCourse(id)
      setCourses(courses.filter(course => course._id !== id));
      deleteCourse(response.data);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  

  return (
    <div>
      <h2 className="text-xl mb-4 font-bold">Course List</h2>
      {
        courses.length > 0 ?
      
      <ul>
        {courses?.map((course) => (
          <li key={course._id} className="mb-2 border shadow-md p-5 rounded-lg flex justify-between items-center">
            <span>{course.name}</span>
            <div>
              <button
                onClick={() => setEditCourse(course)}
                className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(course._id)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      :
      <div className='text-red-500 font-bold'>No Data</div>
}
    </div>
  );
};

export default CourseList;
