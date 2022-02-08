import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PlaylistItem.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlaylistItem = (props) => {
	let navigate = useNavigate();

	const playListHandler = () => {
		if (props.create) {
			props.setDeleteListHandler({ delete: false, id: '' });
			props.setModalHandler(true);
			return;
		}
		navigate(`/myplaylists/${props.playlist._id}`);
	};

	const deletePlaylist = async () => {
		props.setDeleteListHandler({ delete: true, id: props.playlist._id });
		props.setModalHandler(true);
	};

	return (
		<div className={styles.container}>
			<figure className={styles.figure} onClick={playListHandler}>
				{props.create ? (
					<div className={styles.plus}>
						<i className='far fa-plus'></i>
					</div>
				) : props.playlist.songs.length > 0 ? (
					<img
						className={styles.img}
						src={
							props.playlist.songs?.length < 1
								? ''
								: props.playlist.songs[0].thumbnails.url
								? props.playlist.songs[0].thumbnails.url
								: props.playlist.songs[0].thumbnails[0].url
						}
						alt='photo'
					/>
				) : (
					<div className={styles.phone}>
						<i className='fas fa-headphones-alt'></i>
					</div>
				)}
			</figure>
			<div className={styles.name} onClick={playListHandler}>
				<p>
					{!props.create ? props.playlist.playlist_name : 'Create new playlist'}
				</p>
			</div>
			{!props.create && (
				<div className={styles.options} onClick={deletePlaylist}>
					<i className='fas fa-trash-alt'></i>
				</div>
			)}
		</div>
	);
};

export default PlaylistItem;
