import React from "react";
import { connect } from "react-redux";

class Trending extends React.Component {
  componentDidMount() {
    this.props.onRequestTrendGifs();
  }

  render() {
    const { fetching, data, error, onRequestTrendGifs } = this.props;
    console.log(this.props);
    return (
      <div>
        <h2>Trending</h2>
        {error ? <p>{error}</p> : null}
        <button onClick={onRequestTrendGifs} disabled={fetching}>
          Refetch
        </button>
        <div>
          {!fetching && data && data.length ? (
            <div>
              {data.map(item => {
                const {
                  id,
                  title,
                  images: {
                    preview_gif: { url, height, width }
                  }
                } = item;
                return (
                  <span key={id}>
                    <img src={url} alt={title} width={width} height={height} />
                    <i className="fas fa-heart" />
                  </span>
                );
              })}
            </div>
          ) : (
            <p>Cargando...</p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    trendGifs: { fetching, data, error }
  } = state;
  console.log(data);
  return {
    fetching: fetching,
    data,
    error: error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestTrendGifs: () => dispatch({ type: "API_CALL_REQUEST" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trending);