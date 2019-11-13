import './GetLesson.scss';

import React, { Component } from 'react';

import { Loading } from 'components/Loading';

export class GetLesson extends Component {
  state = {
    display: false,
  };

  handleGetLesson = () => {};

  render() {
    const { url } = this.props;

    let video;
    if (!url) {
      video = (
        <div className="loading-wraper">
          <p>
            Идет загрузка урока, как только он загрузится - появится
            изображение....
          </p>
          <Loading />
        </div>
      );
    }
    if (url) {
      video = (
        <div className="video-view">
          <video controls autoPlay poster="true" width="100%" height="300">
            <source src={url} type="video/mp4" />
          </video>
        </div>
      );
    }

    return <>{video}</>;
  }
}
