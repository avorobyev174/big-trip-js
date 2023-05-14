import { humanizePointDate, humanizePointTime, capitalizeFirstLetter } from '../../utils/point.js';
import { createOffersListTemplate } from '../offer-list/offer-list-template.js';
import { getDuration } from '../../utils/point.js';

function createPointTemplate({ type, destination, dateFrom, dateTo, price, offers, isFavorite }) {
  const typeTitle = capitalizeFirstLetter(type);
  const date = humanizePointDate(dateFrom);
  const timeFrom = humanizePointTime(dateFrom);
  const timeTo = humanizePointTime(dateTo);
  const { dayDuration, hourDuration, minuteDuration } = getDuration(dateFrom, dateTo);
  const pointDayDuration = dayDuration ? `${ dayDuration }D` : '';
  const pointHourDuration = hourDuration ? `${ hourDuration }H` : '';
  const pointMinuteDuration = minuteDuration ? `${ minuteDuration }M` : '';
  const duration = `${ pointDayDuration } ${ pointHourDuration } ${ pointMinuteDuration }`;
  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';
  const offerListTemplate = offers ? createOffersListTemplate(offers) : '';
  const { name } = destination;

  return /*html*/`<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="2019-03-18">${ date }</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src='img/icons/${ type }.png' alt="Event type icon">
    </div>
    <h3 class="event__title">${ typeTitle } ${ name }</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime='${ dateFrom }'>${ timeFrom }</time>
        &mdash;
        <time class="event__end-time" datetime='${ dateTo }'>${ timeTo }</time>
      </p>
      <p class="event__duration">${ duration }</p>
    </div>
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${ price }</span>
    </p>
    <h4 class="visually-hidden">Offers:</h4>
    ${ offerListTemplate }
    <button class="event__favorite-btn ${ favoriteClassName }" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
}

export { createPointTemplate };
