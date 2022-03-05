import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import * as yup from "yup";
// import styled from "styled-components";
// import axios from "axios";

const schema = yup.object().shape({
  // validation
  username: yup
    .string()
    .required("Please enter your name")
    .min(3, "That's not a real name."),
  pasword: yup
    .string()
    .required("Please enter a phone number.")
    .min(6, "Password needs to be longer than 6 characters.")
    .matches(/^[0-9]{10}$/, "Please enter a valid phone number."),
  terms: Yup
    .boolean()
    .oneOf([true], "You must accept Terms and Conditions")

});

const defaultFormState = {
  title: "",
  source: "",
  ingredients: "",
  instructions: "",
  category: "dinner",

};

const defaultErrorState = {
  name: "",
  phone: "",
};

const RegistrationForm = (props) => {
  const [formState, setFormState] = useState(defaultFormState);
  const [errors, setErrors] = useState(defaultErrorState);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    schema.isValid(formState).then((valid) => setIsDisabled(!valid)); // validation
  }, [formState, schema]);

  const validate = (e) => {
    e.persist();
    yup
      .reach(schema, e.target.name) // validation
      .validate(e.target.value)
      .then((valid) => setErrors({ ...errors, [e.target.username]: "" }))
      .catch((err) => setErrors({ ...errors, [e.target.username]: err.errors[0] }));
  };

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setFormState({
        ...formState,
        condiments: {
          ...formState.condiments,
          [e.target.value]: e.target.checked,
        },
      });
    } else {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
      });
    }
    if (e.target.username === "username" || e.target.username === "password") {
      validate(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
    axios
      .post("https://reqres.in/api/users", formState)
      .then((res) => props.addOrder(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <div id="header">
          <h2>Create A Registration!</h2>
        </div>
      
          <label>
            Username
            <input
              type="text"
              name="username"
              onChange={handleChange}
              data-cy="username"
              value={formState.username}
            />
            {errors.username.length > 0 && (
              <p style={{ color: "red" }}>{errors.username}</p>
            )}
          </label>

          <label>
            Password
            <input
              type="tel"
              name="password"
              onChange={handleChange}
              data-cy="password"
              value={formState.password}
            />
            {errors.password.length > 0 && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}
          </label>

          <label>
          <textarea
            name="instructions"
            data-cy="instructions"
            onChange={handleChange}
            value={formState.instructions}
            placeholder="Anything else you'd like to add?"
          />
        </label>

          <label>
          <textarea
            name="ingredients"
            data-cy="ingredients"
            onChange={handleChange}
            value={formState.instructions}
            placeholder="Anything else you'd like to add?"
          />
        </label>
 
        <label>
          <textarea
            name="instructions"
            data-cy="instructions"
            onChange={handleChange}
            value={formState.instructions}
            placeholder="Anything else you'd like to add?"
          />
        </label>
        <label>
            Select Category
            <select
              name="category"
              data-cy="category"
              defaultValue="Dinner"
              onChange={handleChange}
            >
              <option value="Dinner">Dinner</option>
              <option value="Lunch">Lunch</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Dessert">Dessert</option>
            </select>
          </label>
        <button data-cy="submit-button" onClick={Link} type="submit">
          Submit Order
        </button>
      </form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  margin: 5rem auto;
  width: 900px;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #fff;
  #header {
    text-align: center;
    background: url(https://www.kingarthurbaking.com/sites/default/files/styles/featured_image/public/Registration_legacy/20-3-large.jpg?itok=1EY8KWJG);
    background-position: center;
    height: 20vh;
    width: 700px;
  }
  label {
    width: 60%;
    margin: 2% 4%;
  }
  fieldset {
    display: flex;
    flex-direction: column;
  }
  //   .toppings {
  //     display: flex;
  //     flex-direction: column
  //     color: purple;
  //   }
  #Order-Information {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 8% 0%;
    height: 20vh;
  }
  textarea {
    width: 80%;
    margin: 2%;
  }
  button {
    display: flex;
    margin: 0 auto;
    padding: 1%;
    color: black;
  }
  select {
    height: 40px;
    width: 90%;
  }
`; 

export default RegistrationForm;
