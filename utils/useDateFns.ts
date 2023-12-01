import { formatDistance as _formatDistance, differenceInSeconds } from 'date-fns';

const getRemainingTime = (targetDate: Date) => {
  const now = new Date();
  let totalSeconds = differenceInSeconds(targetDate, now);

  if (totalSeconds <= 0) {
    return { days: undefined, hours: undefined, minutes: undefined, seconds: undefined };
  }

  const days = Math.floor(totalSeconds / (3600 * 24));
  totalSeconds -= days * 3600 * 24;
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds -= hours * 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return {
    days: days > 0 ? days : hours > 0 || minutes > 0 || seconds > 0 ? 0 : undefined,
    hours: hours > 0 ? hours : days > 0 || minutes > 0 || seconds > 0 ? 0 : undefined,
    minutes: minutes > 0 ? minutes : days > 0 || hours > 0 || seconds > 0 ? 0 : undefined,
    seconds: seconds > 0 ? seconds : days > 0 || hours > 0 || minutes > 0 ? 0 : undefined,
  };
};

export default function () {
  const { localeProperties } = useI18n();

  const resolveLocale = async () => {
    let localeModule;

    // eslint-disable-next-line unicorn/prefer-ternary
    if (localeProperties.value.iso === 'cs') {
      localeModule = await import('date-fns/locale/cs');
    } else {
      localeModule = await import('date-fns/locale/en-US');
    }

    return localeModule;
  };

  const formatDistance = async (targetDate: Date) => {
    const locale = await resolveLocale();

    return _formatDistance(targetDate, new Date(), {
      addSuffix: true,
      includeSeconds: true,
      locale: locale.default,
    });
  };

  return {
    formatDistance,
    getRemainingTime,
  };
}
