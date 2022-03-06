import React, {useState, useEffect} from 'react';
// import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import * as yup from 'yup';

const schema = yup.object().shape({
  // validation
  name: yup
    .string()
    .required("Please enter your name")
    .min(2, "That's not a real name."),
  pasword: yup
    .string()
    .required("Please enter a phone number.")
    .matches(/^[0-9]{10}$/, "Please enter a valid phone number."),
});

const defaultFormState = {
  name: "",
  email: "",
  city: "",
  phone: "",
  disability: "",
  other: "",
  bio: "",
  family_number: "",
  host: "false",

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

//   const validate = (e) => {
//     e.persist();
//     yup
//       .reach(schema, e.target.name) // validation
//       .validate(e.target.value)
//       .then((valid) => setErrors({ ...errors, [e.target.username]: "" }))
//       .catch((err) => setErrors({ ...errors, [e.target.username]: err.errors[0] }));
//   };

  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setFormState({
        ...formState,
        disability: {
          ...formState.disability,
          [e.target.value]: e.target.checked,
        },
      });
    } else {
      setFormState({
        ...formState,
        [e.target.name]: e.target.value,
      });
    }
    // if (e.target.username === "username" || e.target.username === "password") {
    //   validate(e);
    // }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
    axios
    //   .post("https://reqres.in/api/users", formState)
      .post("https://iwd-2022-team4.herokuapp.com/api/IWD_Homes/users/", formState)
      .then((res) => props.registration(res.data))
      .catch((err) => console.log(err));
  };


  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>

      
          <label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              data-cy="name"
              value={formState.name}
              placeholder="Full Name"
            />
          </label>

          <label>
            <input
              type="tel"
              name="phone"
              onChange={handleChange}
              data-cy="phone"
              value={formState.phone}
              placeholder="Phone number"
            />
            {errors.phone.length > 0 && (
              <p style={{ color: "red" }}>{errors.phone}</p>
            )}
          </label>
          <Label htmlFor="role">People that are with you</Label>
                <Select>    <select name="family_number" id="family_number" value={formState.family_number}>
                        <option value=""> # </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
</select></Select>

          <label>
          <textarea
            name="location"
            data-cy="location"
            onChange={handleChange}
            value={formState.location}
            placeholder="What city are you located?"
          />
        </label>
        <Label htmlFor="disability">Disabilites

                    <div className='disabilities-list'>
                    <input type="checkbox" id="ADHD" name="ADHD" />
                    <label for="ADHD">Attention Deficit Hyperactivity Disorder (ADHD)</label>
                    </div>
                    <div>
                    <input type="checkbox" id="LS" name="LS" />
                    <label for="LS">Learning Disabilities</label>
                    </div>       
                    <div>
                    <input type="checkbox" id="MD" name="MD" />
                    <label for="MD">Mobility Disabilities</label>
                    </div>
                    <div>
                    <input type="checkbox" id="MedD" name="MedD" />
                    <label for="MedD">Medical Disabilities</label>
                    </div> 
                    <div>
                    <input type="checkbox" id="PsyD" name="PsyD" />
                    <label for="PsyD">Psychiatric Disabilities</label>
                    </div>
                    <div>
                    <input type="checkbox" id="PTSD" name="PTSD" />
                    <label for="PTSD">Traumatic Brain Injury (TBI) and Post-Traumatic Stress Disorder (PTSD)</label>
                    </div> 
                    <div>
                    <input type="checkbox" id="VD" name="VD" />
                    <label for="VD">Visual Impairments</label>
                    </div>
                    <div> 
                    <input type="checkbox" id="DF" name="DF" />
                    <label for="DF">Deaf/Hearing Impairment</label>
                    </div> 
                    <div>
                    <input type="checkbox" id="ASD" name="ASD" />
                    <label for="ASD">Autism Spectrum Disorders</label>
                    </div> 
                    <div>
                    <input type="checkbox" id="O" name="O" />
                    <label for="O">Other</label>
                    </div> 
                    {/* </label> */}
                    </Label>

          <label>
          <textarea
            name="bio"
            data-cy="bio"
            onChange={handleChange}
            value={formState.bio}
            placeholder="Tell me more about yourself."
          />
        </label>

        <input type='checkbox'
                    id='HostUser'
                    name='HostHoster'
                    checked={formState.Host}
                    onChange={handleChange}
                    />     
        <button data-cy="submit-button" disabled={isDisabled} onClick={Link} type="submit">Submit Registration</button>
      </form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  margin: 5rem auto;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #fff;
  background-color: #323956;
  @media (max-width: 767px) {
    text-align: center;
  }
  #header {
    text-align: center;
    background: white;
    background-position: center;
    height: 20vh;
    width: 700px;
    @media (max-width: 767px) {
        text-align: center;
        height: 2%;
      }
  }
  label {
    width: 60%;
    margin: 2% 4%;
  }
  fieldset {
    display: flex;
    flex-direction: column;
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
  }`; 
const Label = styled.div`
text-align: left;
margin-left: 20%;
    @media (max-width: 767px) {
        padding: 5%, 2%;
  };`

const Select = styled.div`
    font-size: .05rem;
    width: 15%;
    margin-left: 20%;
  }`;
export default RegistrationForm;
