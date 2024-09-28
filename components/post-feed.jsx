'use client'

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"

import PostCard from "./PostCard";

const PostCardList = ({ data, handleTagClick }) => {
  return (
    <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3'>
      {data.map((post) => (
        <motion.div
          key={post._id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease: "easeOut" }}
        >
          <PostCard post={post} handleTagClick={handleTagClick} />
        </motion.div>
      ))}
    </div>
  )
}

const PostFeed = () => {
  const [allPosts, setAllPosts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResults, setSearchedResults] = useState([])

  const observerRef = useRef(null)
  const loadingRef = useRef(null)

  const fetchPosts = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/post")
      const data = await response.json()

      setAllPosts((prevPosts) => {
        const newPosts = data.filter(
          (post) => !prevPosts.some((existingPost) => existingPost._id === post._id)
        )
        return [...prevPosts, ...newPosts]
      })
    } catch (error) {
      console.error("Failed to fetch posts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          fetchPosts()
        }
      },
      { threshold: 1.0 }
    )

    if (loadingRef.current) {
      observer.observe(loadingRef.current)
    }

    observerRef.current = observer

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const filterPosts = (searchText) => {
    const regex = new RegExp(searchText, "i")
    return allPosts.filter(
      (item) =>
        
        regex.test(item.post_title) ||
        regex.test(item.post_tag) ||
        regex.test(item.post_content)
    )
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPosts(e.target.value)
        setSearchedResults(searchResult)
      }, 500)
    )
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName)
    const searchResult = filterPosts(tagName)
    setSearchedResults(searchResult)
  }

  return (
    <section className='w-full max-w-screen-xl mx-auto p-4'>
      <div className="mb-6 flex justify-center items-center">
        <Input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          className='bg-white h-12 shadow m-auto  max-w-xl'
        />
      </div>

      <PostCardList 
        data={searchText ? searchedResults : allPosts} 
        handleTagClick={handleTagClick} 
      />

      {isLoading && (
        <p className='text-center mt-4' ref={loadingRef}>Loading...</p>
      )}
    </section>
  )
}

export default PostFeed