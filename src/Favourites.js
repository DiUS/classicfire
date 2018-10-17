import React from 'react'
import { talky } from './talky';

const Favourites = ({ items }) => (
  <div className='Favourites'>
    {items.map(item => (
        <div key={item} className='Suggestion' onClick={() => talky(item)}>{item}</div>
      )
    )}
  </div>
)

export default Favourites

