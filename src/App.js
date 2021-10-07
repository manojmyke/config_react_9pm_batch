import { useEffect, useState } from 'react';
import { getSum } from './helpers';
import StateFunctional from './components/state/state_functional_component';
import StateClass from './components/state/state_class_component';
import UseEffectHook from './components/useEffect';
import Practice from './components/Practice';
import CompA from './components/context/ContextExample';
import Users from './users_crud_task/Users';
import Todos from './todo_task/Todos';

async function fetchData(url, callbackFn) {
  const apiResponse = await fetch(url);
  const response = await apiResponse.json();

  callbackFn(response);
}

function fetchUsers() {
  const usersUrl = 'https://jsonplaceholder.typicode.com/users';
  fetchData(usersUrl, callbackFn);
}

function callbackFn(data) {
  console.log('__callbackFn', data);
}

function ParentNew() {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    console.log('___parent_mount');

    return () => {
      console.log('___parent_un_mount');
    }
  }, []);

  const toggleState = () => setToggle(prevState => !prevState);

  if (toggle)
    return <h2 onClick={toggleState}><OnState /></h2>;
  else
    return <p onClick={toggleState}><OffState /></p>;
}

function OnState() {
  useEffect(() => {
    console.log('___OnState_mount');

    return () => {
      console.log('___OnState_un_mount');
    }
  });

  return <span>OnState</span>
}

function OffState() {
  useEffect(() => {
    console.log('___OffState_mount');

    return () => {
      console.log('___OffState_un_mount');
    }
  });

  return <span>OffState</span>
}

export default function App() {

  return <Todos />

  // return <CompA />

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  // return <Practice />
  // return <UseEffectHook />
  // return <StateClass />
  // return <StateFunctional />
  // return <Parent />
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