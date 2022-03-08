import { memo } from 'react'
import styles from './index.module.css'

export const SortControl = memo(({ sortBy }) => {
  return (
    <div className={styles.sortContainer}>
      <label htmlFor='cars'>
        <strong>Sort By </strong>
      </label>
      <select onChange={event => sortBy(event.target.value)} id='cars'>
        <option value=''>none</option>
        <option value='price'>price</option>
        <option value='size'>size</option>
        <option value='id'>id</option>
      </select>
    </div>
  )
})
