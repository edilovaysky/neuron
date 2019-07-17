import React, { Component, Fragment } from 'react';

import { Modal } from 'components/Modal';
import { Loading } from 'components/Loading';
import { Likes } from 'components/Likes';
import { Comments } from 'components/Comments';

export class PostContainer extends Component {
  state = {
    photo: {},
    loading: false,
    likes: '',
    comments: '',
  };

  componentDidMount() {
    this.setState({ loading: true });
    fetch(`http://localhost:8888/api/photos/${this.props.match.params.id}`, {
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => response.json())
      .then(photo => {
        this.setState({
          loading: false,
          photo,
          likes: photo.likes.length,
          comments: photo.comments.length,
        });
      });
  }

  handleClose = () => {
    const { history } = this.props;
    history.replace('/posts');
  };

  render() {
    const { photo, loading, likes, comments } = this.state;
    return (
      <Fragment>
        <Modal onClose={this.handleClose}>
          {loading && <Loading />}
          {!loading && <img src={photo.image} className="gallery-image" />}
          Photo ID#: {photo._id},<br />
          Likes: {likes}, <br />
          Comments: {comments}.
        </Modal>
      </Fragment>
    );
  }
}
