import React, { memo } from 'react'

export const Ad = memo(() => {
  return (
    <div className='ad'>
      <img
        src={`api/ads?r=${Math.floor(Math.random() * (1000 - 0 + 1)) + 0}`}
        alt='random'
      />
    </div>
  )
})
