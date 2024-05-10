"use client"

import { UnsplashImage } from "@/models/unsplash-image";
import { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import Image from "next/image";
import styles from "./SearchPage.module.css";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<UnsplashImage[] | null>(null);
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [searchResultsLoadingError, setSearchResultsLoadingError] = useState(false)


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("query")?.toString().trim();

    if (query) {
      try {
        setSearchResults(null);
        setSearchResultsLoadingError(false);
        setSearchResultsLoading(true);
        const response = await fetch(`/api/search?query=${query}`);
        const images: UnsplashImage[] = await response.json();
        setSearchResults(images);
      } catch (error) {
        console.error(error);
        setSearchResultsLoadingError(true);
      } finally {
        setSearchResultsLoading(false);
      }
    }
  }

  return (
    <div>
      <h1>Search</h1>
      <p>Search for images on Unsplash</p>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="search-input">
          <Form.Label>Search</Form.Label>
          <Form.Control type="text" name="query" placeholder="E.g. cats, dog, hotdog, ..." />
        </Form.Group>
        <Button variant="primary" type="submit" className="mb-3" disabled={searchResultsLoading}>Search</Button>
      </Form>

      <div className="d-flex flex-column align-items-center">
        {searchResultsLoading && <Spinner animation="border" />}
        {searchResultsLoadingError && <p>Something went wrong. Please Try again.</p>}
        {searchResults?.length === 0 && <p>Nothing found. Try a different query</p>}
      </div>

      {searchResults && (
          <>
            { searchResults.map((image) => (
              <Image 
                src={image.urls.raw}
                alt={image.description}
                width={250}
                height={250}
                key={image.urls.raw}
                className={styles.image}
              />
            ))}
          </>
        )}
    </div>
  );
}