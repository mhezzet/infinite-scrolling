import moment from 'moment'
import React, { memo, useMemo } from 'react'
import styles from './index.module.css'

export const ProductCard = memo(
  React.forwardRef(({ product }, ref) => {
    const date = useMemo(
      () =>
        moment().diff(product.date, 'day') > 7
          ? moment(product.date).format('ll')
          : moment(product.date).fromNow(),
      [product.date]
    )

    return (
      <div ref={ref} className={styles.card}>
        <div className={styles.cardFace}>
          <p>{product.face}</p>
        </div>
        <div className={styles.cardContent}>
          <p>💲{parseFloat(product.price).toFixed(2)}</p>
          <p>📏{product.size}</p>
          <p>📅{date}</p>
        </div>
      </div>
    )
  })
)
