import './GetDoc.scss';

import React, { Component } from 'react';
import { SquareCheckBox } from 'components/SquareCheckBox';
import { Btn } from 'components/Btn';

export class GetDoc extends Component {
  state = {
    display: false,
    url: '',
    isChecked: false,
  };

  handleGetDoc = () => {
    const id = this.props._id;
    fetch(`http://localhost:8888/udoc/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        console.log(response);
        if (!response.ok) {
          throw new Error('Wrong credentials');
        }
        return response.json(response);
      })
      .then(data => {
        console.log(data);
        const bufferArr = data.data.Body.data;
        // Obtain a blob: URL for the image data.
        const arrayBufferView = new Uint8Array(bufferArr);
        const blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(blob);
        this.setState({ url: imageUrl });
      });
  };

  handleDelete = () => {
    const { isChecked } = this.state;
    const id = this.props._id;
    if (isChecked) {
      fetch(`http://localhost:8888/udoc/del/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Wrong credentials');
          }
          return response.json(response);
        })
        .then(data => {
          if (data) {
            alert('Документ успешно удален.');
          }
        });
    } else {
      alert('Чтобы удалить документ, необходимо подтвердить его удаление.');
    }
  };

  handleCheckDel = () => {
    this.setState({ isChecked: !this.state.isChecked });
  };

  render() {
    //console.log(this.props);
    const { url } = this.state;
    let doc;
    if (url) {
      doc = (
        <>
          <img src={url} alt="user-doc" />

          <div className="udoc-checkbox">
            <SquareCheckBox
              onCheck={this.handleCheckDel}
              checkBoxId={this.props._id}
              labelMsg={''}
            />
            <Btn onBtnClick={this.handleDelete} btnName={'удалить документ'} />
          </div>
        </>
      );
    }
    return (
      <>
        <li className="udoc-li" onClick={this.handleGetDoc}>
          {this.props.docName}
        </li>
        {doc}
      </>
    );
  }
}
