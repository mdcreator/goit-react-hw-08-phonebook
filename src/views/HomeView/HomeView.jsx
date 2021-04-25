import React from 'react';
import s from './HomeView.module.css';

const HomeView = () => (
  <div className={s.container}>
    <h1 className={s.title}>Welcome!</h1>
    <p>Please register or login to your account</p>
  </div>
);

export default HomeView;
