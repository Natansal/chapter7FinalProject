import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../App';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function Albums() {
    const { user } = useContext(AppContext);
    const [albums, setAlbums] = useState([]);
    const [thumbNailPhotos, setThumbNailPhotos] = useState([]);
    const [count, setCount] = useState(0);
    const [photoNum, setPhotoNum] = useState(0);
    const [clicks, setClicks] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${user.id}`);
            const json = await response.json();
            setAlbums(json);
        }
        fetchData()
            .catch((err) => console.log(err));
    }, [])

    const handlePhotos = (index) => {
        const fetchData = async () => {
            let albumId = (user.id * 10 - 9 + index);
            const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
            const json = await response.json();
            setCount(index);
            handelThumbNailPhoto(json[0].thumbnailUrl)
            if (user.id === 1) {
                setPhotoNum(((user.id * (index) * 50) + 1))
            } else {
                setPhotoNum((50 * (((user.id * 10) - 9) + (index - 1)) + 1))
            }
        }
        fetchData()
            .catch((err) => console.log(err));
    }

    const handelThumbNailPhoto = (thumbnailUrl) => {
        setThumbNailPhotos([thumbnailUrl])
    }

    async function nextPhoto() {
        setPhotoNum(photoNum + 1);
        setClicks(clicks + 1);
        if (clicks < 50) {
            if (user.id !== 1) {
                console.log(photoNum);
                const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${((user.id * 10) - 9) + (count)}&&id=${photoNum}`)
                const json = await response.json();
                handelThumbNailPhoto(json[0].thumbnailUrl)
            } else {
                const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${(user.id * (count + 1))}&&id=${photoNum}`)
                const json = await response.json();
                handelThumbNailPhoto(json[0].thumbnailUrl)
            }
        } else {
            alert('Switch album please');
            setClicks(0);
            if(user.id !== 1){
                setPhotoNum((50 * (((user.id * 10) - 9) + (count - 1)) + 1))
            } else {
                setPhotoNum(((user.id * (count) * 50) + 1))
            }
        }

    }

    return (
        <div>
            {albums.map((album, index) => <li key={album.id}><Link onClick={() => handlePhotos(index)}>{album.title}</Link></li>)}
            <br />
            {thumbNailPhotos.length > 1 ? <button onClick={() => setThumbNailPhotos([])}>Hide photos</button> : null}
            <br />
            {thumbNailPhotos.length > 0 ? thumbNailPhotos.map((thumb, index) => <img key={index} alt='' src={thumb} />) : null}
            <button onClick={() => nextPhoto()}>Next photos</button>
        </div>
    )

}