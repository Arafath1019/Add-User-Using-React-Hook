import React, {useState} from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';

import classes from './AddUser.module.css';


function AddUser(props) {

    const [enteredUserName, setEnteredUserName] = useState('');
    const [eneteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState();


    const errorHandler = () => {
        setError(null);
    };

    const addUserHandler = (event) => {
        event.preventDefault();

        if (enteredUserName.trim().length === 0 || eneteredAge.trim().length === 0) {
            setError({
                title: 'Invalid Input',
                message: 'Please enter a valid name and age (non-epmty values)',
            });

            return;
        }

        if (+eneteredAge < 1) {
            setError({
                title: "Invalid Age",
                message: 'Please enter a valid age (> 0)',
            });

            return;
        }

        props.onAddUser(enteredUserName, eneteredAge);
        setEnteredUserName("");
        setEnteredAge("");
    };

    const userNameChangeHandler = (event) => {
        setEnteredUserName(event.target.value);
    };

    const ageChangeHandler = (event) => {
        setEnteredAge(event.target.value);
    };

    return (
        <div>
            <div>
                {error && (
                    <ErrorModal
                        title={error.title}
                        message={error.message}
                        onConfirm={errorHandler}
                    />
                )}

                <Card className={classes.input}>
                    <form onSubmit={addUserHandler}>
                        <label htmlFor="username">User Name</label>
                        <input
                            id="username"
                            type="text"
                            value={enteredUserName}
                            onChange={userNameChangeHandler}
                        />

                        <label htmlFor="age">Age (Years)</label>
                        <input
                            id="age"
                            type="number"
                            value={eneteredAge}
                            onChange={ageChangeHandler}
                        />
                        <Button type="submit">Add User</Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default AddUser;
