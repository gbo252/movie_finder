import React from 'react';
import Spinner from './Spinner';

type Props = {
  title: string;
  image: string;
};

type State = {
  imageLoaded: boolean
};

class MovieContentImage extends React.Component<Props, State> {
  state = { imageLoaded: false };

  render() {
    const { image, title } = this.props;

    return (
      <>
        <img
          className="w-100"
          style={
            this.state.imageLoaded ? { display: 'block' } : { display: 'none' }
          }
          src={image}
          alt={title}
          onLoad={() => this.setState({ imageLoaded: true })}
          data-testid="movie-content-image"
        />
        <div className="position-absolute w-100 d-flex justify-content-center align-items-center netflix-color">
          <Spinner display={!this.state.imageLoaded} />
        </div>
      </>
    );
  }
}

export default MovieContentImage;
