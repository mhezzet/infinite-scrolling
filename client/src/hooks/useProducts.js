import { useCallback, useEffect, useState } from 'react'

const pageSize = 50

export const useProducts = () => {
  const [products, setProducts] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [sort, setSort] = useState(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [tempProducts, setTempProducts] = useState(null)

  const fetchProducts = useCallback(async () => {
    setIsLoading(true)
    setError(false)

    const queryParams = new URLSearchParams({
      ...(sort && { _sort: sort }),
      _page: 1,
      _limit: pageSize,
    }).toString()

    try {
      const response = await fetch(`products?${queryParams}`)
      const products = await response.json()

      setProducts(products)

      if (products.length === pageSize) {
        setHasMore(true)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }, [sort])

  const fetchMore = useCallback(async () => {
    if (isLoading || !hasMore || tempProducts) return

    setIsLoading(true)
    setError(false)

    const queryParams = new URLSearchParams({
      ...(sort && { _sort: sort }),
      _page: page + 1,
      _limit: pageSize,
    }).toString()

    try {
      const response = await fetch(`products?${queryParams}`)
      const products = await response.json()

      setTempProducts(products)
      setPage(prevPage => prevPage + 1)

      if (products.length === pageSize) {
        setHasMore(true)
      } else {
        setHasMore(false)
      }
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }, [hasMore, isLoading, page, sort, tempProducts])

  const showMore = useCallback(() => {
    if (!tempProducts) return
    setProducts(prevProducts => [...prevProducts, ...tempProducts])
    setTempProducts(null)
  }, [tempProducts])

  const sortBy = useCallback(value => {
    setProducts(null)
    setPage(1)
    setSort(value)
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    fetchMore()
  }, [fetchMore])

  return {
    products,
    error,
    isLoading,
    sortBy,
    fetchMore,
    hasMore,
    showMore,
  }
}
