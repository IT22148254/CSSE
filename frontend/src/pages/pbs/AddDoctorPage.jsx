import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './AddDoctorPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getHospitalData } from "../../util/authUtil";


const AddDoctorPage = () => {
  const initialValues = {
    hospital: '',
    firstName: '',
    lastName: '',
    titles: '',
    email: '',
    specialisation: '',
    profilePic: ''
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required').trim(),
    lastName: Yup.string().required('Last name is required').trim(),
    titles: Yup.string().required('Titles are required'),
    email: Yup.string().email('Invalid email format').required('Email is required').trim(),
    specialisation: Yup.string().required('Specialisation is required').trim(),
    profilePic: Yup.string().url('Invalid URL format')
  });

  const navigate = useNavigate();
  const hospitalData = getHospitalData();

  const onSubmit = async(values) => {
    console.log('Form data', {...values,hospital:hospitalData._id});
    await axios.post('http://localhost:5000/api/doctors', {...values,hospital:hospitalData._id});
    alert('Doctor added successfully');
    navigate('/');
  };

  return (
    <div className="add-doctor-page">
      <h2>Add Doctor</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="form">

          <div className="form-control">
            <label htmlFor="firstName">First Name</label>
            <Field type="text" id="firstName" name="firstName" />
            <ErrorMessage name="firstName" component="div" className="error" />
          </div>

          <div className="form-control">
            <label htmlFor="lastName">Last Name</label>
            <Field type="text" id="lastName" name="lastName" />
            <ErrorMessage name="lastName" component="div" className="error" />
          </div>

          <div className="form-control">
            <label htmlFor="titles">Titles</label>
            <Field type="text" id="titles" name="titles" />
            <ErrorMessage name="titles" component="div" className="error" />
          </div>

          <div className="form-control">
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="form-control">
            <label htmlFor="specialisation">Specialisation</label>
            <Field type="text" id="specialisation" name="specialisation" />
            <ErrorMessage name="specialisation" component="div" className="error" />
          </div>

          <div className="form-control">
            <label htmlFor="profilePic">Profile Picture URL</label>
            <Field type="text" id="profilePic" name="profilePic" />
            <ErrorMessage name="profilePic" component="div" className="error" />
          </div>

          <button type="submit">Add Doctor</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddDoctorPage;
