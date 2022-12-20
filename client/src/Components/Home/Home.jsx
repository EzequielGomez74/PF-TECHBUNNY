import React from 'react';
import s from './Home.module.css';

function Home() {
  return (
    
    <div>
        <section className={s.banners} >
            <div className={s.bannerOne}>
                <div className={s.a}></div>
                <div className={s.b}></div>
                <div className={s.c}></div>
            </div>
            <div className={s.bannerTwo}>
                <div className={s.d}></div>
                <div className={s.e}></div>
                <div className={s.f}></div>
            </div>
        </section>
    </div>
  )
}

export default Home