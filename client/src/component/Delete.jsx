import React, { useContext } from 'react';
import { deleteRequest } from '../Requests';
import { FaTrash } from 'react-icons/fa';
import { Error } from './App';
import '../css/Post.css';

function Delete(props) {
  const { id, type, arrayOfData, setArrayOfData } = props;
  const { setErrorMessage } = useContext(Error);

  const deleteItem = async () => {
    const requestResult = await deleteRequest(`${type}s/${id}`);
    if (requestResult.succeeded) {
      setArrayOfData(arrayOfData.filter((item) => item.id !== id));
    } else {
      setErrorMessage(requestResult.error);
    }
  };

  return (
    <button
      onClick={(e) => {
        deleteItem();
        e.stopPropagation();
      }}
    >
      <FaTrash size={20} color="#000" />
    </button>
  );
}

export default Delete;
