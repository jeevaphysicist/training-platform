import React, { useState } from 'react';
import CourseList from '../components/Course/CourseList';
import CourseForm from '../components/Course/CourseForm';

const App = () => {
  const [courses, setCourses] = useState([]);
  const [editCourse, setEditCourse] = useState(null);

  const addCourse = (course) => {
    console.log("course",course);
    setCourses([...courses, course]);
  };

  const updateCourse = (updatedCourse) => {
    setCourses(courses.map((course) => 
      course._id === updatedCourse._id ? updatedCourse : course
    ));
    setEditCourse(null);
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter(course => course._id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4 font-bold">Course Management</h1>
      <CourseForm
        addCourse={addCourse}
        updateCourse={updateCourse}
        editCourse={editCourse}
      />
      <CourseList
        getcourses={courses}
        deleteCourse={deleteCourse}
        setEditCourse={setEditCourse}
      />
    </div>
  );
};

export default App;
