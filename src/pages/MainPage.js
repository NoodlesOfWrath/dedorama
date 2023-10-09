import React from 'react';
import './MainPage.css'

function MainPage() {
    return (
        <div className='images-grid-container'>
            <a href="http://localhost:3000/DotCalender"><img
                style={{ flex: 1, width: '50%' }}
                resizeMode='contain'
                src={new URL('https://i.imgur.com/lcOkgIs.png')}
                alt='Dot Calender'
            /></a>
            <a href="http://localhost:3000/FillingCircle"><img
                style={{ flex: 1, width: '50%' }}
                resizeMode='contain'
                src={new URL('https://i.imgur.com/TXOobYM.png')}
                alt='Filling Circle'
            /></a>
            <a href="http://localhost:3000/BubbleChart"><img
                style={{ flex: 1, width: '50%' }}
                resizeMode='contain'
                src={new URL('https://i.imgur.com/9w2jK3O.png')}
                alt='Filling Circle'
            /></a>
        </div>
    )
}

export default MainPage;