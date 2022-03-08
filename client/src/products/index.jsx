import React, { useEffect, useState } from 'react'
import { Loading } from '../components/loading'
import { useProducts } from '../hooks/useProducts'
import styles from './index.module.css'
import { ProductsGrid } from './products-grid'
import { SortControl } from './sort-control'

export const Products = () => {
  const { products, isLoading, sortBy, showMore, hasMore } = useProducts()
  const [lastProduct, setLastProduct] = useState(null)

  useEffect(() => {
    if (!lastProduct) return

    const lastElementObserver = new IntersectionObserver(
      entries => {
        const [entry] = entries
        if (entry.isIntersecting) showMore()
      },
      { rootMargin: '500px' }
    )

    lastElementObserver.observe(lastProduct)

    return () => {
      if (!lastProduct) return

      lastElementObserver.unobserve(lastProduct)
    }
  }, [lastProduct, showMore])

  return (
    <div className={styles.products}>
      <div className={styles.title}>Fake Products</div>

      <SortControl sortBy={sortBy} />

      <ProductsGrid
        setLastProduct={setLastProduct}
        products={products}
        isLoading={isLoading}
      />

      {!hasMore && !isLoading && (
        <div className={styles.noMore}>~ end of catalogue ~</div>
      )}
      {isLoading && <Loading />}
    </div>
  )
}
