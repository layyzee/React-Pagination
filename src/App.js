import "./App.css";
import ReactPaginate from "react-paginate";
import { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  let limit = 12;

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `http://localhost:3000/comments?_page=1&_limit=${limit}`
      );

      const data = await res.json();
      const total = res.headers.get("x-total-count");

      setPageCount(Math.ceil(total / 12));

      // console.log(Math.ceil(total));
      setItems(data);
    };

    getComments();
  }, []);

  const fetchComments = async (currentPage) => {
    const res = await fetch(
      `http://localhost:3000/comments?_page=${currentPage}&_limit=12`
    );
    const data = await res.json();
    return data;
  };

  console.log(items);

  const handlePageClick = async (data) => {
    console.log(data.selected);
    let currentPage = data.selected + 1;

    const commentsformServer = await fetchComments(currentPage);
    setItems(commentsformServer);
  };

  return (
    <>
      <div className="container">
        <div className="row m-2">
          {items.map((item) => {
            return (
              <div key={item.id} className="col-sm-6 col-md-4 v my-2">
                <div
                  className="card shadow-sm w-100"
                  style={{ minHeight: 225 }}
                >
                  <div className="card-body">
                    <h5 className="card-title text-center h2">
                      Id :{item.id}{" "}
                    </h5>
                    <h6 className="card-subtitle mb-2 text-muted text-center">
                      {item.email}
                    </h6>
                    <p className="card-text">{item.body}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <ReactPaginate
          previouLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link "}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link "}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link "}
          activeClassName={"active"}
        />
      </div>
    </>
  );
}

export default App;
