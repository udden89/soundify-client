import React from 'react';
import styles from './HeroImg.module.css';
import { toast } from 'react-toastify';

function copyToClipboard(url) {
	toast.info('Copied to clipboard!');
	return url;
}

const HeroImg = ({ imgUrl, size, caption, url }) => {
	return (
		<figure className={styles.figure}>
			<img
				className={styles.img}
				src={imgUrl}
				alt='Hero-img'
				style={{ height: size === 'big' ? '25rem' : '' }}
			/>
			<figcaption className={styles.caption}>{caption}</figcaption>

			{/* Kolla om man kan ta router/home för att göra denna kontrollen dynamisk*/}

			{window.location.href !== 'http://localhost:3000/' && (
				<figcaption className={styles.iconCaption}>
					<i
						className={`fa fa-clone ${styles.symbol}`}
						aria-hidden='true'
						onClick={() =>
							navigator.clipboard.writeText(copyToClipboard(url))
						}></i>
				</figcaption>
			)}
		</figure>
	);
};

export default HeroImg;
