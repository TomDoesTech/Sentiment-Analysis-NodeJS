import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import positive from "./img/positive.svg";
import neutral from "./img/neutral.svg";
import negative from "./img/negative.svg";
import useDebounce from "./useDebounce";

type Sentiment = 1 | 0 | -1;

function Emoji({ sentiment }: { sentiment: Sentiment }) {
  if (sentiment === 1) {
    return <img src={positive} className="emoji" />;
  }
  if (sentiment === 0) {
    return <img src={neutral} className="emoji" />;
  }

  return <img src={negative} className="emoji" />;
}

function App() {
  const [comment, setComment] = useState("");
  const [sentiment, setSentiment] = useState<Sentiment>(0);

  const debouncedComment = useDebounce(comment, 500);

  useEffect(() => {
    async function fetchSentiment(comment: string) {
      const result = await axios
        .post("http://localhost:4000/api/sentiment", {
          data: comment,
        })
        .then((res) => res.data);

      setSentiment(result.sentiment);
    }
    if (debouncedComment) {
      fetchSentiment(debouncedComment);
    }
  }, [debouncedComment]);

  return (
    <div className="App">
      <textarea
        placeholder="What do you think"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Emoji sentiment={sentiment} />
    </div>
  );
}

export default App;
