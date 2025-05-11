import React, { useState, useEffect, useContext } from 'react';
import { Link, Outlet } from "react-router-dom"
import { CurrentUser, Error } from './App';
import { getRequest } from '../Requests'
import '../css/Albums.css'
import Delete from "./Delete";
import Add from "./Add";
import Edit from "./Edit";
import Search from "./Search";
function Albums() {
    const { currentUser } = useContext(CurrentUser);
    const { setErrorMessage } = useContext(Error);
    const [editingAlbumId, setEditingAlbumId] = useState(null);
    const [filteredAlbums, setFilteredAlbums] = useState([]);
    const [albums, setAlbums] = useState([]);
    const getAlbums = async () => {
        const requestResult = await getRequest(`albums?userId=${currentUser.id}`)
        if (requestResult.succeeded) {
            setAlbums(requestResult.data);
            setFilteredAlbums(requestResult.data);
        } else {
            setErrorMessage(requestResult.error)
        }
    }
    useEffect(() => {
        if (currentUser?.id) {
            getAlbums();
        }
    }, [currentUser]);
    useEffect(() => {
        setFilteredAlbums(albums);
    }, [albums]);
    return (
        <div className="page-container">
            <div className="albums-container">
                <Search
                    allSearchCriteria={['id', 'title']}
                    origin={albums}
                    setFilter={setFilteredAlbums}
                />
                <Add
                    permanentInformation={{ userId: currentUser?.id }}
                    arrayOfData={albums}
                    setArrayOfData={setAlbums}
                    type={'album'} arrayOfInputType={['title']}
                    setErrorMessage={setErrorMessage}
                />
                {JSON.stringify(albums) === '[]' ? <p className='no-items'> No albums found. Start by adding a new album to get started! </p> : <ul className="albums-list">
                    {filteredAlbums.map((album) => (
                        <li key={album.id} className="album-item">
                            <span className="album-id">#{album.id}</span>
                            {editingAlbumId !== album.id &&
                                (<>
                                    <Link to={`/users/${currentUser.id}/albums/${album.id}/photos`} className="album-title">{album.title}</Link>
                                    <Delete
                                        id={album.id}
                                        arrayOfData={albums}
                                        setArrayOfData={setAlbums}
                                        types={['album', 'photo']}
                                    />
                                </>)}
                            <Edit
                                type={'album'}
                                id={album.id}
                                body={{
                                    userId: currentUser?.id,
                                    id: editingAlbumId,
                                    title: album.title,
                                }}
                                editingId={editingAlbumId}
                                setEditingId={setEditingAlbumId}
                                arrayOfData={albums}
                                setArrayOfData={setAlbums}
                                fields={['title']}
                            />
                        </li>
                    ))}
                </ul>}
                <Outlet />
            </div>
        </div>
    );
}
export default Albums;
