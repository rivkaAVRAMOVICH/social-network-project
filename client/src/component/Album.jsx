import { useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from 'react';
import { getRequest} from '../Requests'
import Delete from "./Delete";
import Add from "./Add";
import Edit from "./Edit";
import { CurrentUser ,Error} from './App';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../css/Album.css'
function Album() {
    const { albumId } = useParams();
    const { currentUser } = useContext(CurrentUser);
    const { setErrorMessage } = useContext(Error);
    const [photos, setPhotos] = useState([]);
    const [editPhotosId, setEditPhotosId] = useState(null)
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const limit = 10;
    const getPhotos = async () => {
        setIsLoading(true);
        const start = (page - 1) * limit;
        const requestResult = await getRequest(`photos?albumId=${albumId}&_start=${start}&_limit=${limit}`)
        if (requestResult.succeeded) {
            setPhotos((prevPhotos) => [...prevPhotos, ...requestResult.data]);
            if (requestResult.data.length < limit) {
                setHasMore(false);
            }
        } else {
            setErrorMessage(requestResult.error)
        }
        setPage((prevPage) => prevPage + 1);
        setIsLoading(false);
    }
    useEffect(() => {
        getPhotos();
    }, [albumId]);
    useEffect(() => {
        AOS.init({
            duration: 1000,
            offset: 50,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);
    return (
        <div className='page-container'>
            <Add
                permanentInformation={{ albumId: albumId }}
                arrayOfData={photos}
                setArrayOfData={setPhotos}
                type={'photo'}
                arrayOfInputType={['title', 'thumbnailUrl']}
            />
            {JSON.stringify(photos)==='[]'?<p className='no-items'> No photos found. Start by adding a new photo to get started! </p>:<ul className="photos-list">
                {photos.map((photo) => (
                    <li key={photo.id}>
                        {editPhotosId !== photo.id &&
                            (<><img
                                src={photo.thumbnailUrl}
                                alt={photo.title}
                            />
                            <div>
                                <div className="action-buttons">
                                <Delete
                                    id={photo.id}
                                    arrayOfData={photos}
                                    setArrayOfData={setPhotos}
                                    types={['photo']}
                                />
                                </div>
                                </div>
                            </>)}
                        <div className="edit-container">
                            <Edit
                                type={'photo'}
                                id={photo.id}
                                body={{
                                    albumId: currentUser?.id,
                                    id: editPhotosId,
                                    title: photo.title,
                                    thumbnailUrl: photo.thumbnailUrl
                                }}
                                editingId={editPhotosId}
                                setEditingId={setEditPhotosId}
                                arrayOfData={photos}
                                setArrayOfData={setPhotos}
                                fields={['title', 'thumbnailUrl']}
                            />
                        </div>
                    </li>
                ))}
            </ul>}
            {hasMore && !isLoading && (
                <button className='see-more-photos' onClick={getPhotos}>more</button>
            )}
        </div>
    )

}
export default Album






