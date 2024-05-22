import { useState, useEffect } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

const LoadMoreComponent = () => {
  const BASE_URL = "https://jsonplaceholder.typicode.com/posts";
  const RESULTS_PER_PAGE = 10;

  const [posts, setPosts] = useState<Post[]>([]);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [visible, setVisible] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const fetchTotalPosts = async () => {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) throw new Error('Failed to fetch total posts');
      const data: Post[] = await response.json();
      setTotalPosts(data.length);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}?_page=${page}&_limit=${RESULTS_PER_PAGE}`
      );
      if (!response.ok) throw new Error('Failed to fetch posts');
      const data: Post[] = await response.json();
      setVisible((prev) => prev + data.length);
      setPosts((prev) => [...prev, ...data]);
      setError(null);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    fetchTotalPosts();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return (
    <div className="container">
      <h1>Load More Example in React</h1>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <h2>{post.id}</h2>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}

      {totalPosts > 0 ? (
        visible < totalPosts ? (
          <div>
            <button onClick={handleOnLoadMore}>Load More</button>
          </div>
        ) : (
          <div>
            <div>Sorry, that's all folks! No more to load.</div>
          </div>
        )
      ) : null}
    </div>
  );
};

export default LoadMoreComponent;
