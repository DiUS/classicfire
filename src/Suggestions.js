import React from 'react'
import { talky } from './talky';

const Suggestions = ({ suggestions }) => (
  <div className='Suggestions'>
    {suggestions.map(item => (
        <div key={item} className='Suggestion' onClick={() => talky(item)}>{item}</div>
      )
    )}
  </div>
)

export default Suggestions
