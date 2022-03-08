import React, { memo } from 'react'
import { Ad } from '../components/ad'
import styles from './index.module.css'
import { ProductCard } from './product-card'

export const ProductsGrid = memo(({ setLastProduct, products, isLoading }) => {
  return (
    <div className={styles.productsGrid}>
      {products?.map((product, idx) =>
        idx === products.length - 1 && !isLoading ? (
          <ProductCard
            ref={setLastProduct}
            key={product.id}
            product={product}
          />
        ) : (
          <React.Fragment key={product.id}>
            <ProductCard product={product} />
            {idx % 20 === 0 && idx !== 0 && <Ad />}
          </React.Fragment>
        )
      )}
    </div>
  )
})
