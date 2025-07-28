import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PreviewListingCard.module.css';
import ListingMainInfo from '../../pages/listing/components/ListingMainInfo/ListingMainInfo';
import ListingFeatures from '../../pages/listing/components/ListingFeatures/ListingFeatures';
import { formatSquareFootage, formatLocationDetails } from '../../utils/listingUtils';
import ImageCarousel from '../../components/ListingCard/ImageCarousel';

/*
 * PreviewListingCard – shows the draft data exactly like MyListings card
 * and lets the user click parts of the card to jump back to the wizard
 * step that edits that section. Each click passes { backToPreview:true } in
 * the location state so that step can show a "Return to review" button.
 */
const PreviewListingCard = ({ draft }) => {
  const navigate = useNavigate();

  const jump = (path) => navigate(path, { state: { backToPreview: true } });

  const squareFootage   = formatSquareFootage(draft.totalArea, draft.areaUnit);
  const locationDetails = formatLocationDetails({ address: draft.address });

  const imageUrls = draft.images.length
    ? draft.images.map((img) => (img instanceof File ? URL.createObjectURL(img) : img))
    : ['/images/house1.jpg'];

  return (
    <div className={styles.listingCard}>
      <div onClick={() => jump('/listing-flow/step-2/1_photos')}>
        <ImageCarousel images={imageUrls} />
      </div>

      <div className={styles.cardContent}>
        <div onClick={() => jump('/listing-flow/step-2/title')}>
          <ListingMainInfo
            price={draft.price}
            title={draft.title}
            locationDetails={locationDetails}
          />
        </div>
        <div onClick={() => jump('/listing-flow/step-1/2_basicinfo')}>
          <ListingFeatures
            squareFootage={squareFootage}
            bedrooms={draft.bedrooms}
            bathrooms={draft.bathrooms}
          />
        </div>
        <p className={styles.propertyDescription} onClick={() => jump('/listing-flow/step-2/description')}>
          {draft.description}
        </p>
      </div>
    </div>
  );
};

export default PreviewListingCard; 