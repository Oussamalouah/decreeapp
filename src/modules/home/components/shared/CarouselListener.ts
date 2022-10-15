import {useContext, useEffect} from 'react';
import {CarouselContext} from 'pure-react-carousel';

type Props = {
  setCurrentIndex: (index: number) => void;
};

/**
 * Listener for when the Carousel changes the slide
 *
 * @param props
 * @constructor
 */
export const CarouselListener = (props: Props) => {
  const carouselContext = useContext(CarouselContext);

  useEffect(() => {
    const onChange = () => {
      props.setCurrentIndex(carouselContext.state.currentSlide);
    };
    carouselContext.subscribe(onChange);
    return () => carouselContext.unsubscribe(onChange);
  }, [carouselContext]);

  return null;
};
