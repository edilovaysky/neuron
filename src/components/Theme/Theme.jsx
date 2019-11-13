import './Theme.scss';
import React, { Component } from 'react';

import { Lesson } from 'components/Lesson';

export class Theme extends Component {
  state = {
    displayTheme: false,
    themes: [],
  };
  fetchTheme = () => {
    this.setState({
      displayTheme: !this.state.displayTheme,
      themes: [],
    });

    const { themeIds } = this.props;
    themeIds.map(i => {
      const id = i;
      fetch(`http://localhost:8888/theme/${id}`, {
        headers: {
          'Content-type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Wrong credentials');
          }
          return response.json();
        })
        .then(data => {
          this.setState({
            themes: [...this.state.themes, data],
          });
        });
    });
  };
  render() {
    const { displayTheme, themes } = this.state;

    let theme;
    if (themes.length) {
      themes.sort((a, b) => {
        if (a.theme || b.theme) {
          a.theme.theme > b.theme.theme;
        }
      });

      theme = themes.map(i => {
        if (i.theme) {
          return (
            <li key={i.theme._id} className="theme-list-item">
              {i.theme.theme}
              <Lesson lessonIds={i.theme.lessons} />
            </li>
          );
        }
      });
    }

    return (
      <>
        <p className="inlist" onClick={this.fetchTheme}>
          темы
        </p>
        {displayTheme && <ul className="theme-list">{theme}</ul>}
      </>
    );
  }
}
