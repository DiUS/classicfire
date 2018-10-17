import React from 'react'

const onClick = (talky, item, onSelect) => {
  onSelect(item)
  talky(item)
}

const Suggestions = ({ suggestions, onSelect, talky }) => (
  <div className='Suggestions'>
    {suggestions.length < 1 && <div className='NoSuggestions'>Please draw something in the canvas above</div> }
    {suggestions.map(item => (
      <div key={item} className='Suggestion' onClick={() => onClick(talky, item, onSelect)}>{item}</div>
      )
    )}
  </div>
)

export default Suggestions
