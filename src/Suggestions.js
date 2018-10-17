import React from 'react'
import { talky } from './talky';

const Suggestions = ({ suggestions }) => (
  <div className='Suggestions'>
    {!suggestions && <div className='NoSuggestions'>do something</div> }
    {suggestions.slice(0, 3).map(item => (
        <div key={item} className='Suggestion' onClick={() => talky(item)}>{item}</div>
      )
    )}
  </div>
)

export default Suggestions
