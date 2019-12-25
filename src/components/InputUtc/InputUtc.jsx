import './InputUtc.scss';
import React, { Component } from 'react';

export class InputUtc extends Component {
  handleTextChange = ({ target: { name, value } }) => {
    const { onChoose } = this.props;
    onChoose(name, value);
  };
  render() {
    return (
      <>
        <span>выбирете часовой пояс:</span>
        <select name="utc" onChange={this.handleTextChange}>
          <option defaultValue>часовой пояс по Гринвичу</option>
          <option value="-12">UTC(GTM) -12 </option>
          <option value="-11">UTC(GTM) -11 </option>
          <option value="-10">UTC(GTM) -10 </option>
          <option value="-9">UTC(GTM) -9 (Анкоридж США)</option>
          <option value="-8">UTC(GTM) -8 (Лос-Анжелес)</option>
          <option value="-7">UTC(GTM) -7 (Денвер США)</option>
          <option value="-6">UTC(GTM) -6 (Далас США)</option>
          <option value="-5">UTC(GTM) -5 (Торонто)</option>
          <option value="-4">UTC(GTM) -4 (Боливия)</option>
          <option value="-3">UTC(GTM) -3 (Бразилия)</option>
          <option value="-2">UTC(GTM) -2 </option>
          <option value="-1">UTC(GTM) -1 (Азорские острова)</option>
          <option value="0">UTC(GTM) 0 (Гринвич) </option>
          <option value="1">UTC(GTM) +1 (Германия)</option>
          <option value="2">UTC(GTM) +2 (Киев) </option>
          <option value="3">UTC(GTM) +3 (Москва) </option>
          <option value="4">UTC(GTM) +4 (Самара) </option>
          <option value="5">UTC(GTM) +5 (Ташкент)</option>
          <option value="6">UTC(GTM) +6 (Астана)</option>
          <option value="7">UTC(GTM) +7 (Банкок)</option>
          <option value="8">UTC(GTM) +8 (Китай)</option>
          <option value="9">UTC(GTM) +9 (Япония)</option>
          <option value="10">UTC(GTM) +10 (Сидней)</option>
          <option value="11">UTC(GTM) +11 (Новая Каледония)</option>
          <option value="12">UTC(GTM) +12 (Новая Зеландия)</option>
        </select>
      </>
    );
  }
}
