import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './EditDoctorPage.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { getHospitalData } from "../../util/authUtil";

const EditDoctorPage = () => {
  const [initialValues, setInitialValues] = useState({
    hospital: '',
    firstName: '',
    lastName: '',
    titles: '',
    email: '',
    specialisation: '',
    profilePic: ''
  });

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required').trim(),
    lastName: Yup.string().required('Last name is required').trim(),
    titles: Yup.string().required('Titles are required'),
    email: Yup.string().email('Invalid email format').required('Email is required').trim(),
    specialisation: Yup.string().required('Specialisation is required').trim(),
    profilePic: Yup.string().url('Invalid URL format')
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const hospitalData = getHospitalData();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/doctors/${id}`)
      .then(response => {
        setInitialValues(response.data);
      })
      .catch(error => {
        console.error('Error fetching doctor data:', error);
      });
  }, [id]);

  const onSubmit = async(values) => {
    console.log('Form data', {...values, hospital: hospitalData._id});
    await axios.put(`http://localhost:5000/api/doctors/${id}`, {...values});
    alert('Doctor updated successfully');
    navigate('/');
  };

  return (
    <div className="edit-doctor-page">
      <h2>Edit Doctor</h2>
      <Formik
        enableReinitialize
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

          <button type="submit">Update Doctor</button>
        </Form>
      </Formik>
    </div>
  );
};

export default EditDoctorPage;
