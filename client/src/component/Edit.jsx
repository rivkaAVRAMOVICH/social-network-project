import React, { useState, useContext } from 'react';
import { FaEdit } from 'react-icons/fa';
import { putRequest,patchRequest } from '../Requests'
import { Error } from './App';
function Edit(props) {
    const { setErrorMessage } = useContext(Error);
    const {
        type,
        id,
        body,
        setEditingId,
        editingId,
        arrayOfData,
        setArrayOfData,
        fields
    } = props;
    const [updateItem, setUpdateItem] = useState({
        ...body,
        ...fields.reduce((result, field) => ({ ...result, [field]: body?.[field] || '' }), {})
    });
   const handleSave = async () => {
  let missingFields = false;

  for (const field of fields) {
    if (!updateItem[field]?.trim()) {
      missingFields = true;
      break;
    }
  }
  const method = missingFields ? 'PATCH' : 'PUT';

  const requestFunction = method === 'PATCH' ? patchRequest : putRequest;

  const requestResult = await requestFunction(`${type}s/${id}`, updateItem);

  if (requestResult.succeeded) {
    setArrayOfData(arrayOfData.map((detailsItem) =>
      detailsItem.id === id ? { ...detailsItem, ...updateItem } : detailsItem
    ));
    setEditingId(null);
  } else {
    setErrorMessage(requestResult.error);
  }
};
    return (
        <>
            {editingId === id ? (
                <div className={`edit-container-${type}`}>
                    {fields.map((field) => (
                        <div key={field} className="input-container">
                            <input
                                className="edit-input"
                                type='text'
                                name={field}
                                value={updateItem[field] || ''}
                                onChange={(e) =>
                                    setUpdateItem((prevState) => ({
                                        ...prevState,
                                        [field]: e.target.value,
                                    }))
                                }
                            />
                        </div>
                    ))}
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditingId(null)}>Cancel</button>
                </div>
            ) : (
                <div className="view-container">
                    <button onClick={() => setEditingId(id)}>
                        <FaEdit size={20} color="#000" />
                    </button>
                </div>
            )}
        </>
    );
}

export default Edit;
