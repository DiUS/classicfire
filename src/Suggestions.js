import React from 'react'

const Suggestions = ({ suggestions }) => (
  <div className='Suggestions'>
    {suggestions.map(item => <div key={item} className='Suggestion'>{item}</div>)}
  </div>
)

export default Suggestions
