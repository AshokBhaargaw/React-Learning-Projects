import { FaYoutube, FaGoogle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../Redux/store";
import {
  addSearchHistory,
  removeSearchQuery,
} from "../Redux/SearchHistorySlice";

export default function SearchSuggetions({
  setInputValue,
}: {
  setInputValue: (value: string) => void;
}) {
  const searchHistory = useSelector((state: RootState) => state.hitory.history);
  const dispatch = useDispatch();

  // Search again function
  const searchAgain = (newSearch: {
    query: string;
    SearchAgainMode: "google" | "youtube";
  }) => {
    dispatch(removeSearchQuery(newSearch.query));
    dispatch(
      addSearchHistory({ query: newSearch.query, mode: newSearch.SearchAgainMode })
    );
    if (newSearch.SearchAgainMode === "youtube") {
      window.open(`https://www.youtube.com/search?q=${newSearch.query}`, "_self");
    } else {
      window.open(`https://www.google.com/search?q=${newSearch.query}`, "_self");
    }
  };

  return (
    <div className="flex justify-around min-h-30 w-full max-w-[75%] justify-self-center bg-slate-300 absolute dark:bg-secondary px-5 py-2 rounded">
      {/* Suggetions Section  */}
      <section className="w-6/12 border-r">
        <h3 className="font-bold dark:text-slate-300 text-slate-600">
          AI based Suggetions
        </h3>
        <ol type="1">
          <li className="text-slate-500 cursor-default">
            Still working on this feature...
          </li>
        </ol>
      </section>

      {/* History Section */}
      <section className="w-6/12 px-2">
        <h3 className="font-bold dark:text-slate-300 text-slate-600">
          History
        </h3>
        <ul>
          {searchHistory.length ? (
            searchHistory.map(
              (search, i) =>
                i < 5 && (
                  <li
                    key={i}
                    className="flex justify-between place-items-center my-2 px-2"
                  >
                    <span className="mr-2">
                      {search.mode == "youtube" ? <FaYoutube /> : <FaGoogle />}
                    </span>
                    <input
                      type="text"
                      readOnly
                      className="w-9/12 border-0 outline-0 cursor-default"
                      value={search.query}
                     
                    />
                    <span className="w-2/12">
                      <button
                        title="Search again on Google"
                        className="w-6/12 cursor-pointer hover:text-blue-600"
                        onClick={() =>
                          searchAgain({ query: search.query, SearchAgainMode: "google" })
                        }
                      >
                        <FaGoogle />
                      </button>
                      <button
                        title="Search again on Youtube"
                        className="w-6/12 cursor-pointer hover:text-red-500"
                        onClick={() =>
                          searchAgain({ query: search.query, SearchAgainMode: "youtube" })
                        }
                      >
                        <FaYoutube />
                      </button>
                    </span>
                  </li>
                )
            )
          ) : (
            <p className="text-slate-500 cursor-default">No history data</p>
          )}
        </ul>
      </section>
    </div>
  );
}
