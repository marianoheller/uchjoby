/** *************************************************
 * Styling helpers
 */
export function adjustHexOpacity(color, opacity) {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/** *************************************************
 * Action helpers
 */
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

const SET = 'SET';
const GET = 'GET';

export function createRequestTypes(base) {
  return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export function createSetGetTypes(base) {
  return [SET, GET].reduce((acc, type) => {
    acc[type] = `${base}_${type}`;
    return acc;
  }, {});
}

export function createAction(type, payload = {}) {
  return { type, ...payload };
}


/** *************************************************
 * Scroll handlers
 */

var xDown = null;                                                        
var yDown = null;                                                        

export function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};                                                

export function handleTouchMove(evt, {
  handleUp = () => {},
  handleRight = () => {},
  handleDown = () => {},
  handleLeft = () => {},
}) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) {
          handleLeft(); /* left swipe */ 
        } else {
          handleRight();  /* right swipe */
        }                       
    } else {
        if ( yDiff > 0 ) {
          handleUp();  /* up swipe */ 
        } else { 
          handleDown();  /* down swipe */
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};
