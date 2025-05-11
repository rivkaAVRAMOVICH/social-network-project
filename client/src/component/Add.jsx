import { Error } from './App';
import React, { useState, useContext } from 'react';
import { postRequest } from '../Requests';
import '../css/Add.css';
function Add(props) {
    const { permanentInformation, type, arrayOfData, setArrayOfData, arrayOfInputType } = props;
    const { setErrorMessage } = useContext(Error);
    const [newItem, setNewItem] = useState({
        ...permanentInformation,
        ...arrayOfInputType.reduce((result, field) => ({ ...result, [field]: permanentInformation?.[field] || '' }), {})
    });

    const handleAddItem = async () => {
        for (const field of arrayOfInputType) {
            if (!newItem[field].trim()) {
                setErrorMessage(`The field "${field}" cannot be empty.`);
                return;
            }
        }
        console.log(newItem);
        const requestResult = await postRequest(`${type}s`, newItem);
        if (requestResult.succeeded) {
            setArrayOfData([...arrayOfData, requestResult.data]);
            setNewItem({
                ...permanentInformation,
                ...arrayOfInputType.reduce((result, field) => ({ ...result, [field]: '' }), {}) 
            });
        } else {
            setErrorMessage(requestResult.error);
        }
    };

    return (
        <div className="comment-form">
            {arrayOfInputType.map((field) => (
                <div key={field} className="form-field">
                    <input className={`input-field-${type}`}
                        required
                        type="text"
                        name={field}
                        placeholder={`Enter ${field}`}
                        value={newItem[field]}
                        onChange={(e) =>
                            setNewItem((prevState) => ({
                                ...prevState,
                                [field]: e.target.value,
                            }))}
                    />
                </div>
            ))}
            <button onClick={handleAddItem} className='add-btn'>Add {type}</button>
        </div>
    );
}

export default Add;
