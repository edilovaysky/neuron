import './GalleryItem.scss';

import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Likes } from '../Likes';
import { Comments } from '../Comments';
import { PicIcon } from '../PicIcon';
import { Modal } from '../Modal/Modal';
//import { VideoIcon } from '../VideoIcon';

export class GalleryItem extends Component {
  state = { imgId: '', isModalVisible: true };

  render() {
    const { image, likes, comments, id } = this.props;

    return (
      <Link to={`/posts/${id}`}>
        <div className="gallery-item" tabIndex="0">
          <img src={image} className="gallery-image" alt="user picture" />
          <div className="gallery-item-info">
            <ul>
              <Likes likes={likes} />
              <Comments comments={comments} />
              {image.length > 1 && <PicIcon />}
              {/*   {video && <VideoIcon />} */}
            </ul>
          </div>
        </div>
      </Link>
    );
  }
}
GalleryItem.propTypes = {
  image: PropTypes.string,
  likes: PropTypes.number,
  comments: PropTypes.number,
};
