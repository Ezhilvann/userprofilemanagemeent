function Nofound() {
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center mt-5 mb-4">
            <div class="error-template">
              <h1>Oops!</h1>
              <h2>404 Not Found</h2>
              <div class="error-details mt-5 mb-5 fw-bold text-danger fs-4">
                Sorry, an error has occured, Requested page not found!
              </div>
              <div class="error-actions">
                <a href="/">
                  {" "}
                  <button className="btn btn-dark">go back</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nofound;
