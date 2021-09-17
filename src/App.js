import { useState } from 'react';

export default function App() {
  return <Parent />
}

function Parent() {
  const [childData, setChildData] = useState();
  const getDataFromChild = (childData) => setChildData(childData);

  return (
    <>
      {childData && <div>
        <h3>Child Data</h3>
        <p>{childData.name}</p>
        <p>{childData.email}</p>
      </div>}

      <Child getDataFromChild={getDataFromChild} />
    </>
  )
}

function Child(props) {
  const [formValues, setFormValues] = useState({
    name: '', email: ''
  });

  const handleInputChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    });
  }

  const handleFormSubmit = event => {
    event.preventDefault();
    props.getDataFromChild(formValues);
  }

  return (
    <>
      <h3>Child Form</h3>
      <form onSubmit={handleFormSubmit}>
        <input name="name" type="text" placeholder="Enter your name" value={formValues.name} onChange={handleInputChange} />
        <input name="email" type="email" placeholder="Enter your email" value={formValues.email} onChange={handleInputChange} />

        <button type="submit">Submit</button>
      </form>
    </>
  )
}